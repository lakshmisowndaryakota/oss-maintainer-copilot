import { useEffect, useState } from 'react';
import { fetchRepoOverview } from '../github-api';
import { Star, GitBranch, Eye, Code, Clock } from "lucide-react";

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
<div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl shadow mb-6">
  <h1 className="text-2xl font-bold text-gray-900">{repo.name}</h1>
  <p className="text-gray-600 text-sm md:text-base md:ml-6 mt-2 md:mt-0">{repo.description}</p>
</div>

<div className="bg-white shadow-xl rounded-2xl p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Stars */}
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <Star className="w-6 h-6 text-yellow-500" />
      <div>
        <p className="text-sm text-gray-500">Stars</p>
        <p className="text-xl font-semibold">{repo.stargazerCount}</p>
      </div>
    </div>

    {/* Forks */}
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <GitBranch className="w-6 h-6 text-blue-500" />
      <div>
        <p className="text-sm text-gray-500">Forks</p>
        <p className="text-xl font-semibold">{repo.forkCount}</p>
      </div>
    </div>

    {/* Watchers */}
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <Eye className="w-6 h-6 text-green-500" />
      <div>
        <p className="text-sm text-gray-500">Watchers</p>
        <p className="text-xl font-semibold">{repo.watchers.totalCount}</p>
      </div>
    </div>

    {/* Language */}
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <Code className="w-6 h-6 text-purple-500" />
      <div>
        <p className="text-sm text-gray-500">Language</p>
        <p className="text-xl font-semibold">{repo.primaryLanguage?.name || "N/A"}</p>
      </div>
    </div>

    {/* Last Commit */}
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <Clock className="w-6 h-6 text-gray-500" />
      <div>
        <p className="text-sm text-gray-500">Last Commit</p>
        <p className="text-xl font-semibold">
          {new Date(repo.defaultBranchRef.target.committedDate).toLocaleDateString()}
        </p>
      </div>
    </div>
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
