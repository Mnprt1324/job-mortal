export const QuickActionsCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        Browse New Jobs
      </button>
      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        Update Resume
      </button>
      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        View Applications
      </button>
      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        Account Settings
      </button>
    </div>
  </div>
);