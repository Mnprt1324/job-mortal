import { Globe, Mail, Phone } from "lucide-react";

export const ContactInfoCard = ({ user }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
    <div className="space-y-3">
      {user?.email && (
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{user.email}</span>
        </div>
      )}
      {user?.profile?.phone && (
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{user.profile.phone}</span>
        </div>
      )}
      {user?.profile?.website && (
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-gray-400" />
          <a href={user.profile.website} className="text-sm text-blue-600 hover:text-blue-700">Portfolio</a>
        </div>
      )}
    </div>
  </div>
);