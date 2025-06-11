type TimelineItemProps = {
    type: string;
    title: string;
    url: string;
    user: any;
    updatedAt: string;
  };
  
  const TimelineItem = ({ type, title, url, user, updatedAt }: TimelineItemProps) => (
    <div className="flex items-start space-x-4 mb-4">
      <img src={user.avatarUrl} alt={user.login} className="w-8 h-8 rounded-full" />
      <div>
        <p>
          <strong>{user.login}</strong> {type}:{" "}
          <a href={url} className="text-blue-600 underline">{title}</a>
        </p>
        <p className="text-sm text-gray-500">{new Date(updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
  
  
  export default TimelineItem;
  