import { execSync } from "child_process";
import { repository } from "../package.json";

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
let command = "typedoc";
if (commitSha) {
  command = `${command} --sourcefile-url-prefix "${repository}/blob/${commitSha}/"`;
}

console.log(command);
execSync(command, { stdio: "inherit" });
