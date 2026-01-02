'use client';
import React from 'react';

export default function JulianaSilvaTemplate({ data }) {
  if (!data) return null;

  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = data;

  return (
    <div
      className="w-full max-w-[210mm] min-h-screen bg-[#F7F7F7] mx-auto px-4 md:px-12 py-6 md:py-12 text-[#333] font-sans leading-relaxed flex flex-col justify-between"
      style={{
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        pageBreakInside: 'avoid',
        fontSize: '15px',
      }}
    >
      <div>
        {/* Header */}
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#000] mb-1">
            {personalInfo?.fullName || 'Juliana Silva'}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            {personalInfo?.title || 'UX Designer'}
          </p>

          <div className="mt-3 md:mt-4 text-sm md:text-base space-y-1 text-gray-700">
            <p>
              <strong>Phone:</strong> {personalInfo?.phone || '(555) 123-4567'}
            </p>
            <p>
              <strong>Email:</strong> {personalInfo?.email || 'juliana.silva@email.com'}
            </p>
            <p>
              <strong>Location:</strong> {personalInfo?.address || '123 Lane, City, Country'}
            </p>
            <p>
              <strong>Portfolio:</strong>{' '}
              <span className="text-[#007ACC] break-all">
                {personalInfo?.website || 'julianasilva.com'}
              </span>
            </p>
          </div>
        </header>

        {/* Professional Summary */}
        <Section title="Professional Summary" size="lg">
          <p className="text-sm md:text-[15px]">
            {summary ||
              'Creative UX designer focused on crafting meaningful and intuitive user experiences with strong research and prototyping skills.'}
          </p>
        </Section>

        {/* Work Experience */}
        {experience && experience.length > 0 ? (
          experience.map((exp, index) => (
            <Section key={index} title="Work Experience" size="lg">
              <p className="font-semibold text-sm md:text-[16px]">{exp.position}</p>
              <p className="italic text-gray-700 mb-2 text-xs md:text-[14px]">{exp.company}</p>
              <ul className="list-disc list-inside text-xs md:text-[14px]">
                {exp.responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
          ))
        ) : (
          <>
            <Section title="Work Experience" size="lg">
              <p className="font-semibold text-sm md:text-[16px]">UX Designer, Acme Corp</p>
              <ul className="list-disc list-inside text-xs md:text-[14px]">
                <li>Created design systems for responsive web products.</li>
                <li>Collaborated with product teams to improve user flow.</li>
                <li>Reduced bounce rate by 20% through design optimization.</li>
              </ul>
            </Section>

            <Section title="Work Experience" size="lg">
              <p className="font-semibold text-sm md:text-[16px]">Jr. UX Researcher, Innovate Labs</p>
              <ul className="list-disc list-inside text-xs md:text-[14px]">
                <li>Conducted usability testing and heuristic evaluations.</li>
                <li>Documented findings and proposed UI improvements.</li>
              </ul>
            </Section>
          </>
        )}

        {/* Education + Skills - Stack on mobile, 2 columns on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-6">
          <Section title="Education" size="lg">
            {education && education.length > 0 ? (
              education.map((edu, i) => (
                <div key={i} className="text-xs md:text-[14px]">
                  <p className="font-semibold text-sm md:text-[15px]">{edu.degree}</p>
                  <p className="italic">{edu.institution}</p>
                  <p>
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-xs md:text-[14px]">
                <p className="font-semibold text-sm md:text-[15px]">Bachelor in Design</p>
                <p className="italic">Design University</p>
                <p>2017 - 2021</p>
              </div>
            )}
          </Section>

          <Section title="Skills" size="lg">
            <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3">
              {(skills && skills.length > 0
                ? skills
                : ['Figma', 'User Research', 'Prototyping', 'HTML/CSS']
              ).map((skill, i) => (
                <span
                  key={i}
                  className="bg-[#007ACC] text-white px-2 py-1 md:px-3 md:py-1 text-xs md:text-[13px] rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Projects */}
        <Section title="Projects" size="lg">
          {(projects && projects.length > 0
            ? projects
            : [{ name: 'Portfolio Website', link: '#' }]
          ).map((proj, i) => (
            <div key={i} className="mt-2 text-xs md:text-[14px]">
              <p className="font-semibold text-sm md:text-[15px]">{proj.name}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-[#007ACC] text-[#007ACC] px-2 py-1 md:px-3 md:py-1 text-xs md:text-[13px] rounded-md mt-1 hover:bg-[#007ACC] hover:text-white transition-all break-all"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </Section>

        {/* Certifications */}
        <Section title="Certifications" size="lg">
          <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3">
            {(certifications && certifications.length > 0
              ? certifications
              : [
                  'Google UX Design',
                  'Professional Certificate',
                  'Interaction Design Foundation',
                ]
            ).map((cert, i) => (
              <span
                key={i}
                className="bg-[#34D399] text-white px-2 py-1 md:px-3 md:py-1 text-xs md:text-[13px] rounded-md font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </Section>
      </div>

      {/* Footer (Languages) */}
      <Section title="Languages" size="lg">
        <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3">
          {(languages && languages.length > 0
            ? languages
            : ['English (Native)', 'Conversational Spanish']
          ).map((lang, i) => (
            <span
              key={i}
              className="bg-[#007ACC] text-white px-2 py-1 md:px-3 md:py-1 text-xs md:text-[13px] rounded-md font-medium"
            >
              {lang}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

const Section = ({ title, children, size = 'base' }) => {
  if (!children) return null;
  return (
    <section className="mb-4 md:mb-5">
      <h2
        className={`font-semibold border-b-2 border-[#007ACC] mb-2 ${
          size === 'lg' ? 'text-base md:text-[18px]' : 'text-sm md:text-[16px]'
        }`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
};