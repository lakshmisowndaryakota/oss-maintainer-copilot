const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;


if (!GITHUB_TOKEN) {
    console.error('❌ Missing GITHUB_TOKEN');
    throw new Error('Missing GitHub token');
  }

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
};

export async function fetchRepoOverview(owner: string, repo: string) {
  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        name
        description
        stargazerCount
        forkCount
        defaultBranchRef {
      		target {
        	... on Commit {
          	    committedDate
                history(first: 100) {
                    edges {
                        node {
                            author {
                                user {
                                    login
                                    avatarUrl
                                    url
                                }
                            }
                        }
                    }
                }
        	}
      	  }
    	}
        watchers {
          totalCount
        }
        primaryLanguage {
          name
        }
        openIssues: issues(states: OPEN) {
          totalCount
        }
        goodFirstIssues: issues(labels: ["good first issue"], states: OPEN) {
          totalCount
        }
        labels(first: 10) {
          nodes {
            name
            issues(states: OPEN) {
            totalCount
            }
          }
        }
        recentIssues: issues(states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, first: 5) {
            nodes {
                title
                number
                createdAt
                url
                labels(first: 3) {
                nodes {
                    name
                }
                }
            }
        }
        pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            nodes {
            title
            number
            createdAt
            url
            labels(first: 3) {
            	nodes{
                name
              }
            }
            state
            mergedAt
            createdAt
            }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  console.log('✅ GraphQL response:', JSON.stringify(json, null, 2));

  if (json.errors) {
    console.error('❌ GraphQL Errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }

  if (!json.data) {
    throw new Error('No data returned from GitHub API');
  }

  const openPRs = json.data.repository.pullRequests.nodes.filter((pr: any) => pr.state === 'OPEN');
  
  const now = new Date();
  const mergedLast30Days = json.data.repository.pullRequests.nodes.filter((pr: any) => {
  const mergedAt = pr.mergedAt ? new Date(pr.mergedAt) : null;
  return mergedAt && (now.getTime() - mergedAt.getTime()) / (1000 * 60 * 60 * 24) <= 30;
  }).length;

  const mergedPRs = json.data.repository.pullRequests.nodes.filter((pr: any) => pr.mergedAt);
  const averageMergeTime =
  mergedPRs.reduce((acc: number, pr: any) => {
    const createdAt = new Date(pr.createdAt).getTime();
    const mergedAt = new Date(pr.mergedAt).getTime();
    return acc + (mergedAt - createdAt);
  }, 0) /
  (mergedPRs.length || 1); // prevent division by zero

  const averageMergeTimeInDays = (averageMergeTime / (1000 * 60 * 60 * 24)).toFixed(2);

  const recentPRs = json.data.repository.pullRequests.nodes.slice(0, 5).map((pr: any) => ({
    title: pr.title,
    state: pr.state,
    url: pr.url,
  }));

  const contributorsMap: Record<string, { login: string; avatarUrl: string; url: string; commits: number }> = {};

  const commits = json.data.repository.defaultBranchRef.target.history.edges; 

  for(const edge of commits){
    const user = edge.node.author?.user;
    if(user&&user.login){
        if(!contributorsMap[user.login]){
            contributorsMap[user.login] = {
                login: user.login,
                avatarUrl: user.avatarUrl,
                url: user.url,
                commits: 1
            }
        }
        else{
            contributorsMap[user.login].commits = contributorsMap[user.login].commits+1;
        }
    }
  }

  const topContributors = Object.values(contributorsMap).sort((a,b) => b.commits-a.commits).slice(0,5);

  const repoData = {
    ...json.data.repository,
    openPRs,
    mergedPRs,
    recentPRs,
    mergedLast30Days,
    averageMergeTimeInDays,
    topContributors
  };

  console.log(repoData);
  
  return repoData;
  
}
