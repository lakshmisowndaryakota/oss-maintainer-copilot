import { useEffect, useState } from 'react';
import { fetchRepoOverview } from '../github-api';
import { Star, GitBranch, Eye, Code, Clock } from "lucide-react";
import StatCard from '@/components/StatCard';
import LabelChart from '@/components/LabelChart';
import ListPRDetailsCard from '@/components/ListPRDetailsCard';

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

      <div className="p-6"></div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">📂 Issues Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="🟢 Open Issues" value={repo.openIssues.totalCount} />
        <StatCard title="🧊 Stale Issues" value={repo.staleIssuesMoreThan30.length} />
        <StatCard title="🤝 Good First Issues" value={repo.goodFirstIssues.totalCount} />
        <StatCard title="🏷️ Labels Tracked" value={repo.labels.nodes.length} />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">🆕 Recent Issues</h3>
          <ul className="list-disc pl-5 text-sm space-y-2">
            {repo.recentIssues?.nodes?.map((issue: any) => (
              <li key={issue.number}>
                <a href={issue.url} target="_blank" className="text-blue-600 underline">
                  #{issue.number} - {issue.title}
                </a>{' '}
                ({new Date(issue.createdAt).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4"></div>
      
        <LabelChart data={repo.labelData} />
      </div>

      <div className="p-6"></div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">📂 Pull Requests Summary</h2>
          <p>Average time to merge a PR : {repo.averageMergeTimeInDays}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListPRDetailsCard title="Total Pull Requests" value={repo.pullRequests} />
            <ListPRDetailsCard title="Open Pull Requests" value={repo.openPRs} />
            <ListPRDetailsCard title="Merged Pull Requests" value={repo.mergedPRs} />
            <ListPRDetailsCard title="Recent Pull Requests" value={repo.recentPRs} />
          </div>
      </div>

      <div className="p-6"></div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">👥 Top Contributors</h2>
        <ul className="divide-y divide-gray-200">
          {repo.topContributors?.map((contributor: any) => (
            <li key={contributor.login} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <img
                  src={contributor.avatarUrl}
                  alt={contributor.login}
                  className="w-10 h-10 rounded-full"
                />
                <a
                  href={contributor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {contributor.login}
                </a>
              </div>
              <span className="text-sm text-gray-500">{contributor.commits} commits</span>
            </li>
          ))}
        </ul>
      </div>


    </div>
    
  );
}
