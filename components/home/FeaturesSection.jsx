'use client';
import { FileText, Eye, CheckCircle, Download } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: 'Professional Templates',
      description: 'Choose from 6 carefully designed templates that are loved by recruiters and hiring managers.',
      color: 'blue'
    },
    {
      icon: Eye,
      title: 'Real-time Preview',
      description: 'See your resume update instantly as you type. No more guessing how it will look.',
      color: 'purple'
    },
    {
      icon: CheckCircle,
      title: 'ATS-friendly Format',
      description: 'All templates are optimized to pass through Applicant Tracking Systems successfully.',
      color: 'green'
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Download your resume in PDF, DOCX, or TXT format with just one click.',
      color: 'cyan'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            Powerful Features
          </div>
          
          <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get Hired
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our professional resume builder includes all the tools you need to create 
            a standout resume that gets results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorMap = {
              blue: 'from-blue-500 to-blue-600',
              purple: 'from-purple-500 to-purple-600',
              green: 'from-green-500 to-green-600',
              cyan: 'from-cyan-500 to-cyan-600'
            };
            
            return (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-transparent hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[feature.color]} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
                
               
              </div>
            );
          })}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          {[
            { value: '10K+', label: 'Happy Users' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '7', label: 'Templates' },
            { value: '3', label: 'Export Formats' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100/50">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;