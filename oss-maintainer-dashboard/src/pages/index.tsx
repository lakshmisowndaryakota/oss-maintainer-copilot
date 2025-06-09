import { useEffect, useState } from 'react';
import { fetchRepoOverview } from '../github-api';

export default function Home() {
  const [repo, setRepo] = useState<any>(null);
  const owner = 'lakshmisowndaryakota';
  const repoName = 'oss-maintainer-copilot';

  useEffect(() => {
    fetchRepoOverview(owner, repoName).then(setRepo);
  }, []);

  if (!repo) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">⭐ Stars</h2>
          <p className="text-lg">{repo.stargazerCount}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">🍴 Forks</h2>
          <p className="text-lg">{repo.forkCount}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">👀 Watchers</h2>
          <p className="text-lg">{repo.watchers.totalCount}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">🛠️ Language</h2>
          <p className="text-lg">{repo.primaryLanguage?.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">🕒 Last commit</h2>
          <p className="text-lg">{new Date(repo.defaultBranchRef.target.committedDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">Open Issues</h2>
          <p className="text-lg">{repo.openIssues.totalCount}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold">good first issues</h2>
          <p className="text-lg">{repo.goodFirstIssues.totalCount}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">🏷️ Labels</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.labels?.nodes?.map((label: any) => (
            <li key={label.name}>{label.name}: {label.issues.totalCount} issues</li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">🆕 Recent Issues</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.recentIssues?.nodes?.map((issue: any) => (
            <li key={issue.number}>
              <a href={issue.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                #{issue.number} - {issue.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">pull requests {repo.pullRequests?.totalCount}</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.pullRequests?.nodes?.map((pr: any) => (
            <li key={pr.number}>
              <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                #{pr.number} - {pr.title} - {pr.state}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">open pull requests</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.openPRs?.map((pr: any) => (
            <li key={pr.number}>
              <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                #{pr.number} - {pr.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">merged pull requests</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.mergedPRs?.map((pr: any) => (
            <li key={pr.number}>
              <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                #{pr.number} - {pr.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">recent pull requests</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.recentPRs?.map((pr: any) => (
            <li key={pr.number}>
              <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                #{pr.number} - {pr.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="font-bold">top contributors</h2>
        <ul className="text-sm list-disc pl-4">
          {repo.topContributors?.map((c: any) => (
            <li key={c.login} className="flex items-center space-x-2 mb-2">
            <img src={c.avatarUrl} alt={c.login} className="w-6 h-6 rounded-full" />
            <a href={c.url} target="_blank" rel="noreferrer">
              {c.login} - {c.commits} commits
            </a>
          </li>
          ))}
        </ul>
      </div>

    </div>
    
  );
}
