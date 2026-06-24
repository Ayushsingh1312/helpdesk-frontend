function Badge({type, value}) {
    const statusColors = {
        open: 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        resolved: 'bg-green-100 text-green-800',
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-700',
        medium: 'bg-orange-100 text-orange-800',
        high: 'bg-red-100 text-red-800',
    };

    const colors = 
      type === 'status' ? statusColors[value] : priorityColors[value];

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${colors}`}>
            {value}
        </span>
      );
}

export default Badge;