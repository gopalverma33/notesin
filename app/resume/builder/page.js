'use client';
// app/resume/builder/page.js

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';




import Template1 from '@/components/ResumeTemplates/Template1';
import Template2 from '@/components/ResumeTemplates/Template2';
import DanielGallegoTemplate from '@/components/ResumeTemplates/DanielGallegoTemplate';
import BenjaminShahTemplate from '@/components/ResumeTemplates/BenjaminShahTemplate';
import OliviaWilsonTemplate from '@/components/ResumeTemplates/OliviaWilsonTemplate';
import ClaudiaAlvesTemplate from '@/components/ResumeTemplates/ClaudiaAlvesTemplate';
import JulianaSilvaTemplate from '@/components/ResumeTemplates/JulianaSilvaTemplate';

// ✅ STRICT validation - check if form has REAL content
const isFormDataValid = (formData) => {
  if (!formData) return false;
  
  // Check if personal info has REAL content (not just empty strings)
  if (formData.personal) {
    const hasRealName = (formData.personal.firstName && formData.personal.firstName.trim().length > 0) || 
                       (formData.personal.lastName && formData.personal.lastName.trim().length > 0);
    const hasRealEmail = formData.personal.email && formData.personal.email.trim().length > 0;
    
    if (hasRealName || hasRealEmail) {
      return true;
    }
  }
  
  // Check if education has REAL entries
  if (formData.education && formData.education.length > 0) {
    const hasRealEducation = formData.education.some(edu => 
      (edu.degree && edu.degree.trim().length > 0) || 
      (edu.institution && edu.institution.trim().length > 0)
    );
    if (hasRealEducation) return true;
  }
  
  // Check if experience has REAL entries
  if (formData.experience && formData.experience.length > 0) {
    const hasRealExperience = formData.experience.some(exp => 
      (exp.jobTitle && exp.jobTitle.trim().length > 0) || 
      (exp.company && exp.company.trim().length > 0)
    );
    if (hasRealExperience) return true;
  }
  
  // Check if skills have REAL content
  if (formData.skills && formData.skills.length > 0) {
    const hasRealSkills = formData.skills.some(skill => skill && skill.trim().length > 0);
    if (hasRealSkills) return true;
  }
  
  // Check if summary has REAL content (at least 10 characters)
  if (formData.summary && formData.summary.trim().length > 10) {
    return true;
  }
  
  return false;
};

// ✅ Map form data into template-friendly format with fallbacks
const mapDataForTemplate = (formData) => {
  if (!formData) return {};

  return {
    summary: formData.summary || "",
    personalInfo: {
      fullName: `${formData.personal?.firstName || ""} ${formData.personal?.lastName || ""}`.trim(),
      email: formData.personal?.email || "",
      phone: formData.personal?.phone || "",
      address: formData.personal?.address || "",
      linkedin: formData.personal?.linkedin || "",
      portfolio: formData.personal?.portfolio || "",
    },
    education: formData.education || [],
    experience: formData.experience || [],
    skills: formData.skills || [],
    certifications: formData.certifications || [],
    languages: formData.languages || [],
    projects: formData.projects || [],
  };
};

// ✅ CSS styles for PDF optimization
const pdfStyles = `
  @media print {
    .resume-container {
      page-break-before: avoid !important;
      page-break-after: avoid !important;
      page-break-inside: avoid !important;
    }
    
    .avoid-break {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    .single-page-resume {
      height: 1122px !important; /* A4 height in pixels for 96 DPI */
      max-height: 1122px !important;
      overflow: hidden !important;
    }
    
    /* Force single page */
    body, html {
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Prevent elements from splitting across pages */
    .section-break {
      break-inside: avoid;
    }
    
    .compact-mode {
      margin: 0;
      padding: 0;
    }
  }
  
  .pdf-optimized {
    transform: scale(0.95);
    transform-origin: top center;
  }
`;

export default function BuilderPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFormData, setHasFormData] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const resumeRef = useRef();

  useEffect(() => {
    setIsClient(true);
    
    const checkFormData = () => {
      try {
        const data = localStorage.getItem('resumeFormData');
        console.log("📦 Raw localStorage data:", data);
        
        // If no data or empty object, not valid
        if (!data || data === '{}' || data === 'null') {
          console.log("❌ No resume data found");
          setHasFormData(false);
          setIsLoading(false);
          return;
        }
        
        const parsed = JSON.parse(data);
        console.log("📊 Parsed form data structure:", parsed);
        
        // ✅ STRICT validation
        const isValid = isFormDataValid(parsed);
        console.log("✅ Is form data valid?", isValid);
        
        if (!isValid) {
          console.log("❌ Form data exists but is empty/invalid");
          setHasFormData(false);
          setIsLoading(false);
          return;
        }
        
        // Only set data if it's truly valid
        setResumeData(mapDataForTemplate(parsed));
        setHasFormData(true);
        
        const template = localStorage.getItem('selectedTemplate');
        if (template) {
          setSelectedTemplate(parseInt(template));
        }
        
      } catch (error) {
        console.error("❌ Error checking resume data:", error);
        setHasFormData(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkFormData();
  }, [router]);

  const handleDownload = async () => {
    if (!resumeRef.current || isGeneratingPDF) return;

    setIsGeneratingPDF(true);
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const element = resumeRef.current;
      
      // ✅ OPTIMIZED PDF SETTINGS FOR SINGLE PAGE
      const options = {
        margin: [0.3, 0.3, 0.3, 0.3], // Reduced margins: [top, left, bottom, right] in inches
        filename: 'My_Resume.pdf',
        image: { 
          type: 'jpeg', 
          quality: 0.92 // Slightly reduced quality for smaller file size
        },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: false,
          letterRendering: true,
          width: 794, // A4 width in pixels (794px = 210mm at 96 DPI)
          height: 1123, // A4 height in pixels (1123px = 297mm at 96 DPI)
          scrollX: 0,
          scrollY: 0,
          windowWidth: 794
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.avoid-break-before',
          after: '.avoid-break-after',
          avoid: '.avoid-break'
        },
        // ✅ FORCE SINGLE PAGE
        enableLinks: false,
        onProgress: (progress) => {
          console.log(`PDF Generation Progress: ${Math.round(progress * 100)}%`);
        }
      };

      // Add PDF optimization styles temporarily
      const styleSheet = document.createElement("style");
      styleSheet.innerText = pdfStyles;
      document.head.appendChild(styleSheet);

      // Add compact class during PDF generation
      element.classList.add('pdf-optimized', 'single-page-resume');

      await html2pdf().set(options).from(element).save();

      // Clean up
      element.classList.remove('pdf-optimized', 'single-page-resume');
      document.head.removeChild(styleSheet);

    } catch (error) {
      console.error('❌ PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEdit = () => {
    router.push('/resume/form');
  };

  const handleChangeTemplate = () => {
    router.push('/resume/templates');
  };

  const handleStartBuilding = () => {
    // Clear any invalid data and go to form
    localStorage.removeItem('resumeFormData');
    router.push('/resume/form');
  };

  const handleGoToForm = () => {
    router.push('/resume/form');
  };

  const renderTemplate = () => {
    if (!resumeData) return null;

    // Add compact class to all templates for better PDF rendering
    const templateProps = {
      ...resumeData,
      compact: true // Pass compact prop to templates
    };

    switch (selectedTemplate) {
      case 1: return <Template1 data={templateProps} />;
      case 2: return <Template2 data={templateProps} />;

      case 3: return <DanielGallegoTemplate data={templateProps} />;
      case 4: return <BenjaminShahTemplate data={templateProps} />;
      case 5: return <OliviaWilsonTemplate data={templateProps} />;
      case 6: return <ClaudiaAlvesTemplate data={templateProps} />;
      case 7: return <JulianaSilvaTemplate data={templateProps} />;
 
      default: return <Template1 data={templateProps} />;
    }
  };

  // Show loading state
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2563eb] mb-4"></div>
          <p className="text-gray-600">Checking your resume data...</p>
        </div>
      </div>
    );
  }

  // ✅ Show message with button if no valid form data
  if (!hasFormData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume Not Started</h2>
          <p className="text-gray-600 mb-4">
            You need to fill out your resume information before you can preview it.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Please complete the form to create and download your resume.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleGoToForm}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#9333ea] text-white px-6 py-3 rounded-lg hover:from-[#1d4ed8] hover:to-[#7e22ce] transition-all font-semibold"
            >
              Go to Resume Form
            </button>
            
            <button
              onClick={handleStartBuilding}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all font-semibold"
            >
              Start Fresh (Clear Data)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Only show resume preview if we have valid data
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] py-8 px-4">
      <style jsx global>{`
        ${pdfStyles}
        
        /* Additional client-side PDF optimization */
        .resume-preview-container {
          max-width: 794px; /* A4 width */
          margin: 0 auto;
        }
        
        .compact-resume {
          font-size: 0.9em;
          line-height: 1.3;
        }
        
        .avoid-break-inside {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2563eb] to-[#9333ea] bg-clip-text text-transparent">
              Your Resume Preview
            </h1>
            <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Resume data loaded successfully
            </p>
            {isGeneratingPDF && (
              <p className="text-blue-600 text-sm mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Generating PDF... Please wait
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleEdit}
              disabled={isGeneratingPDF}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Information
            </button>
            <button
              onClick={handleChangeTemplate}
              disabled={isGeneratingPDF}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              Change Template
            </button>
            <button
              onClick={handleDownload}
              disabled={isGeneratingPDF}
              className="px-4 py-2 bg-gradient-to-r from-[#2563eb] to-[#9333ea] text-white rounded-lg hover:from-[#1d4ed8] hover:to-[#7e22ce] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border border-gray-100 resume-preview-container">
          <div className="flex justify-center">
            <div 
              ref={resumeRef} 
              className="w-full max-w-4xl avoid-break resume-container compact-resume"
              style={{ 
                minHeight: '1122px',
                boxSizing: 'border-box'
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center text-gray-600 text-sm">
          <p>💡 Tip: Make sure all information is correct before downloading your resume.</p>
          <p className="text-xs mt-1">PDF is optimized for single-page A4 format. If content is too long, consider editing to shorten sections.</p>
        </div>
      </div>
    </div>
  );
}