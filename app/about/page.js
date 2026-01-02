'use client';
import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Code, 
  FileText, 
  Brain, 
  Target, 
  Users,
  Zap,
  CheckCircle,
  Lightbulb,
  Rocket,
  PlayCircle
} from 'lucide-react';

const styles = {
  aboutContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  heroSection: {
    padding: '120px 20px 80px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', // Light gray
  },
  // Your exact gradient theme
  gradientText: {
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'gradient 3s ease infinite',
  },
  heroTagline: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'gradient 3s ease infinite',
  },
  heroIntro: {
    fontSize: '1.3rem',
    color: '#64748b', // Gray text instead of light blue
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  sectionContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  storySection: {
    padding: '80px 0',
    background: '#ffffff',
  },
  featuresSection: {
    padding: '80px 0',
    background: '#f8fafc', // Light gray
  },
  aiSection: {
    padding: '80px 0',
    background: '#ffffff',
  },
  commitmentSection: {
    padding: '80px 0',
    background: '#f1f5f9', // Light gray
  },
  ctaSection: {
    padding: '100px 0',
    background: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', // Light gray gradient
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '700',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'gradient 3s ease infinite',
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: '50px',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6',
  },
  sectionText: {
    fontSize: '1.1rem',
    color: '#475569',
    lineHeight: '1.7',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 25px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginTop: '50px',
  },
  featureCard: {
    background: 'white',
    padding: '40px 30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  featureCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  featureIconContainer: {
    width: '80px',
    height: '80px',
    margin: '0 auto 25px',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px rgba(37, 99, 235, 0.3)',
  },
  featureIcon: {
    color: 'white',
    width: '35px',
    height: '35px',
  },
  featureTitle: {
    fontSize: '1.4rem',
    marginBottom: '15px',
    fontWeight: '600',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'gradient 3s ease infinite',
  },
  featureDescription: {
    color: '#64748b',
    lineHeight: '1.6',
    fontSize: '1rem',
  },
  aiToolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '40px',
  },
  aiToolItem: {
    background: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: 'all 0.2s ease',
  },
  aiToolItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  aiToolIcon: {
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    padding: '10px',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiToolName: {
    fontWeight: '600',
    marginBottom: '5px',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  aiToolDesc: {
    color: '#64748b',
    fontSize: '0.9rem',
  },
  commitmentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    marginTop: '50px',
  },
  commitmentCard: {
    textAlign: 'center',
    padding: '50px 30px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  commitmentIconContainer: {
    width: '80px',
    height: '80px',
    margin: '0 auto 25px',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px rgba(37, 99, 235, 0.3)',
  },
  commitmentIcon: {
    color: 'white',
    width: '35px',
    height: '35px',
  },
  commitmentTitle: {
    fontSize: '1.4rem',
    marginBottom: '15px',
    fontWeight: '600',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  commitmentDescription: {
    color: '#64748b',
    lineHeight: '1.6',
  },
  ctaButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    margin: '50px 0',
    flexWrap: 'wrap',
  },
  ctaButton: {
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    fontSize: '1.1rem',
  },
  ctaButtonPrimary: {
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    color: 'white',
    backgroundSize: '200% 200%',
    animation: 'gradient 3s ease infinite',
  },
  ctaButtonSecondary: {
    background: 'transparent',
    color: '#374151', // Dark gray text
    border: '2px solid #374151', // Dark gray border
  },
  signature: {
    fontStyle: 'italic',
    color: '#64748b', // Gray text
    marginTop: '40px',
    fontSize: '1.1rem',
  },
  teamSignature: {
    fontWeight: '600',
    fontSize: '1.3rem',
    marginTop: '10px',
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  badge: {
    background: 'linear-gradient(to right, #2563eb, #7c3aed, #0891b2)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'inline-block',
    marginBottom: '20px',
  }
};

// Add the gradient animation keyframes
const gradientAnimation = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [hoveredAiTool, setHoveredAiTool] = React.useState(null);

  // Inject the gradient animation styles
  React.useEffect(() => {
    const styleSheet = document.styleSheets[0];
    try {
      styleSheet.insertRule(gradientAnimation, styleSheet.cssRules.length);
    } catch (e) {
      // Animation already exists
    }
  }, []);

  const features = [
    {
      icon: <BookOpen style={styles.featureIcon} />,
      title: "Master Your Subjects with Organized Notes",
      description: "Access high-quality, peer-reviewed college and university notes in one centralized platform."
    },
    {
      icon: <Code style={styles.featureIcon} />,
      title: "Code with Confidence",
      description: "Practice with real-time code execution across multiple programming languages in our Code Labs."
    },
    {
      icon: <FileText style={styles.featureIcon} />,
      title: "Build Your Future with Ease",
      description: "Create professional resumes that showcase your academic achievements and skills effectively."
    },
    {
      icon: <Brain style={styles.featureIcon} />,
      title: "Study Smarter with AI-Powered Tools",
      description: "Leverage cutting-edge AI technology to enhance your learning efficiency and comprehension."
    },
    {
      icon: <Zap style={styles.featureIcon} />,
      title: "Test Your Knowledge",
      description: "Reinforce learning with interactive quizzes and track your progress over time."
    }
  ];

  const aiTools = [
    { name: "Text Summarizer", desc: "Condense lengthy readings into key points" },
    { name: "Quiz Generator", desc: "Create custom practice tests from your notes" },
    { name: "Flashcard Generator", desc: "Turn any topic into digestible flashcards" },
    { name: "Study Plan Generator", desc: "Build structured schedules tailored to your goals" },
    { name: "Concept Explainer", desc: "Get simple explanations for complex topics" },
    { name: "Coder Helper", desc: "AI-assisted guidance for better coding" }
  ];

  const commitments = [
    {
      icon: <CheckCircle style={styles.commitmentIcon} />,
      title: "Quality & Trust",
      description: "Every resource and tool is designed with accuracy and reliability in mind."
    },
    {
      icon: <Users style={styles.commitmentIcon} />,
      title: "Community-Driven Growth",
      description: "We thrive on collaboration and user feedback to build a richer learning ecosystem."
    },
    {
      icon: <Target style={styles.commitmentIcon} />,
      title: "Accessibility for All",
      description: "Breaking down barriers to education with intuitive, affordable tools for every learner."
    }
  ];

  return (
    <div style={styles.aboutContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.sectionContent}>
          <div style={styles.badge}>Trusted by 4500+ Students</div>
          <h1 style={styles.heroTagline}>
            Demystifying Learning, One Tool at a Time.
          </h1>
          <p style={styles.heroIntro}>
            Welcome to <strong>Notesin</strong>, where we believe that learning should be clear, 
            organized, and empowering for everyone. We're more than just a website; we're a 
            dedicated online community built by learners, for learners.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={styles.storySection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Our Story: Born from a Student's Struggle</h2>
          <p style={styles.sectionText}>
            Notesin was founded on a simple observation: students and lifelong learners are 
            often overwhelmed. They juggle multiple subjects, struggle to find reliable resources, 
            and spend more time organizing than actually learning.
          </p>
          <p style={styles.sectionText}>
            That's why we created Notesin—a comprehensive platform designed to streamline studying, 
            enhance understanding, and build the skills you need for success in academics and beyond.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>How Notesin Empowers Your Learning</h2>
          <p style={styles.sectionSubtitle}>
            We've built a suite of integrated tools to support you at every stage of your learning journey.
          </p>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.featureCard,
                  ...(hoveredCard === index ? styles.featureCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.featureIconContainer}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section style={styles.aiSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Your AI-Powered Study Assistant</h2>
          <p style={styles.sectionSubtitle}>
            Powered by Google Gemini API, our intelligent tools adapt to your learning style
          </p>
          <div style={styles.aiToolsGrid}>
            {aiTools.map((tool, index) => (
              <div 
                key={index}
                style={{
                  ...styles.aiToolItem,
                  ...(hoveredAiTool === index ? styles.aiToolItemHover : {})
                }}
                onMouseEnter={() => setHoveredAiTool(index)}
                onMouseLeave={() => setHoveredAiTool(null)}
              >
                <div style={styles.aiToolIcon}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <div style={styles.aiToolName}>{tool.name}</div>
                  <div style={styles.aiToolDesc}>{tool.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section style={styles.commitmentSection}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionTitle}>Our Commitment to You</h2>
          <div style={styles.commitmentsGrid}>
            {commitments.map((commitment, index) => (
              <div key={index} style={styles.commitmentCard}>
                <div style={styles.commitmentIconContainer}>
                  {commitment.icon}
                </div>
                <h3 style={styles.commitmentTitle}>{commitment.title}</h3>
                <p style={styles.commitmentDescription}>{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.sectionContent}>
          <Rocket size={60} style={{ margin: '0 auto 30px', opacity: '0.9', color: '#2563eb' }} />
          <h2 style={styles.sectionTitle}>Join Our Learning Community</h2>
          <p style={styles.sectionText}>
            You're not just a user here—you're a valued member of a community that's passionate about knowledge. 
            Together, we can make learning less stressful and more successful.
          </p>
          <div style={styles.ctaButtons}>
            <Link 
              href="/" 
              style={{...styles.ctaButton, ...styles.ctaButtonPrimary}}
            >
              Start Exploring Notesin Now
            </Link>
          
          </div>
          <p style={styles.signature}>Thank you for choosing Notesin. Let's achieve great things, together.</p>
          <p style={styles.teamSignature}>— The Notesin Team</p>
        </div>
      </section>
    </div>
  );
}