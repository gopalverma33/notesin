'use client';
import Link from "next/link";
import Button from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const imageSources = [
    '/resumetamplate2-Photoroom.png',
    '/resumetemp11.png',
    '/resumetemp333.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageSources.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [imageSources.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageSources.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imageSources.length) % imageSources.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 py-12 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse-slow"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-reverse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Keep normal grid order - content left, image right on all screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Content Section - LEFT side on all screens */}
          <div className="animate-fade-in-up">
            <h1 className="font-inter font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6">
              Create Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient bg-300%">
                Resume
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              Build ATS-friendly resumes with professional templates and real-time
              preview. Land your dream job with a resume that{" "}
              <span className="font-semibold text-gray-900 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-1">stands out</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link href="\resume\form">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span className="flex items-center">
                    Start Building for Free
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Button>
              </Link>

              <Link href="\resume\templates">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              {[
                "No credit card required",
                "Free templates",
                "Trusted by 10k+ users"
              ].map((text, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm py-1 sm:py-2 px-3 sm:px-4 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section - RIGHT side on all screens */}
          <div className="relative animate-fade-in-up lg:animate-slide-up">
            <div className="transform rotate-1 hover:rotate-0 transition-all duration-500 overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px] w-full rounded-xl overflow-hidden bg-gray-50">
                {imageSources.map((src, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Resume Template ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-2 mt-3 sm:mt-4">
                {imageSources.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 w-6 sm:w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

             
            </div>

            {/* Enhanced Glow Effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-20 blur-2xl rounded-3xl -z-10 animate-pulse-slow"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes floatReverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 3s ease infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: floatReverse 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;