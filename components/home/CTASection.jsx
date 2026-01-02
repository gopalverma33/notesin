'use client';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { useState, useEffect } from 'react';

const CTASection = () => {
  const [circles, setCircles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate random values only on client side
    const generatedCircles = [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 60 + 20, // 20-80px
      height: Math.random() * 60 + 20, // 20-80px
      top: Math.random() * 100, // 0-100%
      left: Math.random() * 100, // 0-100%
      animationDelay: Math.random() * 5, // 0-5s
      animationDuration: Math.random() * 10 + 10, // 10-20s
    }));
    setCircles(generatedCircles);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              top: `${circle.top}%`,
              left: `${circle.left}%`,
              animationDelay: `${circle.animationDelay}s`,
              animationDuration: `${circle.animationDuration}s`,
            }}
          ></div>
        ))}
        
        {/* Fallback for SSR - static circles */}
        {!isClient && (
          <>
            <div className="absolute rounded-full bg-white/10" style={{ width: '40px', height: '40px', top: '20%', left: '10%' }}></div>
            <div className="absolute rounded-full bg-white/10" style={{ width: '60px', height: '60px', top: '60%', left: '80%' }}></div>
            <div className="absolute rounded-full bg-white/10" style={{ width: '30px', height: '30px', top: '80%', left: '30%' }}></div>
            <div className="absolute rounded-full bg-white/10" style={{ width: '50px', height: '50px', top: '40%', left: '60%' }}></div>
            <div className="absolute rounded-full bg-white/10" style={{ width: '70px', height: '70px', top: '10%', left: '40%' }}></div>
          </>
        )}
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            🚀 Get Started Today
          </div>
          
          <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Ready to Land Your{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join over <span className="font-semibold text-white">50,000 job seekers</span> who have successfully created professional resumes 
            with our easy-to-use builder. Start building your future today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <Link href="/resume/form">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-50 w-full sm:w-auto focus:ring-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group font-semibold"
            >
              <span className="flex items-center justify-center">
                Start Building Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Button>
          </Link>
          
          <Link href="/resume/templates">
            <Button 
              variant="secondary" 
              size="lg" 
              className="border-2 border-white/80 text-white bg-white/10 hover:bg-white hover:text-blue-600 w-full sm:w-auto focus:ring-white backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              View All Templates
            </Button>
          </Link>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-200 mb-8">
            {[
              { icon: '✅', text: 'No credit card required' },
              { icon: '🎨', text: 'Free templates' },
              { icon: '⏰', text: 'Cancel anytime' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          
          {/* Trust indicators */}
          {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-white text-sm font-medium mb-3">Trusted by job seekers from top companies</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-90">
              {['Google', 'Microsoft', 'Amazon', 'Apple', 'Netflix'].map((company, index) => (
                <div key={index} className="text-white font-semibold text-sm">
                  {company}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTASection;