import { execSync } from "child_process";
import { repository } from "../package.json";

const loggedExecSync = (command: string): void => {
  console.log(command);
  execSync(command, { stdio: "inherit" });
};

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
const isNoRemote = execSync("git remote -v").toString().trim().length === 0;

if (commitSha && isNoRemote) {
  console.log(
    "A git remote could not be found. Manually setting it to the repositor field in the `package.json`."
  );

  loggedExecSync(`git remote add origin ${repository}`);
}

loggedExecSync("typedoc");

if (commitSha && isNoRemote) {
  loggedExecSync("git remote remove origin");
  console.log("Removed the manually set origin.");
}
