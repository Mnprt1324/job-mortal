export const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="p-2 bg-white rounded-lg">
      <Icon className="w-4 h-4 text-gray-600" />
    </div>
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  </div>
);