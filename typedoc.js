/* eslint-disable no-console */
const { execSync } = require('child_process');
const { repository } = require('./package.json');

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
let command = 'typedoc';
if (commitSha) {
  command = `${command} --sourcefile-url-prefix "${repository}/blob/${commitSha}/"`;
}

console.log(command);
execSync(command, { stdio: 'inherit' });
