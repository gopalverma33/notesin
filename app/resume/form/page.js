// app/resume/form/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Award, 
  Globe, 
  Rocket, 
  FileText,
  X,
  Plus,
  AlertCircle
} from 'lucide-react';

// ✅ Prevent Enter from submitting the form accidentally
const preventEnterSubmit = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

const STORAGE_KEY = "resumeFormData";

// Auto-suggestion data
const SUGGESTIONS = {
  skills: [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'HTML', 'CSS',
    'TypeScript', 'Vue.js', 'Angular', 'SQL', 'MongoDB', 'Git', 'AWS',
    'Docker', 'Kubernetes', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ],
  certifications: [
    'AWS Certified Solutions Architect', 'Google Cloud Professional',
    'Microsoft Certified: Azure Fundamentals', 'Certified ScrumMaster',
    'PMP Certification', 'CISSP', 'CEH', 'CompTIA Security+'
  ],
  languages: [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Hindi', 'Arabic', 'Portuguese', 'Russian', 'Italian'
  ]
};

const ResumeForm = () => {
  const router = useRouter();

  const defaultData = {
    summary: '',
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      portfolio: '',
    },
    education: [{
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
    }],
    experience: [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    }],
    skills: [],
    certifications: [],
    languages: [],
    projects: [],
  };

  const [formData, setFormData] = useState(defaultData);
  const [atsScore, setAtsScore] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuggestions, setShowSuggestions] = useState({
    skills: false,
    certifications: false,
    languages: false
  });

  const [inputValues, setInputValues] = useState({
    skills: '',
    certifications: '',
    languages: '',
    projectName: '',
    projectDescription: '',
    projectLink: '',
  });

  // ✅ Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Handle migration from old education format to new format
      if (!Array.isArray(parsedData.education)) {
        parsedData.education = [parsedData.education || defaultData.education[0]];
      }
      
      // Migrate graduationYear to startYear/endYear if needed
      parsedData.education = parsedData.education.map(edu => {
        if (edu && edu.graduationYear && !edu.startYear && !edu.endYear) {
          return {
            ...edu,
            startYear: '',
            endYear: edu.graduationYear
          };
        }
        return { ...defaultData.education[0], ...edu };
      });
      
      if (!Array.isArray(parsedData.experience)) {
        parsedData.experience = [parsedData.experience || defaultData.experience[0]];
      }
      
      setFormData(parsedData);
    }
  }, []);

  
  // ✅ Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    calculateAtsScore();
  }, [formData]);

  // Validation function
  const validateField = (section, field, value, index = null) => {
    const fieldPath = index !== null ? `${section}[${index}].${field}` : `${section}.${field}`;
    
    // Required field validation
    if (field === 'firstName' && !value.trim()) {
      return 'First name is required';
    }
    if (field === 'lastName' && !value.trim()) {
      return 'Last name is required';
    }
    if (field === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    }
    if (field === 'phone' && !value.trim()) {
      return 'Phone number is required';
    }
    if (field === 'summary' && !value.trim()) {
      return 'Professional summary is required';
    }
    if (section === 'education' && field === 'degree' && !value.trim()) {
      return 'Degree is required';
    }
    if (section === 'education' && field === 'institution' && !value.trim()) {
      return 'Institution is required';
    }
    // if (section === 'experience' && field === 'jobTitle' && !value.trim()) {
    //   return 'Job title is required';
    // }
    // if (section === 'experience' && field === 'company' && !value.trim()) {
    //   return 'Company is required';
    // }
    // if (section === 'experience' && field === 'startDate' && !value.trim()) {
    //   return 'Start date is required';
    // }
    // if (section === 'experience' && field === 'description' && !value.trim()) {
    //   return 'Job description is required';
    // }

    // Year validation for education
    if (section === 'education' && (field === 'startYear' || field === 'endYear') && value) {
      const year = parseInt(value);
      if (year < 1900 || year > new Date().getFullYear() + 5) {
        return 'Please enter a valid year';
      }
    }

    // Date validation for experience
    if (section === 'experience' && field === 'endDate' && value && formData.experience[index]?.startDate) {
      if (new Date(value) < new Date(formData.experience[index].startDate)) {
        return 'End date cannot be before start date';
      }
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal info validation
    Object.keys(formData.personal).forEach(field => {
      if (['firstName', 'lastName', 'email', 'phone'].includes(field)) {
        const error = validateField('personal', field, formData.personal[field]);
        if (error) newErrors[`personal.${field}`] = error;
      }
    });

    // Summary validation
    if (!formData.summary.trim()) {
      newErrors.summary = 'Professional summary is required';
    }

    // Education validation
    formData.education.forEach((edu, index) => {
      ['degree', 'institution'].forEach(field => {
        const error = validateField('education', field, edu[field], index);
        if (error) newErrors[`education[${index}].${field}`] = error;
      });
    });

    // Experience validation
    formData.experience.forEach((exp, index) => {
      ['jobTitle', 'company', 'startDate', 'description'].forEach(field => {
        const error = validateField('experience', field, exp[field], index);
        if (error) newErrors[`experience[${index}].${field}`] = error;
      });
    });

    // Skills validation
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (section, field, index = null) => {
    const fieldPath = index !== null ? `${section}[${index}].${field}` : `${section}.${field}`;
    setTouched(prev => ({ ...prev, [fieldPath]: true }));
    
    let value;
    if (index !== null) {
      value = formData[section][index][field];
    } else if (section === 'personal') {
      value = formData.personal[field];
    } else {
      value = formData[section];
    }
    
    const error = validateField(section, field, value, index);
    if (error) {
      setErrors(prev => ({ ...prev, [fieldPath]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath];
        return newErrors;
      });
    }
  };

  const getError = (section, field, index = null) => {
    const fieldPath = index !== null ? `${section}[${index}].${field}` : `${section}.${field}`;
    return touched[fieldPath] ? errors[fieldPath] : '';
  };

  const calculateAtsScore = () => {
    let score = 0;
    const maxScore = 100;

    // Personal Info (20 points)
    if (formData.personal.firstName) score += 5;
    if (formData.personal.lastName) score += 5;
    if (formData.personal.email) score += 5;
    if (formData.personal.phone) score += 5;

    // Professional Summary (15 points)
    if (formData.summary) {
      score += 10;
      const summary = formData.summary.toLowerCase();
      const hasActionVerbs = /managed|developed|created|improved|led|implemented/i.test(summary);
      const hasQuantifiable = /\d+%|\$|\d+ years|\d+ people/i.test(summary);
      
      if (hasActionVerbs) score += 3;
      if (hasQuantifiable) score += 2;
    }

    // Education (15 points)
    if (formData.education.length > 0) score += 10;
    if (formData.education.some(edu => edu && edu.degree)) score += 5;

    // Experience (30 points)
    if (formData.experience.length > 0) score += 15;
    if (formData.experience.some(exp => exp && exp.description)) score += 15;

    // Skills & Extras (20 points)
    if (formData.skills.length >= 5) score += 10;
    if (formData.certifications.length > 0) score += 5;
    if (formData.languages.length > 0) score += 3;
    if (formData.projects.length > 0) score += 2;

    setAtsScore(Math.min(score, maxScore));
  };

  const handleChange = (section, field, value, index = 0) => {
    if (section === 'education' || section === 'experience') {
      setFormData((prev) => {
        const updatedArray = [...prev[section]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        return { ...prev, [section]: updatedArray };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }

    // Clear error when user starts typing
    const fieldPath = index !== null ? `${section}[${index}].${field}` : `${section}.${field}`;
    if (errors[fieldPath]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath];
        return newErrors;
      });
    }
  };

  const handleArrayChange = (section, value) => {
    setInputValues((prev) => ({ ...prev, [section]: value }));
    
    // Show suggestions when user starts typing
    if (value.length > 0 && SUGGESTIONS[section]) {
      setShowSuggestions(prev => ({ ...prev, [section]: true }));
    } else {
      setShowSuggestions(prev => ({ ...prev, [section]: false }));
    }
  };

  const handleSuggestionClick = (section, field, suggestion) => {
    setInputValues(prev => ({ ...prev, [field]: suggestion }));
    setShowSuggestions(prev => ({ ...prev, [section]: false }));
  };

  const handleArrayAdd = (section, field) => {
    if (inputValues[field] && inputValues[field].trim()) {
      setFormData((prev) => {
        const newArray = [...prev[section], inputValues[field].trim()];
        return {
          ...prev,
          [section]: newArray
        };
      });
      
      // Clear skills error when skills are added
      if (section === 'skills' && errors.skills) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
      
      setInputValues((prev) => ({ 
        ...prev, 
        [field]: '' 
      }));
      setShowSuggestions(prev => ({ ...prev, [section]: false }));
    }
  };

  const handleArrayRemove = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // ✅ Handle adding education entry
  const handleEducationAdd = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          institution: '',
          startYear: '',
          endYear: '',
        }
      ],
    }));
  };

  const handleEducationRemove = (index) => {
    if (formData.education.length > 1) {
      setFormData((prev) => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index),
      }));
    }
  };

  // ✅ Handle adding experience entry
  const handleExperienceAdd = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
        }
      ],
    }));
  };

  const handleExperienceRemove = (index) => {
    if (formData.experience.length > 1) {
      setFormData((prev) => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index),
      }));
    }
  };

  // ✅ Handle adding projects
  const handleProjectAdd = () => {
    const { projectName, projectDescription, projectLink } = inputValues;

    if (projectName.trim() && projectDescription.trim()) {
      setFormData((prev) => ({
        ...prev,
        projects: [
          ...prev.projects,
          {
            name: projectName.trim(),
            description: projectDescription.trim(),
            link: projectLink?.trim() || "",
          },
        ],
      }));

      setInputValues((prev) => ({
        ...prev,
        projectName: "",
        projectDescription: "",
        projectLink: "",
      }));
    }
  };

  const handleProjectRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show all errors
    const allTouched = {};
    Object.keys(formData.personal).forEach(field => {
      allTouched[`personal.${field}`] = true;
    });
    allTouched.summary = true;
    formData.education.forEach((_, index) => {
      allTouched[`education[${index}].degree`] = true;
      allTouched[`education[${index}].institution`] = true;
    });
    formData.experience.forEach((_, index) => {
      allTouched[`experience[${index}].jobTitle`] = true;
      allTouched[`experience[${index}].company`] = true;
      allTouched[`experience[${index}].startDate`] = true;
      allTouched[`experience[${index}].description`] = true;
    });
    allTouched.skills = true;
    
    setTouched(allTouched);
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const element = document.querySelector(`[data-field="${firstErrorKey}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Explicitly save latest data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    router.push('/resume/templates');
  };

  const AtsScoreMeter = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Resume Score</h3>
          <p className="text-sm text-gray-600">ATS Optimization Progress</p>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {atsScore}%
        </div>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${atsScore}%` }}
        ></div>
      </div>
      
      <div className={`text-sm font-medium ${
        atsScore >= 90 ? 'text-green-600' :
        atsScore >= 70 ? 'text-blue-600' :
        atsScore >= 50 ? 'text-amber-600' : 'text-gray-600'
      }`}>
        {atsScore >= 90 ? '🎉 Excellent! Ready for ATS' :
          atsScore >= 70 ? '✅ Good progress' :
          atsScore >= 50 ? '📊 Keep going' : 'Start building your resume'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create Your Resume</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Build a professional resume that stands out to employers and applicant tracking systems
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Resume Builder</h2>
                <p className="text-gray-300">All fields are automatically saved</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{atsScore}%</div>
                <div className="text-gray-300 text-sm">Completion</div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <AtsScoreMeter />

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Professional Summary */}
              <Section title="Professional Summary" icon={<Briefcase className="w-5 h-5" />}>
                <TextArea
                  label="Summary *"
                  value={formData.summary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  onBlur={() => handleBlur('summary', 'summary')}
                  error={getError('summary', 'summary')}
                  placeholder="Describe your professional background, key skills, and career objectives..."
                  data-field="summary"
                />
              </Section>

              {/* Personal Information */}
              <Section title="Personal Information" icon={<User className="w-5 h-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput 
                    label="First Name *" 
                    value={formData.personal.firstName} 
                    onChange={(e) => handleChange('personal', 'firstName', e.target.value)} 
                    onBlur={() => handleBlur('personal', 'firstName')}
                    error={getError('personal', 'firstName')}
                    data-field="personal.firstName"
                  />
                  <TextInput 
                    label="Last Name *" 
                    value={formData.personal.lastName} 
                    onChange={(e) => handleChange('personal', 'lastName', e.target.value)} 
                    onBlur={() => handleBlur('personal', 'lastName')}
                    error={getError('personal', 'lastName')}
                    data-field="personal.lastName"
                  />
                  <TextInput 
                    label="Email *" 
                    type="email" 
                    value={formData.personal.email} 
                    onChange={(e) => handleChange('personal', 'email', e.target.value)} 
                    onBlur={() => handleBlur('personal', 'email')}
                    error={getError('personal', 'email')}
                    data-field="personal.email"
                  />
                  <TextInput 
                    label="Phone *" 
                    value={formData.personal.phone} 
                    onChange={(e) => handleChange('personal', 'phone', e.target.value)} 
                    onBlur={() => handleBlur('personal', 'phone')}
                    error={getError('personal', 'phone')}
                    data-field="personal.phone"
                  />
                  <TextInput 
                    label="Address" 
                    value={formData.personal.address} 
                    onChange={(e) => handleChange('personal', 'address', e.target.value)} 
                    className="md:col-span-2"
                  />
                  <TextInput 
                    label="LinkedIn" 
                    value={formData.personal.linkedin} 
                    onChange={(e) => handleChange('personal', 'linkedin', e.target.value)} 
                  />
                  <TextInput 
                    label="Portfolio" 
                    value={formData.personal.portfolio} 
                    onChange={(e) => handleChange('personal', 'portfolio', e.target.value)} 
                  />
                </div>
              </Section>

              {/* Education */}
              <Section title="Education" icon={<GraduationCap className="w-5 h-5" />}>
                {Array.isArray(formData.education) && formData.education.map((edu, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-700">Education {formData.education.length > 1 ? `#${index + 1}` : ''}</h4>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleEducationRemove(index)}
                          className="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded border border-red-200 flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextInput 
                        label="Degree *" 
                        value={edu?.degree || ''} 
                        onChange={(e) => handleChange('education', 'degree', e.target.value, index)} 
                        onBlur={() => handleBlur('education', 'degree', index)}
                        error={getError('education', 'degree', index)}
                        data-field={`education[${index}].degree`}
                      />
                      <TextInput 
                        label="Institution *" 
                        value={edu?.institution || ''} 
                        onChange={(e) => handleChange('education', 'institution', e.target.value, index)} 
                        onBlur={() => handleBlur('education', 'institution', index)}
                        error={getError('education', 'institution', index)}
                        data-field={`education[${index}].institution`}
                      />
                      <TextInput 
                        label="Start Year" 
                        type="number"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        value={edu?.startYear || ''} 
                        onChange={(e) => handleChange('education', 'startYear', e.target.value, index)} 
                        onBlur={() => handleBlur('education', 'startYear', index)}
                        error={getError('education', 'startYear', index)}
                        data-field={`education[${index}].startYear`}
                      />
                      <TextInput 
                        label="End Year" 
                        type="number"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        value={edu?.endYear || ''} 
                        onChange={(e) => handleChange('education', 'endYear', e.target.value, index)} 
                        onBlur={() => handleBlur('education', 'endYear', index)}
                        error={getError('education', 'endYear', index)}
                        data-field={`education[${index}].endYear`}
                      />
                    </div>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleEducationAdd}
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition font-medium flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add More Education
                  </button>
                </div>
              </Section>

              {/* Experience */}
              <Section title="Experience" icon={<Briefcase className="w-5 h-5" />}>
                {Array.isArray(formData.experience) && formData.experience.map((exp, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-700">Experience {formData.experience.length > 1 ? `#${index + 1}` : ''}</h4>
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleExperienceRemove(index)}
                          className="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded border border-red-200 flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextInput 
                        label="Job Title " 
                        value={exp?.jobTitle || ''} 
                        onChange={(e) => handleChange('experience', 'jobTitle', e.target.value, index)} 
                        onBlur={() => handleBlur('experience', 'jobTitle', index)}
                        error={getError('experience', 'jobTitle', index)}
                        data-field={`experience[${index}].jobTitle`}
                      />
                      <TextInput 
                        label="Company " 
                        value={exp?.company || ''} 
                        onChange={(e) => handleChange('experience', 'company', e.target.value, index)} 
                        onBlur={() => handleBlur('experience', 'company', index)}
                        error={getError('experience', 'company', index)}
                        data-field={`experience[${index}].company`}
                      />
                      <TextInput 
                        label="Start Date " 
                        type="date" 
                        value={exp?.startDate || ''} 
                        onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)} 
                        onBlur={() => handleBlur('experience', 'startDate', index)}
                        error={getError('experience', 'startDate', index)}
                        data-field={`experience[${index}].startDate`}
                      />
                      <TextInput 
                        label="End Date" 
                        type="date" 
                        value={exp?.endDate || ''} 
                        onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)} 
                        onBlur={() => handleBlur('experience', 'endDate', index)}
                        error={getError('experience', 'endDate', index)}
                        data-field={`experience[${index}].endDate`}
                      />
                      <TextArea 
                        label="Description " 
                        value={exp?.description || ''} 
                        onChange={(e) => handleChange('experience', 'description', e.target.value, index)} 
                        onBlur={() => handleBlur('experience', 'description', index)}
                        error={getError('experience', 'description', index)}
                        data-field={`experience[${index}].description`}
                      />
                    </div>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleExperienceAdd}
                    className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition font-medium flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add More Experience
                  </button>
                </div>
              </Section>

              {/* Skills */}
              <ArrayInputSection
                title="Skills *"
                section="skills"
                field="skills"
                values={formData.skills}
                inputValue={inputValues.skills}
                onInputChange={handleArrayChange}
                onAdd={handleArrayAdd}
                onRemove={handleArrayRemove}
                icon={<Zap className="w-4 h-4" />}
                color="blue"
                error={getError('skills', 'skills')}
                onBlur={() => setTouched(prev => ({ ...prev, skills: true }))}
                showSuggestions={showSuggestions.skills}
                suggestions={SUGGESTIONS.skills}
                onSuggestionClick={handleSuggestionClick}
                onCloseSuggestions={() => setShowSuggestions(prev => ({ ...prev, skills: false }))}
              />

              {/* Certifications */}
              <ArrayInputSection
                title="Certifications"
                section="certifications"
                field="certifications"
                values={formData.certifications}
                inputValue={inputValues.certifications}
                onInputChange={handleArrayChange}
                onAdd={handleArrayAdd}
                onRemove={handleArrayRemove}
                icon={<Award className="w-4 h-4" />}
                color="green"
                showSuggestions={showSuggestions.certifications}
                suggestions={SUGGESTIONS.certifications}
                onSuggestionClick={handleSuggestionClick}
                onCloseSuggestions={() => setShowSuggestions(prev => ({ ...prev, certifications: false }))}
              />

              {/* Languages */}
              <ArrayInputSection
                title="Languages"
                section="languages"
                field="languages"
                values={formData.languages}
                inputValue={inputValues.languages}
                onInputChange={handleArrayChange}
                onAdd={handleArrayAdd}
                onRemove={handleArrayRemove}
                icon={<Globe className="w-4 h-4" />}
                color="purple"
                showSuggestions={showSuggestions.languages}
                suggestions={SUGGESTIONS.languages}
                onSuggestionClick={handleSuggestionClick}
                onCloseSuggestions={() => setShowSuggestions(prev => ({ ...prev, languages: false }))}
              />

              {/* Projects */}
              <Section title="Projects" icon={<Rocket className="w-5 h-5" />}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Project Name "
                      value={inputValues.projectName}
                      onChange={(e) => setInputValues((prev) => ({ ...prev, projectName: e.target.value }))}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Description "
                      value={inputValues.projectDescription}
                      onChange={(e) => setInputValues((prev) => ({ ...prev, projectDescription: e.target.value }))}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Link (optional)"
                      value={inputValues.projectLink}
                      onChange={(e) => setInputValues((prev) => ({ ...prev, projectLink: e.target.value }))}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleProjectAdd}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                  
                  <div className="space-y-3 mt-4">
                    {formData.projects.map((proj, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{proj.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                          {proj.link && (
                            <a href={proj.link} target="_blank" className="text-blue-600 text-sm underline mt-1 inline-block">
                              View Project
                            </a>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleProjectRemove(index)}
                          className="text-gray-400 hover:text-red-500 ml-4 p-2 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Submit Button */}
              <div className="text-center pt-6 border-t border-gray-200">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
                >
                  Continue to Templates →
                </button>
                <p className="text-gray-500 text-sm mt-3">Your progress is automatically saved</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Section Wrapper
const Section = ({ title, icon, children }) => (
  <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200/50">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

// Enhanced Text Input
const TextInput = ({ label, type = 'text', value, onChange, onBlur, error, className = '', ...props }) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={preventEnterSubmit}
      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
        error ? 'border-red-300' : 'border-gray-200'
      }`}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

// Enhanced Text Area
const TextArea = ({ label, value, onChange, onBlur, error, placeholder, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      onKeyDown={preventEnterSubmit}
      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white min-h-[120px] ${
        error ? 'border-red-300' : 'border-gray-200'
      }`}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

// Enhanced Array Input Section with Auto-suggestions
const ArrayInputSection = ({ 
  title, 
  section, 
  field, 
  values, 
  inputValue, 
  onInputChange, 
  onAdd, 
  onRemove, 
  icon, 
  color = 'blue', 
  error, 
  onBlur,
  showSuggestions,
  suggestions,
  onSuggestionClick,
  onCloseSuggestions
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200'
  };

  const buttonColors = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600'
  };

  const tagColors = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const filteredSuggestions = suggestions?.filter(suggestion =>
    suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
    !values.includes(suggestion)
  ) || [];

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 border ${error ? 'border-red-200' : ''}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 mb-4 relative">
        <div className="flex-grow relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(section, e.target.value)}
            onBlur={onBlur}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAdd(section, field))}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              error ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder={`Add a ${title.toLowerCase().replace(' *', '')}...`}
          />
          
          {/* Auto-suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                <div className="flex justify-between items-center mb-2 px-2">
                  <span className="text-sm text-gray-500">Suggestions</span>
                  <button
                    type="button"
                    onClick={onCloseSuggestions}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onSuggestionClick(section, field, suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="button" 
          onClick={() => onAdd(section, field)} 
          className={`${buttonColors[color]} text-white px-6 py-3 rounded-xl shadow transition-all duration-200 font-medium whitespace-nowrap flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mb-3 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2">
        {values.map((item, index) => (
          <span key={index} className={`flex items-center ${tagColors[color]} px-3 py-2 rounded-full text-sm border transition-all hover:scale-105`}>
            {item}
            <button 
              type="button" 
              onClick={() => onRemove(section, index)} 
              className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResumeForm;