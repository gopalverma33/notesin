'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const StatsSection = () => {
  const [circles, setCircles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const stats = [
    { number: '50+', label: 'Resumes Created', icon: '📄' },
    { number: '98%', label: 'Success Rate', icon: '🎯' },
    { number: '24/7', label: 'Support Available', icon: '🛠️' },
    { number: '7', label: 'Professional Templates', icon: '🎨' },
  ];

  useEffect(() => {
    setIsClient(true);
    // Generate random values only on client side
    const generatedCircles = [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 80 + 20, // 20-100px
      height: Math.random() * 80 + 20, // 20-100px
      top: Math.random() * 100, // 0-100%
      left: Math.random() * 100, // 0-100%
      animationDelay: Math.random() * 5, // 0-5s
      animationDuration: Math.random() * 15 + 5, // 5-20s
    }));
    setCircles(generatedCircles);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
          />
        ))}
        
        {/* Fallback for SSR - static circles that match the design but don't cause hydration issues */}
        {!isClient && (
          <>
            {/* Static placeholder circles that will be replaced on client */}
            <div className="absolute rounded-full bg-white/10" style={{ width: '40px', height: '40px', top: '20%', left: '10%' }} />
            <div className="absolute rounded-full bg-white/10" style={{ width: '60px', height: '60px', top: '60%', left: '80%' }} />
            <div className="absolute rounded-full bg-white/10" style={{ width: '30px', height: '30px', top: '80%', left: '30%' }} />
          </>
        )}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 animate-fade-in-up group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-2xl mb-3 opacity-80 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              
              <div className="font-inter font-bold text-3xl md:text-4xl text-white mb-2">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {stat.number}
                </span>
              </div>
              
              <div className="text-blue-100 text-sm md:text-base font-medium">
                {stat.label}
              </div>
              
              {/* Animated underline effect */}
              <div className="w-8 h-0.5 bg-white/30 mx-auto mt-4 group-hover:w-16 group-hover:bg-white/60 transition-all duration-500"></div>
            </div>
          ))}
        </div>
        
        {/* CTA section */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <p className="text-blue-100 text-lg mb-6">
            Join thousands of successful job seekers
          </p>
          <Link href="/resume/form">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Get Started Free
          </button></Link>
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

export default StatsSection;