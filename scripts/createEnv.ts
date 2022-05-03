import { execSync } from "child_process";
import { writeFile } from "fs";

let commitSha: string;
let gaCode: string;
if (process.env.GITHUB_SHA) {
  commitSha = process.env.GITHUB_SHA;
  gaCode = "";
} else {
  commitSha = execSync("git rev-parse HEAD").toString().trim();
  gaCode = "G-JSF6GSWE18";
}

const contents = `NEXT_PUBLIC_GA_CODE=${gaCode}
NEXT_PUBLIC_COMMIT_SHA=${commitSha}
`;

writeFile(".env.production.local", contents, (error) => {
  if (error) {
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(contents);
});
