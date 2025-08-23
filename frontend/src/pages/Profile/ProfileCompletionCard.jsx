export const ProfileCompletionCard = ({ completion }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">Profile Completion</h3>
      <span className="text-2xl font-bold text-blue-600">{completion}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${completion}%` }}></div>
    </div>
    <p className="text-sm text-gray-600 mb-4">Complete your profile to increase visibility to employers.</p>
    <button className="w-full px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
      Complete Profile
    </button>
  </div>
);