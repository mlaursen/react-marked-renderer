import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import inquirer from "inquirer";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function loggedCommand(command: string): void {
  console.log(command);
  execSync(command, { stdio: "inherit" });
  console.log("");
}

function undo(version?: string): void {
  loggedCommand("git reset HEAD^");
  if (typeof version === "string") {
    loggedCommand(`git tag -d v${version}`);
  }
}

const NEW_ENTRY = /^#{1,3}\s+\[\d/;

async function getReleaseNotes(version: string): Promise<string> {
  console.log("Update the CHANGELOG.md with any additional changes.");
  const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>([
    {
      type: "confirm",
      name: "confirmed",
      message: "Continue the release?",
    },
  ]);
  if (!confirmed) {
    console.error("Canceling the release.");
    undo(version);

    process.exit(1);
  }

  const changelog = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf8");
  const lines = changelog.split(/\r?\n/);
  let lastEntryStart = -1;
  let nextEntryStart = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (NEW_ENTRY.test(lines[i])) {
      if (lastEntryStart === -1) {
        lastEntryStart = i + 1;
      } else if (nextEntryStart === -1) {
        nextEntryStart = i;
        break;
      }
    }
  }

  if (lastEntryStart === -1 || nextEntryStart === -1) {
    console.error("Unable to find a release block.");
    process.exit(1);
  }

  return lines.slice(lastEntryStart, nextEntryStart).join("\n");
}

const RELEASE_TYPES = ["major", "minor", "patch"];

async function run(): Promise<void> {
  let type = "";
  let prerelease = "";
  for (let i = 0; i < process.argv.length; i += 1) {
    const flag = process.argv[i];
    const value = process.argv[i + 1];
    if (
      flag === "-t" &&
      typeof value === "string" &&
      RELEASE_TYPES.includes(value)
    ) {
      type = ` --release-as ${value}`;
    } else if (flag === "-p" || flag === "--prerelease") {
      prerelease = " --prerelease";
    }
  }

  const githubDotEnv = join(process.cwd(), ".env.github");
  dotenv.config({ path: githubDotEnv });

  const { GITHUB_TOKEN } = process.env;
  if (!GITHUB_TOKEN) {
    console.error(
      `Missing a \`GITHUB_TOKEN\` environment variable. This should be located at:
- ${githubDotEnv}

A token can be created at:
- https://github.com/settings/tokens/new?scopes=repo
`
    );

    process.exit(1);
  }

  loggedCommand("pnpm lint");
  loggedCommand("pnpm typecheck");
  loggedCommand("pnpm test");
  loggedCommand("pnpm rimraf dist");
  loggedCommand("pnpm rollup -c rollup.config.js");
  loggedCommand("pnpm tsc -p tsconfig.typedefs.json");
  loggedCommand(`pnpm standard-version${type}${prerelease}`);

  const { version } = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8")
  );
  if (typeof version !== "string") {
    console.error("Unable to get the package version.");
    undo();
    process.exit(1);
  }

  const releaseNotes = await getReleaseNotes(version);
  const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>([
    {
      type: "confirm",
      name: "confirmed",
      message: `Open the authenticator app to get a one-time password and run the following command:

npm publish --otp
`,
    },
  ]);
  if (!confirmed) {
    console.error("Canceling the release.");
    undo(version);

    process.exit(1);
  }
  loggedCommand("git push --follow-tags origin main");
  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  const response = await octokit.request(
    "POST /repos/{owner}/{repo}/releases",
    {
      owner: "mlaursen",
      repo: "react-marked-renderer",
      tag_name: `v${version}`,
      body: releaseNotes,
    }
  );

  console.log(`Created release: ${response.data.html_url}`);
}

run();
