const core = require('@actions/core');
const { graphql } = require('@octokit/graphql');

(async () => {
  try {
    const token = core.getInput('token');
    const query = core.getInput('query');

    if (!query) {
        throw new Error('No GraphQL query provided as input.');
    } 

    const response = await graphql(query, {
      headers: {
        authorization: `token ${token}`,
      },
    });

    console.log('GraphQL response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('GraphQL query failed:', error);
    core.setFailed(error.message);
  }
})();
