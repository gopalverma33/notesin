'use client';
import React from 'react';

export default function BenjaminShahTemplate({ data }) {
  if (!data) return null;

  const {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    certifications,
    languages,
    projects,
  } = data;

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
      className="font-sans text-gray-800 bg-white mx-auto"
      style={{
        width: '100%',
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '4mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section - ATS Friendly (No Image) */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 text-center md:text-left">
          {personalInfo?.fullName || `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim() || "Benjamin Shah"}
        </h1>

        {/* Contact Information - Easy ATS Parsing */}
        <div className="text-xs md:text-sm text-gray-700 space-y-1 text-center md:text-left">
          {personalInfo?.email && (
            <div><strong>Email:</strong> {personalInfo.email}</div>
          )}
          {personalInfo?.phone && (
            <div><strong>Phone:</strong> {personalInfo.phone}</div>
          )}
          {personalInfo?.address && (
            <div><strong>Location:</strong> {personalInfo.address}</div>
          )}
          {personalInfo?.linkedin && (
            <div><strong>LinkedIn:</strong> {personalInfo.linkedin}</div>
          )}
          {personalInfo?.portfolio && (
            <div><strong>Portfolio:</strong> {personalInfo.portfolio}</div>
          )}
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

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Work Experience</h2>
          <div className="border-t border-gray-300 mb-3"></div>

          {experience.map((exp, index) => (
            <div key={index} className="mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-[16px]">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-gray-700 font-medium text-sm md:text-[15px]">
                    {exp.company}
                  </p>
                </div>
                <span className="text-xs md:text-sm text-gray-600 md:whitespace-nowrap">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-xs md:text-[14px] leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}

          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Education</h2>
          <div className="border-t border-gray-300 mb-3"></div>

          {education.map((edu, index) => (
            <div key={index} className="mb-3 md:mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-1">
                <h3 className="font-semibold text-gray-900 text-sm md:text-[15px]">
                  {edu.degree}
                </h3>
                <span className="text-xs md:text-sm text-gray-600 md:whitespace-nowrap">
                  {formatEducationYears(edu)}
                </span>
              </div>
              <p className="text-gray-700 text-xs md:text-[14px]">
                {edu.institution}
              </p>
            </div>
          ))}

          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}

      {/* Skills & Certifications in 2 columns on desktop, stacked on mobile */}
      {(skills && skills.length > 0) || (certifications && certifications.length > 0) ? (
        <div className="mb-6 md:mb-8 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Skills</h2>
              <div className="border-t border-gray-300 mb-3"></div>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-2 py-1 md:px-3 md:py-1.5 rounded text-xs md:text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-3"></div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Certifications</h2>
              <div className="border-t border-gray-300 mb-3"></div>
              <div className="space-y-1 md:space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-gray-700 text-xs md:text-[14px]">
                    • {cert}
                  </div>
                ))}
              </div>
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
            <div key={index} className="mb-3 md:mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm md:text-[15px]">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs md:text-sm hover:underline md:whitespace-nowrap"
                  >
                    View Project
                  </a>
                )}
              </div>
              {project.description && (
                <p className="text-gray-700 text-xs md:text-[14px] leading-relaxed">
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
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">Languages</h2>
          <div className="border-t border-gray-300 mb-3"></div>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {languages.map((language, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1.5 rounded text-xs md:text-sm font-medium"
              >
                {language}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-3"></div>
        </div>
      )}
    </div>
  );
}