'use client';
import React from 'react';

export default function OliviaWilsonTemplate({ data }) {
  if (!data) return null;

  const { personalInfo, summary, education, experience, skills, certifications, languages, projects } = data;

  // Helper function to format education years
  const formatEducationYears = (edu) => {
    if (edu.startYear && edu.endYear) {
      return `${edu.startYear} - ${edu.endYear}`;
    } else if (edu.startYear && !edu.endYear) {
      return `${edu.startYear} - Present`;
    } else if (!edu.startYear && edu.endYear) {
      return `Graduated: ${edu.endYear}`;
    }
    return '';
  };

  return (
    <div 
      className="font-sans text-gray-800 bg-white mx-auto w-full"
      style={{
        maxWidth: '210mm',
        minHeight: '100vh',
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {personalInfo?.fullName || `${personalInfo?.firstName || 'Olivia'} ${personalInfo?.lastName || 'Wilson'}`.trim()}
        </h1>
        
        {/* Dynamic job title from first experience or default */}
        {experience?.[0]?.jobTitle ? (
          <h2 className="text-lg md:text-xl text-gray-600">{experience[0].jobTitle}</h2>
        ) : (
          <h2 className="text-lg md:text-xl text-gray-600">Marketing Manager</h2>
        )}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Sidebar - Comes first on mobile */}
        <div className="md:col-span-1 order-2 md:order-1">
          {/* Contact Information */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Contact</h3>
            <div className="space-y-2 text-xs md:text-sm">
              {personalInfo?.email && (
                <div className="text-blue-600 font-medium break-all">{personalInfo.email}</div>
              )}
              {personalInfo?.phone && (
                <div className="text-gray-700">{personalInfo.phone}</div>
              )}
              {personalInfo?.address && (
                <div className="text-gray-700">{personalInfo.address}</div>
              )}
              {personalInfo?.portfolio && (
                <div className="text-gray-700 break-all">{personalInfo.portfolio}</div>
              )}
              {personalInfo?.linkedin && (
                <div className="text-gray-700 break-all">{personalInfo.linkedin}</div>
              )}
            </div>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Education</h3>
              <div className="space-y-3 md:space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 text-sm md:text-[15px]">{edu.degree}</h4>
                    <p className="text-xs text-gray-600 mt-1">{edu.institution}</p>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      {formatEducationYears(edu)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Skills</h3>
              <ul className="space-y-1 text-xs md:text-sm">
                {skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">• {skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Languages</h3>
              <div className="text-xs md:text-sm space-y-1">
                {languages.map((language, index) => (
                  <div key={index} className="text-gray-700">• {language}</div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Certifications</h3>
              <div className="text-xs md:text-sm space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-gray-700">• {cert}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Main Content - Comes first on mobile */}
        <div className="md:col-span-2 order-1 md:order-2">
          {/* Professional Summary */}
          {summary && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Professional Summary</h3>
              <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Work Experience</h3>
              
              {experience.map((exp, index) => (
                <div key={index} className={index > 0 ? 'mt-4 md:mt-6' : 'mb-4 md:mb-6'}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-2">
                    <div>
                      <div className="font-medium text-gray-900 text-sm md:text-[16px]">{exp.jobTitle}</div>
                      {exp.company && (
                        <div className="text-gray-700 text-sm md:text-[15px] mt-1">{exp.company}</div>
                      )}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 md:text-right md:whitespace-nowrap">
                      <div>{exp.startDate} - {exp.endDate || 'Present'}</div>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Projects</h3>
              
              {projects.map((project, index) => (
                <div key={index} className={index > 0 ? 'mt-4 md:mt-6' : 'mb-4 md:mb-6'}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-2">
                    <div>
                      <div className="font-medium text-gray-900 text-sm md:text-[15px]">{project.name}</div>
                    </div>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xs md:text-sm hover:underline md:whitespace-nowrap break-all"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Professional References */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">Professional References</h3>
            
            <div className="text-xs md:text-sm text-gray-700">
              <p>References available upon request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}