'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Badge, Code, FileText, Rocket, Brain, Trophy, User, ArrowRight, Star, Users, Clock, Sparkles, Zap, Target, Award, Cpu, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Static Stats Display (no animation)
const StaticCounter = ({ value }) => {
  return <span>{value}</span>;
};

// Enhanced Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={feature.link} key={feature.title}>
      <div
        className="relative rounded-2xl p-8 h-full cursor-pointer group overflow-hidden transition-all duration-500 hover:-translate-y-3"
        style={{
          background: `linear-gradient(135deg, ${feature.bgGradient})`,
          transform: `translateY(${isHovered ? '-12px' : '0px'})`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Light version of hover gradient as default background */}
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${feature.gradient}`} />
        
        {/* Floating animation */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            transform: 'translateX(-100%)',
            animation: isHovered ? 'shimmer 2s infinite' : 'none'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            {feature.stats && (
              <div className="text-xs font-bold text-white bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                {feature.stats}
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
            {feature.title}
          </h3>

          <p className="text-gray-700 group-hover:text-white/90 mb-6 leading-relaxed transition-colors duration-300">
            {feature.description}
          </p>

          <div className="flex items-center text-blue-600 font-semibold group-hover:text-white transition-colors duration-300">
            <span>Explore Now</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>

        {/* Enhanced border glow */}
        <div className={`absolute inset-0 rounded-2xl border-2 opacity-30 group-hover:opacity-100 transition-all duration-500 ${
          feature.gradient.includes('blue') ? 'border-blue-400/50' :
          feature.gradient.includes('purple') ? 'border-purple-400/50' :
          feature.gradient.includes('green') ? 'border-green-400/50' :
          'border-orange-400/50'
        }`} />
      </div>
    </Link>
  );
};

const Typewriter = ({ texts, speed = 100, delay = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (currentWordIndex >= texts.length) return;

    const timeout = setTimeout(() => {
      if (currentIndex < texts[currentWordIndex].length) {
        setCurrentText(prev => prev + texts[currentWordIndex][currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentText('');
          setCurrentIndex(0);
          setCurrentWordIndex(prev => (prev + 1) % texts.length);
        }, delay);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentWordIndex, texts, speed, delay]);

  return (
    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Static stats - manual numbers
  const stats = [
    { number: "4.5K+", label: "Active Students", icon: Users, color: "text-blue-600" },
    { number: "50+", label: "Study Material", icon: Award, color: "text-purple-600" },
    { number: "95%", label: "Success Rate", icon: TrendingUp, color: "text-green-600" },
    { number: "24/7", label: "AI Support", icon: Cpu, color: "text-orange-600" }
  ];

  const features = [
   {
  icon: BookOpen,
  title: 'University Notes + Programming Resources',
  description: 'Access organized notes and coding resources with smart categorization, quick search, and personalized recommendations.',
  link: '/notes',
  gradient: 'from-indigo-400 to-purple-400',
  bgGradient: 'from-indigo-100 to-purple-100',
}
,
    {
      icon: Code,
      title: 'Interactive Code Lab',
      description: 'Live code editor with instant execution, syntax highlighting, and collaborative features in 20+ languages',
      link: '/codelab',
      gradient: 'from-purple-400 to-pink-400',
      bgGradient: 'from-purple-50 to-pink-500', // Lighter version
      stats: '200+ Snippets',
    },
    {
      icon: FileText,
      title: 'Professional Resume Builder',
      description: 'ATS-optimized templates with real-time preview, industry insights, and export options',
      link: '/resume',
      gradient: 'from-green-400 to-emerald-400',
      bgGradient: 'from-green-50 to-emerald-100', // Lighter version
      stats: '6+ Templates',
    },
    {
      icon: Brain,
      title: 'AI Learning Assistant',
      description: 'Personalized tutoring, question generation, concept explanation, and study planning with advanced neural networks',
      link: '/ai-tools',
      gradient: 'from-orange-400 to-red-400',
      bgGradient: 'from-orange-50 to-red-50', // Lighter version
      stats: 'AI Powered',
    },
    {
      icon: Trophy,
      title: 'Gamified Quizzes',
      description: 'Adaptive testing with performance analytics, achievements, and competitive leaderboards',
      link: '/quiz',
      gradient: 'from-red-400 to-rose-400',
      bgGradient: 'from-red-50 to-rose-50', // Lighter version
      stats: '1000+ Questions',
    },
 
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 25%),
              radial-gradient(circle at ${mousePosition.x * 0.7}px ${mousePosition.y * 0.7}px, rgba(147, 51, 234, 0.1) 0%, transparent 25%),
              radial-gradient(circle at ${mousePosition.x * 1.3}px ${mousePosition.y * 1.3}px, rgba(236, 72, 153, 0.1) 0%, transparent 25%)
            `
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
             <Rocket  className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800"> Live & Growing - Join 4K+ Students</span>
            </div>
               
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Transform Your</span>
              <br />
              <Typewriter 
                texts={["Learning Experience", "Study Habits", "Career Path", "Academic Journey"]} 
                speed={100}
                delay={2000}
              />
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the future of education with our AI-powered platform, offering university notes, study tools, interactive code labs, real-time collaboration, adaptive learning, and personalized career-focused paths for ambitious students
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="#premium-features">
                <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Zap className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                    Start Learning Free
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </a>
            </div>

            {/* Floating Elements */}
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float" />
              <div className="absolute -top-10 -right-32 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-16 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Enhanced Static Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="group text-center transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-4 group-hover:shadow-3xl transition-all duration-500 transform group-hover:rotate-12 border-2 ${stat.color.replace('text', 'border')}`}>
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <StaticCounter value={stat.number} />
                </div>
                <div className="text-sm text-gray-600 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section id="premium-features" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20"> 
            <span className="inline-flex items-center justify-center mb-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium">
              <Award className="mr-2 h-4 w-4" />
              Premium Features
            </span> 
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Excel Academically
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive suite of tools designed specifically for modern students who demand excellence
            </p>
          </div>

          {/* Enhanced Feature Grid with new cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 py-10">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      
      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Limited Time: Free Premium Access</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
              Academic Future?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who are already achieving academic excellence and career success.
          </p>
          
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            < Link href ="/about">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 flex justify-center items-center">
              <Zap className="mr-2 h-5 w-5" />
             Learn More
            </button>
            </Link>
    <a href="https://chat.whatsapp.com/HKa2zNywtdEJXgKKkHsRtM" target="_blank" rel="noopener noreferrer">
  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300 flex justify-center items-center">
    <Users className="mr-2 h-5 w-5" />
    Join Community
  </button>
</a>
          </div>
          
          <div className="mt-8 text-sm text-gray-400">
            ✨ No credit card required • 🚀 Instant access • 🎓 Cancel anytime
          </div>
        </div>
      </section>

      {/* Custom CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}