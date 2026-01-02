// app/resume/components/ResumeTemplates/Template1.js (Fixed Skills Section)
export default function Template1({ data }) {
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
    } else if (edu.graduationYear) {
      return `Graduated: ${edu.graduationYear}`;
    }
    return '';
  };

  return (
    <div style={{ 
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      fontSize: '14px',
      lineHeight: '1.4',
      color: '#374151',
      padding: '32px',
      backgroundColor: '#ffffff',
      maxWidth: '800px',
      margin: '0 auto',
      // Print-specific styles
      boxSizing: 'border-box',
      WebkitPrintColorAdjust: 'exact',
      printColorAdjust: 'exact'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '32px',
        pageBreakInside: 'avoid'
      }}>
        <h1 style={{ 
          fontSize: '36px',
          fontWeight: 'bold',
          margin: '0 0 16px 0',
          color: '#000000',
          lineHeight: '1.1'
        }}>
          {personalInfo?.fullName || `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim()}
        </h1>
        
        {/* Contact Info - PDF optimized with Unicode icons */}
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '12px',
          pageBreakInside: 'avoid'
        }}>
          {personalInfo?.email && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              lineHeight: '1'
            }}>
              <span style={{ 
                color: '#3b82f6', 
                fontSize: '15px',
                display: 'inline-block',
                width: '16px',
                textAlign: 'center'
              }}>📧</span>
              <span style={{ verticalAlign: 'middle' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              lineHeight: '1'
            }}>
              <span style={{ 
                color: '#3b82f6', 
                fontSize: '15px',
                display: 'inline-block',
                width: '16px',
                textAlign: 'center'
              }}>📱</span>
              <span style={{ verticalAlign: 'middle' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              lineHeight: '1'
            }}>
              <span style={{ 
                color: '#3b82f6', 
                fontSize: '15px',
                display: 'inline-block',
                width: '16px',
                textAlign: 'center'
              }}>💼</span>
              <span style={{ verticalAlign: 'middle' }}>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo?.portfolio && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              lineHeight: '1'
            }}>
              <span style={{ 
                color: '#3b82f6', 
                fontSize: '15px',
                display: 'inline-block',
                width: '16px',
                textAlign: 'center'
              }}>🌐</span>
              <span style={{ verticalAlign: 'middle' }}>{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
        
        {personalInfo?.address && (
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            lineHeight: '1',
            pageBreakInside: 'avoid'
          }}>
            <span style={{ 
              color: '#3b82f6', 
              fontSize: '15px',
              display: 'inline-block',
              width: '16px',
              textAlign: 'center'
            }}>📍</span>
            <span style={{ verticalAlign: 'middle' }}>{personalInfo.address}</span>
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {summary && (
        <div style={{ 
          marginBottom: '32px',
          pageBreakInside: 'avoid'
        }}>
          <h2 style={{ 
            fontSize: '20px',
            fontWeight: '600',
            borderBottom: '2px solid #bfdbfe',
            paddingBottom: '8px',
            marginBottom: '16px',
            color: '#111827'
          }}>
            Professional Summary
          </h2>
          <p style={{ 
            textAlign: 'left',
            color: '#374151',
            lineHeight: '1.6',
            margin: 0
          }}>
            {summary}
          </p>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        gap: '32px',
        // Ensure proper column layout for print
        alignItems: 'flex-start'
      }}>
        {/* Left Column - Main Content */}
        <div style={{ 
          flex: '2',
          minWidth: 0 // Prevent flex overflow
        }}>
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div style={{ 
              marginBottom: '32px',
              pageBreakInside: 'avoid'
            }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: '2px solid #bfdbfe',
                paddingBottom: '8px',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Work Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} style={{ 
                  marginBottom: '24px',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px',
                    gap: '16px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#111827', 
                        margin: '0 0 4px 0',
                        lineHeight: '1.3'
                      }}>
                        {exp.jobTitle || exp.position}
                      </h3>
                      <div style={{ 
                        color: '#374151', 
                        fontWeight: '500', 
                        margin: 0 
                      }}>
                        {exp.company}
                      </div>
                    </div>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      textAlign: 'right', 
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                  {exp.description && (
                    <p style={{ 
                      textAlign: 'left', 
                      color: '#6b7280', 
                      lineHeight: '1.6', 
                      margin: 0 
                    }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ 
              marginBottom: '32px',
              pageBreakInside: 'avoid'
            }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: '2px solid #bfdbfe',
                paddingBottom: '8px',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} style={{ 
                  marginBottom: '24px',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px',
                    gap: '16px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#111827', 
                        margin: '0 0 4px 0',
                        lineHeight: '1.3'
                      }}>
                        {edu.degree}
                      </h3>
                      <div style={{ 
                        color: '#374151', 
                        fontWeight: '500', 
                        margin: '0 0 4px 0' 
                      }}>
                        {edu.institution}
                      </div>
                      {edu.field && (
                        <div style={{ 
                          color: '#6b7280', 
                          fontSize: '14px', 
                          margin: 0 
                        }}>
                          {edu.field}
                        </div>
                      )}
                    </div>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      textAlign: 'right', 
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {formatEducationYears(edu)}
                    </div>
                  </div>
                  {edu.gpa && (
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      margin: 0 
                    }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: '2px solid #bfdbfe',
                paddingBottom: '8px',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} style={{ 
                  marginBottom: '24px',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px',
                    gap: '16px'
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#111827', 
                      margin: 0,
                      flex: 1 
                    }}>
                      {project.name}
                    </h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ 
                        color: '#2563eb', 
                        fontSize: '14px',
                        flexShrink: 0,
                        textDecoration: 'underline'
                      }}>
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p style={{ 
                      textAlign: 'left', 
                      color: '#6b7280', 
                      lineHeight: '1.6', 
                      margin: 0 
                    }}>
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div style={{ 
          flex: '1',
          minWidth: 0, // Prevent flex overflow
          pageBreakInside: 'avoid'
        }}>
          {/* Skills - Simple inline-block with forced styles for PDF */}
          {skills && skills.length > 0 && (
            <div style={{ 
              marginBottom: '32px',
              pageBreakInside: 'avoid'
            }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: '2px solid #bfdbfe',
                paddingBottom: '8px',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Skills
              </h2>
              <div style={{ 
                lineHeight: '2.5',
                textAlign: 'left'
              }}>
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'inline-block',
                      margin: '0 8px 8px 0',
                      lineHeight: '1.2',
                      textAlign: 'center',
                      border: '2px solid #dbeafe',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      minWidth: '80px'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div style={{ 
              marginBottom: '32px',
              pageBreakInside: 'avoid'
            }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: '2px solid #bfdbfe',
                paddingBottom: '8px',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Certifications
              </h2>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}>
                {certifications.map((cert, index) => (
                  <li key={index} style={{ 
                    color: '#374151', 
                    marginBottom: '8px', 
                    paddingLeft: '0',
                    lineHeight: '1.4'
                  }}>
                    • {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                borderBottom: '2px solid #bfdbfe',
                paddingBottom: '8px',
                marginBottom: '16px',
                color: '#111827'
              }}>
                Languages
              </h2>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}>
                {languages.map((language, index) => (
                  <li key={index} style={{ 
                    color: '#374151', 
                    marginBottom: '8px', 
                    paddingLeft: '0',
                    lineHeight: '1.4'
                  }}>
                    • {language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}