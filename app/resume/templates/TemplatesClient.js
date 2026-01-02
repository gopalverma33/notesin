"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TemplatesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [hasFormData, setHasFormData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFormData = () => {
      try {
        const data = localStorage.getItem("resumeFormData");
        if (data && data !== '{}' && data !== 'null') {
          const parsedData = JSON.parse(data);
          setResumeData(parsedData);
          setHasFormData(true);
        } else {
          setHasFormData(false);
          router.push('/resume/builder');
          return;
        }
      } catch (error) {
        console.error('Error checking form data:', error);
        setHasFormData(false);
        router.push('/resume/builder');
      } finally {
        setIsLoading(false);
      }
    };

    checkFormData();

    const templateParam = searchParams.get('template');
    if (templateParam && !isNaN(templateParam) && templateParam >= 1 && templateParam <= 20) {
      setSelectedTemplate(parseInt(templateParam));
    }
  }, [searchParams, router]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = (templateId) => {
    if (!hasFormData || !resumeData) {
      router.push('/resume/builder');
      return;
    }

    if (templateId) {
      localStorage.setItem("selectedTemplate", templateId.toString());
      localStorage.setItem("resumeFormData", JSON.stringify(resumeData));
      router.push("/resume/builder");
    }
  };

  const handleStartBuilding = () => {
    router.push('/resume/builder');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your resume data...</p>
        </div>
      </div>
    );
  }

  if (!hasFormData) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Resume First</h2>
          <p className="text-gray-600 mb-6">
            You need to fill out your resume information before you can preview templates.
          </p>
          <button
            onClick={handleStartBuilding}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Start Building Your Resume
          </button>
        </div>
      </div>
    );
  }

  const templateData = [
    { id: 1, name: "Modern Pro", description: "Clean and professional design", image: "/Template1.jpg" },
    { id: 2, name: "Elegant Pro", description: "Elegant layout for professionals", image: "/Template2.jpg" },
    { id: 3, name: "Daniel Gallego", description: "UX Designer focused template", image: "/DanielGallegoTemplate.jpg" },
    { id: 4, name: "Benjamin Shah", description: "Engineering and technical format", image: "/BenjaminShahTemplate.jpg" },
    { id: 5, name: "Olivia Wilson", description: "Marketing manager template", image: "/OliviaWilsonTemplate.jpg" },
    { id: 6, name: "Claudia Alves", description: "Sales manager template", image: "/ClaudiaAlvesTemplate.jpg" },
    { id: 7, name: "Juliana Silva", description: "Family wellness counselor template", image: "/JulianaSilvaTemplate.jpg" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex flex-col justify-between">
      <div className="flex-grow overflow-y-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Choose a Template
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from our ATS-verified templates with 95-100% success rate.
            </p>
            {hasFormData && (
              <div className="mt-4 inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full shadow-sm border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Resume data loaded successfully</span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleStartBuilding}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
            >
              Edit Resume Data
            </button>
            <Link href="/resume">
              <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition duration-300">
                Back to Resume Hub
              </button>
            </Link>
          </div>

          {/* Templates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {templateData.map((template) => (
              <div
                key={template.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl group ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 ring-4 ring-blue-100 scale-105'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div
                  className="relative cursor-pointer overflow-hidden bg-gray-100"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="aspect-[1/1.414] w-full h-full flex items-center justify-center">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-black bg-opacity-70 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {template.name}
                      </span>
                    </div>
                  </div>

                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    ATS VERIFIED
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{template.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${selectedTemplate === template.id ? 'text-blue-600' : 'text-gray-500'}`}>
                        {selectedTemplate === template.id ? '✓ Selected' : 'Click image to select'}
                      </span>
                      <span className="text-xs text-gray-400">Template #{template.id}</span>
                    </div>

                    <button
                      onClick={() => handlePreview(template.id)}
                      className="w-full py-3 px-4 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ATS Info */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Templates are ATS Verified</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">95–100% Success Rate</h3>
                <p className="text-gray-600 text-sm">Optimized for applicant tracking systems</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Fast Processing</h3>
                <p className="text-gray-600 text-sm">Quick parsing by recruitment software</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Secure Formatting</h3>
                <p className="text-gray-600 text-sm">No data loss during submission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
