const core = require('@actions/core');
const { graphql } = require('@octokit/graphql');

async function run() {
  try {
    const token = core.getInput('token');
    const query = core.getInput('query');

    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    const data = await graphqlWithAuth(query);
    core.setOutput('result', JSON.stringify(data, null, 2));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
