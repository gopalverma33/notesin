'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Add this import
import { BookOpen, X, Code, FileText, Brain, Trophy, User, Menu, GraduationCap, Sparkles, Info } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // Add this hook

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Add this function to check if a link is active
  const isActiveLink = (href) => {
    return pathname === href;
  };

  const navigation = [
    { name: 'Notes', href: '/notes', icon: BookOpen },
    { name: 'Code', href: '/codelab', icon: Code },
    { name: 'Resume', href: '/resume', icon: FileText },
    { name: 'AI Tools', href: '/ai-tools', icon: Brain },
    { name: 'Quizzes', href: '/quiz', icon: Trophy },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NotesIn
              </span>
              <span className="text-xs text-gray-500 -mt-1">Smart Learning</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-md border border-blue-100'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span className="font-medium text-base">{item.name}</span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Auth buttons removed as requested */}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-800" />
          </button>

          {/* Sidebar Menu */}
           {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 z-50 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        NotesIn
                      </span>
                      <span className="text-xs text-gray-500">Learn Smarter</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Core Features */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Core Features
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname === '/' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <User className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <span className="font-medium">Home</span>
                        <p className="text-xs text-gray-500">Dashboard</p>
                      </div>
                    </Link>
                    <Link
                      href="/notes"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname.startsWith('/notes')
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <span className="font-medium">Notes</span>
                        <p className="text-xs text-gray-500">Study Materials</p>
                      </div>
                    </Link>
                    <Link
                      href="/ai-tools"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname.startsWith('/ai-tools')
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <Brain className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <span className="font-medium">AI Tools</span>
                        <p className="text-xs text-gray-500">AI Assistant</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Learning Tools */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Learning Tools
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/codelab"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname.startsWith('/codelab')
                          ? 'bg-purple-50 text-purple-600 border border-purple-100' 
                          : 'hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <Code className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <span className="font-medium">CodeLab</span>
                        <p className="text-xs text-gray-500">Practice Coding</p>
                      </div>
                    </Link>
                    <Link
                      href="/quiz"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname.startsWith('/quiz')
                          ? 'bg-purple-50 text-purple-600 border border-purple-100' 
                          : 'hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <Trophy className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <span className="font-medium">Quizzes</span>
                        <p className="text-xs text-gray-500">Test Knowledge</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Career Tools */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Career Tools
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/resume"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname.startsWith('/resume')
                          ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' 
                          : 'hover:bg-cyan-50 hover:text-cyan-600'
                      }`}
                    >
                      <FileText className="h-5 w-5 text-cyan-600" />
                      <div className="flex-1">
                        <span className="font-medium">Resume Builder</span>
                        <p className="text-xs text-gray-500">Build Resume</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Information */}
                <div className='mb-6'>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Information
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                        pathname.startsWith('/about')
                          ? 'bg-gray-100 text-gray-700 border border-gray-200' 
                          : 'hover:bg-gray-100 hover:text-gray-700'
                      }`}
                    >
                      <Info className="h-5 w-5 text-gray-600 " />
                      <div className="flex-1">
                        <span className="font-medium">About</span>
                        <p className="text-xs text-gray-500 pb-2">About Us</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
        </div>
      </div>
    </nav>
  );
}