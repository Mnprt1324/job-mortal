import { useState } from "react";
import { ArrowRight, CheckCircle, Target, HeartHandshake } from "lucide-react";

// Improved Card component
const Card = ({ imgUrl, title, description, icon: Icon, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <div 
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100 hover:border-blue-200 max-w-sm w-full"
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      {/* Image Container */}
      <div className="relative mb-6 h-48 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Icon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <img 
              src={imgUrl} 
              alt={title}
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <Icon className="w-16 h-16 mb-2" />
            <span className="text-sm">Image unavailable</span>
          </div>
        )}
        
     
      </div>
      
      {/* Content */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>
        

      </div>
    </div>
  );
};

export const ExtraCard = () => {
  const cardData = [
    {
      imgUrl: "https://res.cloudinary.com/df3pscsym/image/upload/v1741688134/q8i50e8jeo7qpbvdjgnn.png",
      title: "Free Resume Assessments",
      description: "Get professional feedback on your resume with AI-powered analysis and personalized improvement suggestions.",
      icon: CheckCircle
    },
    {
      imgUrl: "https://res.cloudinary.com/df3pscsym/image/upload/v1741688308/y0nbuimuipd5t0nwjlzh.png",
      title: "Job Fit Scoring",
      description: "Discover how well you match job requirements with our intelligent scoring system and skill gap analysis.",
      icon: Target
    },
    {
      imgUrl: "https://res.cloudinary.com/df3pscsym/image/upload/v1741688614/ic8b6npifg7kdcuoqe2m.png",
      title: "Help Every Step of the Way",
      description: "Get personalized guidance from application to interview with our comprehensive career support system.",
      icon: HeartHandshake
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center mb-16 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            How It Works?
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
            Job opportunities for anyone, anywhere. Discover your perfect career match with our comprehensive platform.
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-6"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {cardData.map((curr, index) => (
            <Card 
              title={curr.title} 
              key={index} 
              imgUrl={curr.imgUrl}
              description={curr.description}
              icon={curr.icon}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Join thousands of job seekers who found their dream careers
          </p>
        </div>
      </div>
    </section>
  );
};