import { Search, Users, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Searchjob = () => {
  const navigate=useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-[300px] flex justify-center items-center py-12 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl w-full gap-8">
        {/* Content Section */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left flex-1 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <Search className="w-6 h-6 text-blue-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Let employers find you
          </h1>
          
          <p className="text-gray-600 text-lg max-w-md leading-relaxed">
            Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
          </p>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Millions of users</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="w-4 h-4" />
              <span>15.8M CVs</span>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4">
          <button 
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 active:transform active:scale-95"
            onClick={()=> navigate("/findjob")}
            aria-label="Search for jobs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span>Search Jobs</span>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-200"></div>
          </button>
          
          <p className="text-xs text-gray-500 text-center max-w-xs">
            Start your search and connect with top employers today
          </p>
        </div>
      </div>
    </div>
  );
};