const core = require('@actions/core');
const github = require('@actions/github');

try {
    const label = core.getInput('label');
    console.log(`Got label: ${label}`);
    const additionalLabels = core.getInput('additional-labels');
    console.log(`Got additional labels: ${additionalLabels}`);
    const payload = JSON.stringify(github.context.payload.pull_request, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}