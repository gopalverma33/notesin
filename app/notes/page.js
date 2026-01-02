'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  Filter,
  ChevronRight,
  Star,
  GraduationCap,
  Users,
  Building,
  ExternalLink,
  Eye,
  FileText,
  Grid,
  List,
  Bookmark,
  Share2,
  Zap,
  Target,
  Calendar,
  School,
  FolderOpen,
  BarChart3,
  Heart,
  X
} from 'lucide-react';

// Debounce hook for search performance
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSearch, setActiveSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // University Notes Filters
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedUniversitySemester, setSelectedUniversitySemester] = useState('all');
  const [subjectSearch, setSubjectSearch] = useState('');

  // Use debounced search for performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Abort controller for cancelling fetch requests
  const abortControllerRef = useRef(null);

  // Mock data - YOUR STUDY NOTES DATA GOES HERE
  const mockNotes = [
    // Add your study notes data here following this structure:
    // {
    //   id: "unique-id",
    //   title: "Note Title",
    //   subject: "Subject Name", 
    //   course: "Course Name",
    //   semester: "1st",
    //   difficulty: "Beginner",
    //   rating: 4.5,
    //   description: "Note description",
    //   topics: ["topic1", "topic2"],
    //   lastUpdated: "2024-01-15",
    //   downloads: 1250,
    //   type: "study"
    // }
  ];

 const universitySubjects =  [
  {
    id: "civil1",
    name: "Basic Civil Engineering",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1MTttdkOzAMTJy7Opnv-B3mDeo1SsX4RB?usp=drive_link",
    type: "drive",
    description: "Introduction to civil engineering principles and practices",
    credits: 3,
  },
  {
    id: "elec1",
    name: "Basic Electrical Engineering",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1FNtERvP8wafCSrabJk2at3krD3HBFZ9V?usp=drive_link",
    type: "drive",
    description: "Fundamentals of electrical circuits and systems",
    credits: 4,
  },
  {
    id: "cprog1",
    name: "Basic Programming with C",
    year: "1st",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/153xoVh_YOTBPLCUsyDL4J0zz-6w0ESHe?usp=drive_link",
    type: "drive",
    description: "Introduction to programming concepts using C language",
    credits: 4,
  },
  {
    id: "graph1",
    name: "Engineering Graphics",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1AKn8EsbLwhCdfXe8i--zAZjbQd-yotd4?usp=drive_link",
    type: "drive",
    description: "Technical drawing and engineering graphics fundamentals",
    credits: 3,
  },
  {
    id: "math1",
    name: "Engineering Mathematics-I",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1BsPruANVzaB-q_BUuI5PsxS42tbSrAV_?usp=drive_link",
    type: "drive",
    description: "Mathematical foundations for engineering applications",
    credits: 4,
  },
  {
    id: "phy1",
    name: "Engineering Physics",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1CbbDA1MpXpKZ0lfjXSHmcVfOvds8PFzS?usp=drive_link",
    type: "drive",
    description: "Fundamental concepts of physics applied to engineering problems",
    credits: 4,
  },
  {
    id: "env1",
    name: "Environmental Science",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1XlqHhSdqcw_mo2If5Kz-Wuyn2zVwDnMy?usp=drive_link",
    type: "drive",
    description: "Environmental awareness and sustainability concepts",
    credits: 2,
  },
  {
    id: "hist1",
    name: "History of Science and Technology",
    year: "1st",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1-bKRP9puVp6FEhGilfbF8YWlhkc4kspe?usp=drive_link",
    type: "drive",
    description: "Evolution of science and technology across civilizations",
    credits: 2,
  },
  {
    id: "cprog2",
    name: "Advanced Programming with C",
    year: "1st",
    semester: "Even",
    college: "Engineering College",
    link: "",
    type: "drive",
    description: "Advanced concepts in C programming with practical applications",
    credits: 4,
  },
  {
    id: "elect1",
    name: "Basic Electronics Engineering",
    year: "1st",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/13ldEAekrc8x3xjo0eVQvGY_wLIeX-4w5?usp=drive_link",
    type: "drive",
    description: "Introduction to electronic devices and circuits",
    credits: 4,
  },
  {
    id: "mech1",
    name: "Basic Mechanical Engineering",
    year: "1st",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/19Oy0WV2c2ilLKwEr7HBQedyVE68Sq3C7?usp=drive_link",
    type: "drive",
    description: "Fundamentals of mechanical systems and machines",
    credits: 3,
  },
  {
    id: "comm1",
    name: "Communication Skills",
    year: "1st",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1tdRskMpWujeJ99kAr-AZvKPg0B2dfQYs?usp=drive_link",
    type: "drive",
    description: "Professional communication and presentation skills",
    credits: 2,
  },
  {
    id: "chem1",
    name: "Engineering Chemistry",
    year: "1st",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1IqRkiiNfUER9g-OqqTILpEZjfFZzDnvh?usp=drive_link",
    type: "drive",
    description: "Chemical principles and their applications in engineering",
    credits: 4,
  },
  {
    id: "math2",
    name: "Engineering Mathematics-II",
    year: "1st",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1fna279z8tmAruC-mCRMzG59LoGqsT6bF?usp=drive_link",
    type: "drive",
    description: "Advanced mathematical methods for engineering problems",
    credits: 4,
  },
  {
    id: "work1",
    name: "Engineering Workshop",
    year: "1st",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1PO_JAQrsT2dJP4zW_hNT0uEPxN6w5niR?usp=drive_link",
    type: "drive",
    description: "Practical training in basic engineering workshop tools and processes",
    credits: 2,
  },
    {
    id: "csa2",
    name: "Computer System Architecture",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1FGnmE82dAw7yn6E4fhURZ5Riq4biiNKz?usp=drive_link",
    type: "drive",
    description: "Organization and architecture of computer systems",
    credits: 4,
  },
  {
    id: "dc2",
    name: "Data Communication",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1LpMinY688j0qmxUc8nkamuHZlAnP3fbx?usp=drive_link",
    type: "drive",
    description: "Principles of data transmission and communication systems",
    credits: 3,
  },
  {
    id: "ds2",
    name: "Data Structures",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1X1ks2DvZ07qTTm26CSAxy0FEgNLobPjx?usp=drive_link",
    type: "drive",
    description: "Design and analysis of basic data structures",
    credits: 4,
  },
  {
    id: "de2",
    name: "Digital Electronics",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1Estz6GZUbp0vau3UUntNCRhqbkKFTSQe?usp=drive_link",
    type: "drive",
    description: "Digital logic design and electronic circuits",
    credits: 3,
  },
  {
    id: "dm2",
    name: "Discrete Mathematics",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1Gh-Y_a8AkRSmLj2T8YJ0c7XgMcetnoxg?usp=drive_link",
    type: "drive",
    description: "Mathematical foundations of computer science",
    credits: 4,
  },
  {
    id: "java2",
    name: "Java Programming",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1Do0BTCqmJygiWArZ6GAGkRJzw7OPeTnT?usp=drive_link",
    type: "drive",
    description: "Object-oriented programming using Java",
    credits: 4,
  },
  {
    id: "oop2",
    name: "Object Oriented Programming",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1WKTSAg20PFEX7TvJYPyyW7qP91FyI8y9?usp=drive_link",
    type: "drive",
    description: "Concepts and applications of object-oriented programming",
    credits: 4,
  },
  {
    id: "advjava2",
    name: "Advanced Java Programming",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/156XSpwpoyp37lBc8akiWnBAsvnjf49V7?usp=drive_link",
    type: "drive",
    description: "Advanced features and frameworks in Java",
    credits: 4,
  },
  {
    id: "dbms2",
    name: "Database Management Systems",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1HNhHpFRtDkM7pgZQZXsmSpwE-K04f9Z0?usp=drive_link",
    type: "drive",
    description: "Design and implementation of database systems",
    credits: 4,
  },
  {
    id: "elective2",
    name: "Elective-1 R-Programming",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "pdf/Database_Systems.pdf",
    type: "pdf",
    description: "Introduction to R programming for data analysis",
    credits: 3,
  },
  {
    id: "web2",
    name: "Internet and Web Technology",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "pdf/Web_Technologies.pdf",
    type: "pdf",
    description: "Web technologies and internet applications",
    credits: 3,
  },
  {
    id: "micro2",
    name: "Microprocessor and Interfacing",
    year: "2nd",
    semester: "Even",
    college: "Engineering College",
    link: "pdf/Computer_Networks.pdf",
    type: "pdf",
    description: "Architecture and programming of microprocessors",
    credits: 4,
  },
  {
    id: "os2",
    name: "Operating Systems",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/13zelzN_xpYofPKJVjyF_2EXfFEn_yNa1?usp=drive_link",
    type: "drive",
    description: "Concepts and design of operating systems",
    credits: 4,
  },
  {
    id: "toc2",
    name: "Theory of Computation",
    year: "2nd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/16mIdBcZ29CdrM68FD2vE-DiOv-qffF0R?usp=drive_link",
    type: "drive",
    description: "Mathematical models of computation and automata theory",
    credits: 4,
  },
   {
    id: "se3",
    name: "Software Engineering",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1sPgB3j4LjzDxMtL-JeyJwnhoJu2NOCla?usp=drive_link",
    type: "drive",
    description: "Principles and practices for systematic software development",
    credits: 4,
  },
  {
    id: "cn3",
    name: "Computer Networks",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1tYSP_pDJakVwDvhPFybqrFjURIX2JuZT?usp=drive_link",
    type: "drive",
    description: "Concepts of data communication, protocols, and networking",
    credits: 4,
  },
  {
    id: "ai3",
    name: "Artificial Intelligence",
    year: "3rd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1YN1UFtUGIYS7ksV0ZmA9oDVRbv7m4nlW?usp=drive_link",
    type: "drive",
    description: "Introduction to AI, problem solving, and machine learning",
    credits: 4,
  },
  {
    id: "iot3",
    name: "Internet of Things",
    year: "3rd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1QOc0L1qooC0rOngkVKjXfFNyeu4ZyXyR?usp=drive_link",
    type: "drive",
    description: "IoT concepts, devices, and communication protocols",
    credits: 3,
  },
  {
    id: "cc3",
    name: "Cloud Computing",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1Xv7FCRpMtpOdT5jhO7DxVUtUmYn1yc67?usp=drive_link",
    type: "drive",
    description: "Cloud models, virtualization, and distributed computing",
    credits: 4,
  },
  {
    id: "ds3",
    name: "Data Science",
    year: "3rd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1y3Tww84zWvq4-0xWPm6sYF2-cJemHrct?usp=drive_link",
    type: "drive",
    description: "Data analytics, machine learning, and visualization",
    credits: 4,
  },
  {
    id: "nosql3",
    name: "NoSQL Database",
    year: "3rd",
    semester: "Odd",
    college: "Engineering College",
    link: "pdf/Design_Algorithms.pdf",
    type: "pdf",
    description: "Database models beyond relational systems",
    credits: 3,
  },
  {
    id: "nlp3",
    name: "Natural Language Processing",
    year: "3rd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1TufF0DZZCLvc51CAomT-aGEOdm8_UElH?usp=drive_link",
    type: "drive",
    description: "Text processing, machine translation, and sentiment analysis",
    credits: 4,
  },
  {
    id: "py3",
    name: "Python Essentials",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1BtX9b3glepdRfYHBlvNjJdBPLtac1Feu?usp=drive_link",
    type: "drive",
    description: "Python programming fundamentals and applications",
    credits: 3,
  },
  {
    id: "rprog3",
    name: "R-Programming",
    year: "3rd",
    semester: "Odd",
    college: "Engineering College",
    link: "pdf/Database_Systems.pdf",
    type: "pdf",
    description: "Statistical programming with R for data analysis",
    credits: 3,
  },
  {
    id: "block3",
    name: "Blockchain Architecture",
    year: "3rd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1prjQY5tfcRHzc_UWxnOr9x2p7H0exzwW?usp=drive_link",
    type: "drive",
    description: "Blockchain principles, smart contracts, and applications",
    credits: 4,
  },
  {
    id: "fmea3",
    name: "Fundamentals of Management, Economics and Accountancy",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/16shTYhL4JhK0jhqJeNxsmTcC5MdwD493?usp=drive_link",
    type: "drive",
    description: "Basics of management, economics, and accounting practices",
    credits: 3,
  },
  {
    id: "bde3",
    name: "Big Data Engineering",
    year: "3rd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/10agQb5aSonQIrpdXfy-6kK63xhGL9Jwe?usp=drive_link",
    type: "drive",
    description: "Big data frameworks and large-scale data processing",
    credits: 4,
  },
  {
    id: "dsci3",
    name: "Data Science",
    year: "3rd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/19rfkBTI6pMVbua4jUBbfgFg-lqnqHQSe?usp=drive_link",
    type: "drive",
    description: "Data exploration, predictive analytics, and ML models",
    credits: 4,
  },
  {
    id: "daa3",
    name: "Design and Analysis of Algorithms",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1LmSUO-w_PmCo2aasNY4PpWxOmfMy3hm9?usp=drive_link",
    type: "drive",
    description: "Algorithmic design techniques and complexity analysis",
    credits: 4,
  },
  {
    id: "nlp32",
    name: "Natural Language Processing",
    year: "3rd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1SnR8tGxhJEPmsGE6KJKaoBKsuV0tNR4N?usp=drive_link",
    type: "drive",
    description: "Advanced NLP techniques and applications",
    credits: 4,
  },
  {
    id: "agile3",
    name: "Agile Development",
    year: "3rd",
    semester: "Both",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1XDYalTIJZBUjtTm8yu1TNAm0DPwhbSIA?usp=drive_link",
    type: "drive",
    description: "Agile methodologies for iterative software development",
    credits: 3,
  },
  {
    id: "dbtools3",
    name: "Database Applications and Tools",
    year: "3rd",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1iMubbh7GWRL5CWM0T8MTNq240gnSmW1o?usp=drive_link",
    type: "drive",
    description: "Practical tools and applications for database systems",
    credits: 3,
  },
  {
    id: "cd3",
    name: "Compiler Design",
    year: "3rd",
    semester: "Even",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1m3xpl4vMPJs3t7XEZzHe-28bpYUhzTtL?usp=drive_link",
    type: "drive",
    description: "Phases of compiler design and implementation techniques",
    credits: 4,
  },
   {
    id: "dv4",
    name: "Data Visualization",
    year: "4th",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1J3qG9KJIupqeQAI5v_k-wY9KfYqyZ6sf?usp=drive_link",
    type: "drive",
    description: "Techniques and tools for effective data visualization",
    credits: 4,
  },
  {
    id: "ds4",
    name: "Distributed Systems",
    year: "4th",
    semester: "Odd",
    college: "Engineering College",
    link: "https://drive.google.com/drive/folders/1iApeNHmGXogK2IHRzM7JWv0TkDYwp2yr?usp=drive_link",
    type: "drive",
    description: "Principles and architectures of distributed computing systems",
    credits: 4,
  },
  {
  id: "adhoc1",
  name: "Ad-hoc Network",
  year: "4th",
  semester: "Odd",
  college: "Engineering College",
  link: "https://drive.google.com/file/d/1L4k9ZUVMwpUXktK6Hpom-HtS3F8bZbxf/view?usp=drivesdk",
  type: "drive",
  description: "Fundamentals, architectures, and protocols of mobile and wireless ad-hoc networks",
  credits: 4,
},
{
  id: "cloudsec1",
  name: "Cloud Security",
  year: "4th",
  semester: "Odd",
  college: "Engineering College",
  link: "https://drive.google.com/drive/u/1/folders/1eXDM0cmh2syIF81wMaHePMqU-FkmeDeL",
  type: "drive",
  description: "Principles, technologies, and best practices for securing cloud infrastructures, services, and data.",
  credits: 4,
},

];
  // Generate search suggestions with abort controller
  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    if (debouncedSearchTerm.length > 0) {
      setIsLoading(true);
      const allItems = [...mockNotes, ...universitySubjects];
      const suggestions = allItems
        .filter(item => 
          item.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.subject?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.topics?.some(topic => topic.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
          item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.college?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
        .slice(0, 5)
        .map(item => ({
          id: item.id,
          title: item.title || item.name,
          type: item.type || 'university',
          subject: item.subject || item.college
        }));
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
      setIsLoading(false);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchTerm]);

  // Memoized filtered notes for performance
  const filteredNotes = useMemo(() => {
    const searchQuery = activeSearch || debouncedSearchTerm;
    return mockNotes.filter(note => {
      const matchesSearch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.topics && note.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCourse = selectedCourse === 'all' || note.course === selectedCourse || note.course === '';
      const matchesSemester = selectedSemester === 'all' || note.semester === selectedSemester || note.semester === '';
      const matchesType = selectedType === 'all' || selectedType === 'study';

      return matchesSearch && matchesCourse && matchesSemester && matchesType;
    });
  }, [mockNotes, activeSearch, debouncedSearchTerm, selectedCourse, selectedSemester, selectedType]);

  const filteredUniversitySubjects = useMemo(() => {
    const searchQuery = activeSearch || debouncedSearchTerm || subjectSearch;
    return universitySubjects.filter(subject => {
      const matchesSearch = searchQuery === '' || 
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.college.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCollege = selectedCollege === 'all' || subject.college === selectedCollege;
      const matchesYear = selectedYear === 'all' || subject.year === selectedYear;
      const matchesUniversitySemester = selectedUniversitySemester === 'all' || 
        subject.semester === selectedUniversitySemester || 
        subject.semester === 'Both';
      const matchesType = selectedType === 'all' || selectedType === 'university';

      return matchesSearch && matchesCollege && matchesYear && matchesUniversitySemester && matchesType;
    });
  }, [universitySubjects, activeSearch, debouncedSearchTerm, subjectSearch, selectedCollege, selectedYear, selectedUniversitySemester, selectedType]);

  // Popular searches

  // Utility functions
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getYearColor = (year) => {
    switch (year) {
      case '1st': return 'bg-green-100 text-green-800 border-green-200';
      case '2nd': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '3rd': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Memoized event handlers
  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const handleSearch = useCallback(() => {
    setActiveSearch(searchTerm);
    setShowSuggestions(false);
  }, [searchTerm]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchTerm(suggestion.title);
    setActiveSearch(suggestion.title);
    setShowSuggestions(false);
  }, []);

  const handleQuickSearch = useCallback((term) => {
    setSearchTerm(term);
    setActiveSearch(term);
    setSelectedType('all');
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setActiveSearch('');
    setSubjectSearch('');
    setSearchSuggestions([]);
    setShowSuggestions(false);
  }, []);

  const clearUniversityFilters = useCallback(() => {
    setSelectedCollege('all');
    setSelectedYear('all');
    setSelectedUniversitySemester('all');
    setSubjectSearch('');
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Statistics
  const studyNotesCount = mockNotes.filter(note => note.type === 'study').length;
  const universityNotesCount = universitySubjects.length;
  const totalResources = studyNotesCount + universityNotesCount;

  // Determine what to show based on selections
  const showStudyNotes = selectedType === 'all' || selectedType === 'study';
  const showUniversityNotes = selectedType === 'all' || selectedType === 'university';

  const displayedStudyNotes = showStudyNotes ? filteredNotes : [];
  const displayedUniversitySubjects = showUniversityNotes ? filteredUniversitySubjects : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Notes</h1>
          <p className="text-gray-600">Access comprehensive study materials organized by course and subject</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Programming Resources</p>
                <p className="text-2xl font-bold text-gray-900">{studyNotesCount}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  coming soon
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-3 rounded-xl">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">University Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{universityNotesCount}</p>
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated weekly
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900">{totalResources}</p>
                <p className="text-xs text-gray-500">All categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Search All Resources
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Try 'Physics', 'Programming', 'Mathematics', 'Algorithms'..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                {isLoading && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{suggestion.title}</div>
                      <div className="text-sm text-gray-500 capitalize">{suggestion.type} • {suggestion.subject}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Search Info */}
          {activeSearch && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-700">
                    Showing results for: <strong>"{activeSearch}"</strong>
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {displayedStudyNotes.length + displayedUniversitySubjects.length} results
                  </span>
                </div>
                <button
                  onClick={clearSearch}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Resources', count: totalResources, icon: Grid },
                { id: 'university', label: 'University Notes', count: universityNotesCount, icon: Building }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = selectedType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedType(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      isActive ? 'bg-white/20' : 'bg-gray-300'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {displayedStudyNotes.length + displayedUniversitySubjects.length} resources found
              </span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* University Notes Filters */}
        {selectedType === 'university' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">University Notes Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Colleges</option>
                  <option value="Engineering College">Engineering College</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Years</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={selectedUniversitySemester}
                  onChange={(e) => setSelectedUniversitySemester(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Semesters</option>
                  <option value="Even">Even Semester</option>
                  <option value="Odd">Odd Semester</option>
                  <option value="Both">Both Semesters</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Subjects</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    placeholder="Search by subject name..."
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={clearUniversityFilters}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear University Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-8">
          {/* Show study notes when 'all' or 'study' is selected */}
          {displayedStudyNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Study Notes ({displayedStudyNotes.length})
              </h2>
              <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {displayedStudyNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(note.difficulty)}`}>
                            <Target className="w-3 h-3" />
                            {note.difficulty}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 bg-blue-100 text-blue-800">
                            <BookOpen className="w-3 h-3" />
                            {note.course || 'General'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium ml-1">{note.rating}</span>
                          </div>
                          <button
                            onClick={() => toggleFavorite(note.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Heart 
                              className="w-5 h-5" 
                              fill={favorites.has(note.id) ? "currentColor" : "none"}
                            />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{note.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{note.subject}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{note.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.topics.slice(0, 3).map((topic) => (
                          <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                        {note.topics.length > 3 && (
                          <span className="text-xs text-gray-500">+{note.topics.length - 3}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(note.lastUpdated).toLocaleDateString()}
                          </span>
                          <span className="text-green-600 font-medium">
                            {note.downloads?.toLocaleString()} views
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
                          <Eye className="w-4 h-4" />
                          View Notes
                        </button>
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show university subjects when 'all' or 'university' is selected */}
          {displayedUniversitySubjects.length > 0 && (
            <div className={displayedStudyNotes.length > 0 ? 'mt-8' : ''}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <School className="w-6 h-6 text-purple-600" />
                University Subjects ({displayedUniversitySubjects.length})
              </h2>
              <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {displayedUniversitySubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getYearColor(subject.year)}`}>
                            <Calendar className="w-3 h-3" />
                            {subject.year} Year
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border border-gray-300">
                            {subject.semester}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                            {subject.credits} Credits
                          </span>
                        </div>
                        <button
                          onClick={() => toggleFavorite(subject.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <Heart 
                            className="w-5 h-5" 
                            fill={favorites.has(subject.id) ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{subject.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{subject.college}</p>
                      
                      <div className="min-h-[3rem] mb-4 flex-1">
                        <p className="text-gray-700 text-sm line-clamp-2">{subject.description}</p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <a
                            href={subject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View on Drive
                          </a>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              {/* <Bookmark className="w-4 h-4" /> */}
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              {/* <Share2 className="w-4 h-4" /> */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {displayedStudyNotes.length === 0 && displayedUniversitySubjects.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeSearch ? 'No results found' : 'No resources available'}
              </h3>
              <p className="text-gray-600 mb-4">
                {activeSearch 
                  ? `No resources found for "${activeSearch}". Try a different search term.`
                  : 'Try selecting different filters or search for specific resources.'
                }
              </p>
              <button 
                onClick={clearSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {activeSearch ? 'Clear Search' : 'View All Resources'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}