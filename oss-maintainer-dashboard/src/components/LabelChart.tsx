import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

export default function LabelChart({ data }: { data: { name: string; count: number }[] }) {
  // Sort and get top 10 labels
  const topLabels = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📊 Top 10 Issue Labels</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={topLabels}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="count">
            {topLabels.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
