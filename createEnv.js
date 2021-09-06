// vi: ft=javascript
const { execSync } = require('child_process');
const { writeFile } = require('fs');

const commitSha = execSync('git rev-parse HEAD').toString().trim();
const gaCode = 'G-JSF6GSWE18';

const contents = `NEXT_PUBLIC_GA_CODE=${gaCode}
NEXT_PUBLIC_COMMIT_SHA=${commitSha}
`;

writeFile('.env.production.local', contents, (error) => {
  if (error) {
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(contents);
});
