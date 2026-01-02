'use client';
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Template2 = ({ data = {} }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    projects = [],
    skills = [],
    certifications = [],
    languages = []
  } = data;

  // Format date display for experience
  const formatExperienceDate = (startDate, endDate, isPresent) => {
    if (!startDate) return '';
    if (isPresent) return `${startDate} - Present`;
    return endDate ? `${startDate} - ${endDate}` : startDate;
  };

  // Format date display for education
  const formatEducationDate = (startYear, endYear, isCurrentlyStudying) => {
    if (!startYear && !endYear) return '';
    if (isCurrentlyStudying) return `${startYear || ''} - Present`;
    if (startYear && endYear) return `${startYear} - ${endYear}`;
    return endYear || startYear;
  };

  const InfoItem = ({ icon: Icon, text, link }) => {
    if (!text) return null;
    
    const content = (
      <p className="flex items-center gap-2 text-white text-sm md:text-[15px] leading-snug">
        <Icon size={14} className="text-white flex-shrink-0" />
        <span className="break-all">{text}</span>
      </p>
    );

    return link ? (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline"
      >
        {content}
      </a>
    ) : (
      content
    );
  };

  return (
    <div
      id="resume-template"
      className="bg-white font-sans text-gray-900 shadow-md mx-auto"
      style={{
        width: '100%',
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '0',
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-10 py-6 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight text-center md:text-left">
          {personalInfo?.fullName || 'Full Name'}
        </h1>
        <p className="text-base md:text-[18px] mb-4 font-medium text-center md:text-left">
          {personalInfo?.jobTitle || 'Job Title'}
        </p>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4">
          <InfoItem 
            icon={Mail} 
            text={personalInfo?.email} 
          />
          <InfoItem 
            icon={Phone} 
            text={personalInfo?.phone} 
          />
          <InfoItem
            icon={Linkedin}
            text={personalInfo?.linkedin}
            link={personalInfo?.linkedin ? `https://${personalInfo.linkedin}` : undefined}
          />
          <InfoItem 
            icon={MapPin} 
            text={personalInfo?.address} 
          />
        </div>
      </header>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-10 py-6 md:py-10">
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">
                Professional Summary
              </h2>
              <p className="text-sm md:text-[15px] leading-relaxed text-gray-800">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">
                Work Experience
              </h2>
              {experience.map((exp, i) => (
                <div key={i} className="mb-5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <h3 className="font-semibold text-base md:text-[17px]">
                      {exp?.jobTitle}
                    </h3>
                    <span className="text-xs md:text-[14px] text-gray-600 md:text-right">
                      {formatExperienceDate(exp?.startDate, exp?.endDate, exp?.isPresent)}
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm md:text-[15px] mb-2 font-medium">
                    {exp?.company}
                  </p>
                  <ul className="list-disc ml-4 md:ml-5 text-sm md:text-[14.5px] text-gray-800 space-y-1.5">
                    {exp?.responsibilities?.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <h3 className="font-semibold text-base md:text-[17px]">
                      {edu?.degree}
                    </h3>
                    <span className="text-xs md:text-[14px] text-gray-600 md:text-right">
                      {formatEducationDate(edu?.startYear, edu?.endYear, edu?.isCurrentlyStudying)}
                    </span>
                  </div>
                  <p className="text-sm md:text-[15px] text-gray-800 mb-1">{edu?.institution}</p>
                  {edu?.link && (
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs md:text-[13px] border border-blue-600 px-2 py-1 rounded hover:bg-blue-50 inline-block mt-1"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">Projects</h2>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <h3 className="font-semibold text-base md:text-[17px]">{proj?.title}</h3>
                    <span className="text-xs md:text-[14px] text-gray-600 md:text-right">
                      {proj?.endYear || proj?.date}
                    </span>
                  </div>
                  <p className="text-sm md:text-[15px] text-gray-800 mb-1">{proj?.description}</p>
                  {proj?.technologies && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj?.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-600 text-xs md:text-[13px] border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 md:space-y-8">
          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-[#1E90FF] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-[14px] font-medium"
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i}>
                    {typeof cert === 'string' ? (
                      <span className="bg-[#22c55e] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-[14px] font-medium inline-block">
                        {cert}
                      </span>
                    ) : (
                      <div className="mb-2">
                        <p className="font-medium text-sm md:text-[15px] text-gray-800">{cert.name}</p>
                        {cert.issuer && (
                          <p className="text-xs md:text-[13px] text-gray-600">{cert.issuer}</p>
                        )}
                        {cert.date && (
                          <p className="text-xs md:text-[12px] text-gray-500">{cert.date}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <h2 className="font-bold text-xl md:text-2xl border-b-2 border-gray-300 mb-3 pb-1">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm md:text-[15px] text-gray-800">
                      {typeof lang === 'string' ? lang : lang.language}
                    </span>
                    {typeof lang === 'object' && lang.proficiency && (
                      <span className="text-xs md:text-[13px] text-gray-600 capitalize">{lang.proficiency}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;