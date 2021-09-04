/* eslint-disable no-console */
const { execSync } = require('child_process');

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
let command = 'typedoc';
if (commitSha) {
  command = `${command} --gitRevision "${commitSha}"`;
}

console.log('git remote -v');
console.log(execSync('git remote -v', { stdio: 'inherit' }));
console.log(command);
execSync(command, { stdio: 'inherit' });
