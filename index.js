const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
        const octokit = github.getOctokit(GITHUB_TOKEN);
        const { context = {} } = github;
        const { pull_request } = context.payload;

        const label = core.getInput('LABEL');
        console.log(`Got label: ${label}`);
        const additionalLabels = core.getInput('ADDITIONAL_LABELS').split(',');
        console.log(`Got additional labels: ${additionalLabels}`);
        const payload = JSON.stringify(github.context.payload.pull_request, undefined, 2)
        console.log(`The event payload: ${payload}`);
        
        await octokit.issues.addLabels({
            owner: context.owner,
            repo: context.repo,
            issue_number: pull_request.prNumber,
            labels: additionalLabels
          });
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();