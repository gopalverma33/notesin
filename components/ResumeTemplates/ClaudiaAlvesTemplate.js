'use client';
import React from 'react';

export default function ClaudiaAlvesTemplate({ data }) {
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
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {personalInfo?.fullName || `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim() || "Claudia Alves"}
        </h1>
        {experience?.[0]?.jobTitle && (
          <h2 className="text-lg md:text-xl font-normal text-gray-700">
            {experience[0].jobTitle}
          </h2>
        )}
        
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-2 md:gap-4 mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
          {personalInfo?.phone && <div>{personalInfo.phone}</div>}
          {personalInfo?.email && <div>{personalInfo.email}</div>}
          {personalInfo?.portfolio && <div>{personalInfo.portfolio}</div>}
          {personalInfo?.address && <div>{personalInfo.address}</div>}
          {personalInfo?.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </div>

      <div className="border-t border-gray-300 my-4 md:my-6"></div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Professional Summary</h2>
          <div className="border-t border-gray-300 mb-3"></div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px]">{summary}</p>
          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Education</h2>
          <div className="border-t border-gray-300 mb-3"></div>
          
          {education.map((edu, index) => (
            <div key={index} className={index > 0 ? 'mt-4 md:mt-6' : 'mb-4 md:mb-6'}>
              <h3 className="font-semibold text-gray-900 text-sm md:text-[16px]">{edu.institution}</h3>
              <p className="font-medium text-gray-700 text-sm md:text-[15px] mt-1">{edu.degree}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-gray-600 text-xs md:text-[14px]">
                  {formatEducationYears(edu)}
                </span>
              </div>
            </div>
          ))}
          
          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Work Experience</h2>
          <div className="border-t border-gray-300 mb-3"></div>
          
          {experience.map((exp, index) => (
            <div key={index} className={index > 0 ? 'mt-4 md:mt-6' : 'mb-4 md:mb-6'}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-[16px]">{exp.jobTitle}</h3>
                  <p className="font-medium text-gray-700 text-sm md:text-[15px] mt-1">{exp.company}</p>
                </div>
                <span className="font-semibold text-gray-600 text-xs md:text-[14px] md:whitespace-nowrap">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </span>
              </div>
              {exp.description && (
                <p className="text-gray-700 mt-2 leading-relaxed text-xs md:text-[14px]">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
          
          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Skills & Certifications - Stack on mobile, 2 columns on desktop */}
      {(skills && skills.length > 0) || (certifications && certifications.length > 0) ? (
        <div className="mb-6 md:mb-8 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Skills</h2>
              <div className="border-t border-gray-300 mb-3"></div>
              
              <ul className="space-y-1 md:space-y-2">
                {skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 text-xs md:text-[14px]">• {skill}</li>
                ))}
              </ul>
              
              <div className="border-t border-gray-300 mt-3"></div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Certifications</h2>
              <div className="border-t border-gray-300 mb-3"></div>
              
              <ul className="space-y-1 md:space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="text-gray-700 text-xs md:text-[14px]">• {cert}</li>
                ))}
              </ul>
              
              <div className="border-t border-gray-300 mt-3"></div>
            </div>
          )}
        </div>
      ) : null}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Projects</h2>
          <div className="border-t border-gray-300 mb-3"></div>
          
          {projects.map((project, index) => (
            <div key={index} className={index > 0 ? 'mt-4 md:mt-6' : 'mb-4 md:mb-6'}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm md:text-[15px]">{project.name}</h3>
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
                <p className="text-gray-700 mt-1 leading-relaxed text-xs md:text-[14px]">
                  {project.description}
                </p>
              )}
            </div>
          ))}
          
          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Languages</h2>
          <div className="border-t border-gray-300 mb-3"></div>
          
          <ul className="space-y-1 md:space-y-2">
            {languages.map((language, index) => (
              <li key={index} className="text-gray-700 text-xs md:text-[14px]">• {language}</li>
            ))}
          </ul>
          
          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Professional References */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Professional References</h2>
        <div className="border-t border-gray-300 mb-3"></div>
        
        <div className="text-gray-700 text-xs md:text-[14px]">
          <p>References available upon request</p>
        </div>
      </div>
    </div>
  );
}