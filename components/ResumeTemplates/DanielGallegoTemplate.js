'use client';
import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function DanielGallegoTemplate({ data }) {
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

  const InfoItem = ({ icon: Icon, text }) =>
    text ? (
      <p className="flex items-center justify-center gap-2 text-sm md:text-[15px] text-gray-700">
        <Icon size={16} className="text-gray-700 flex-shrink-0" /> 
        <span className="text-center">{text}</span>
      </p>
    ) : null;

  return (
    <div
      id="resume-template"
      className="font-sans text-gray-900 bg-[#f8f9fa] mx-auto w-full"
      style={{
        maxWidth: '210mm',
        minHeight: '100vh',
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-[34px] font-extrabold text-gray-900 leading-tight uppercase tracking-wide">
          {personalInfo?.fullName || 'Daniel Gallego'}
        </h1>
        <p className="text-base md:text-[18px] text-gray-600 mb-3 font-medium">
          {personalInfo?.jobTitle || 'UX Designer'}
        </p>
        <div className="flex flex-col items-center gap-1 md:gap-1">
          <InfoItem icon={Mail} text={personalInfo?.email || 'daniel.gallego@email.com'} />
          <InfoItem icon={Phone} text={personalInfo?.phone || '(555) 123-4567'} />
          <InfoItem icon={MapPin} text={personalInfo?.address || '123 Resume Lane, Anytown, CA 1934'} />
          <InfoItem icon={Globe} text={personalInfo?.portfolio || 'danielgallego.com'} />
        </div>
      </header>

      <hr className="border-t-2 border-gray-300 mb-4 md:mb-6" />

      {/* Professional Summary */}
      {summary && (
        <section className="mb-6 md:mb-8">
          <h2 className="font-bold text-gray-800 mb-2 text-lg md:text-[20px]">Professional Summary</h2>
          <p className="text-gray-700 text-sm md:text-[16px] leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {experience?.length > 0 && (
        <section className="mb-6 md:mb-8">
          <h2 className="font-bold text-gray-800 mb-3 text-lg md:text-[20px]">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 md:mb-5">
              <h3 className="font-semibold text-gray-900 text-base md:text-[17px]">
                {exp.jobTitle}, {exp.company}
              </h3>
              <p className="text-sm md:text-[15px] text-gray-600 mb-2">
                {exp.startDate} - {exp.endDate || 'Present'}
              </p>
              <ul className="list-disc ml-4 md:ml-6 text-sm md:text-[15px] text-gray-700 leading-relaxed space-y-1">
                {exp.responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <hr className="border-t-2 border-gray-300 mb-4 md:mb-6" />

      {/* Education & Skills - Stack on mobile, 2 columns on desktop */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-8">
        {/* Education */}
        {education?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 mb-3 text-lg md:text-[20px]">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-gray-800 text-sm md:text-[16px]">{edu.degree}</p>
                <p className="text-sm md:text-[15px] text-gray-700">{edu.institution}</p>
                <p className="text-xs md:text-[14px] text-gray-600">
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 mb-3 text-lg md:text-[20px]">Skills</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-[#bfe6ff] text-[#004e8a] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-[14px] font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-t-2 border-gray-300 mb-4 md:mb-6" />

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-6 md:mb-8">
          <h2 className="font-bold text-gray-800 mb-3 text-lg md:text-[20px]">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3 md:mb-4">
              <p className="font-semibold text-gray-900 text-sm md:text-[16px]">{proj.title}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  className="text-blue-700 text-xs md:text-[14px] font-medium border border-blue-700 px-2 py-1 md:px-3 md:py-1 rounded hover:bg-blue-50 inline-block mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
              <p className="text-sm md:text-[15px] text-gray-700 mt-2">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      <hr className="border-t-2 border-gray-300 mb-4 md:mb-6" />

      {/* Certifications & Languages - Stack on mobile, 2 columns on desktop */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Certifications */}
        {certifications?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 mb-3 text-lg md:text-[20px]">Certifications</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {certifications.map((cert, i) => (
                <span
                  key={i}
                  className="bg-[#c7f9cc] text-[#006837] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-[14px] font-semibold"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 mb-3 text-lg md:text-[20px]">Languages</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {languages.map((lang, i) => (
                <span
                  key={i}
                  className="bg-[#d6e4ff] text-[#003a75] px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-[14px] font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}