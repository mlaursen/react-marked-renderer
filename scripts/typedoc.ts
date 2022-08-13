import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
// import { repository } from "../package.json" assert { type: "json" };

const loggedExecSync = (command: string): void => {
  console.log(command);
  execSync(command, { stdio: "inherit" });
};

let commitSha: string | undefined;
let isNoRemote = false;
if (process.env.GITHUB_SHA) {
  commitSha = process.env.GITHUB_SHA;
} else {
  commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  isNoRemote = execSync("git remote -v").toString().trim().length === 0;
}

// This can be removed for the assert line at some point
const { repository } = JSON.parse(
  readFileSync(join(process.cwd(), "package.json"), "utf8")
);

if (commitSha && isNoRemote) {
  console.log(
    "A git remote could not be found. Manually setting it to the repository field in the `package.json`."
  );

  loggedExecSync(`git remote add origin ${repository}`);
}

loggedExecSync("typedoc");

if (commitSha && isNoRemote) {
  loggedExecSync("git remote remove origin");
  console.log("Removed the manually set origin.");
}
