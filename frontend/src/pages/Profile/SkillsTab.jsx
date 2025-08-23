import { Award } from "lucide-react";

export const SkillsTab = ({ skills }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">Skills & Expertise</h3>
      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
        Add Skills
      </button>
    </div>

    {skills?.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span key={idx} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
            {skill}
          </span>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">No skills added</h4>
        <p className="text-gray-600 mb-6">Add your skills to help employers find you for relevant positions.</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Skills
        </button>
      </div>
    )}
  </div>
);