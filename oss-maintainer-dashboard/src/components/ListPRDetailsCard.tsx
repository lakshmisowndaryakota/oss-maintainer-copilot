type ListPRDetailsCardProps = {
  title: string;
  value: any;
  icon?: React.ReactNode; // optional, if you want to show an icon
};

const ListPRDetailsCard = ({ title, value, icon }: ListPRDetailsCardProps) => {
  const items = value?.nodes ?? value ?? [];

  return (
    <div className="bg-white shadow rounded-xl p-4 min-h-[200px] flex flex-col">
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <h2 className="font-bold mb-2">
        {title} ({value?.totalCount ?? items.length})
      </h2>
      <ul className="text-sm list-disc pl-4 space-y-1 flex-1">
        {items.length > 0 ? (
          items.map((pr: any) => (
            <li key={pr.number}>
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                #{pr.number} - {pr.title} - {pr.state}
              </a>
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No data available</li>
        )}
      </ul>
    </div>
  );
};

export default ListPRDetailsCard;
