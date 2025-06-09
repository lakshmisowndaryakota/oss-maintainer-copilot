type StatCardProps = {
    title: string;
    value: number | string;
    icon?: React.ReactNode; // optional, if you want to show an icon
  };
  
  const StatCard = ({ title, value, icon }: StatCardProps) => (
    <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
      {icon && <div className="text-2xl">{icon}</div>}
      <div>
        <h4 className="font-bold text-gray-700">{title}</h4>
        <p className="text-xl font-semibold text-indigo-600">{value}</p>
      </div>
    </div>
  );
  
  export default StatCard;
  