import { Building, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export const ApplicationCard = ({ application }) => {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{application.job?.title || "N/A"}</h4>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Building className="w-4 h-4" />
            <span>{application.job?.company?.companyName || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(application.status)}
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(application.status)}`}>
            {application.status || 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
};
