'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code, Zap, Clock, Rocket, Mail } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  content: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '600px',
    padding: '60px 40px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
  },
  iconContainer: {
    width: '100px',
    height: '100px',
    margin: '0 auto 30px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #fff, #f0f9ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.1'
  },
  subtitle: {
    fontSize: '1.3rem',
    marginBottom: '30px',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '40px',
    opacity: '0.8',
    lineHeight: '1.6'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    margin: '40px 0'
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.3s ease'
  },
  featureIcon: {
    marginBottom: '15px',
    opacity: '0.9'
  },
  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px'
  },
  featureText: {
    fontSize: '0.9rem',
    opacity: '0.8',
    lineHeight: '1.5'
  },
  ctaButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '40px 0'
  },
  primaryButton: {
    padding: '15px 30px',
    borderRadius: '12px',
    background: 'white',
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  secondaryButton: {
    padding: '15px 30px',
    borderRadius: '12px',
    background: 'transparent',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  notification: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '30px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '0.9rem'
  },
  countdown: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '40px 0',
    flexWrap: 'wrap'
  },
  countdownItem: {
    textAlign: 'center',
    minWidth: '80px'
  },
  countdownNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #fff, #f0f9ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '5px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  countdownLabel: {
    fontSize: '0.8rem',
    opacity: '0.7',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600'
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
    margin: '20px 0',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #fff, #f0f9ff)',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  }
};

// Set your launch date here (format: YYYY-MM-DD)
const LAUNCH_DATE = '2026-01-01T23:59:59'; // Change this to your desired launch date

export default function CodeLabComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(LAUNCH_DATE) - +new Date();
      
      if (difference <= 0) {
        setIsLaunched(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initialize immediately
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Code size={24} />,
      title: 'Real-time Code Execution',
      description: 'Write and run code in multiple programming languages directly in your browser'
    },
    {
      icon: <Zap size={24} />,
      title: 'AI-Powered Assistance',
      description: 'Get intelligent code suggestions and debugging help powered by AI'
    },
    {
      icon: <Rocket size={24} />,
      title: 'Interactive Learning',
      description: 'Learn through hands-on coding exercises and practical projects'
    }
  ];

  // Calculate progress percentage
  const totalDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  const timePassed = totalDuration - (timeLeft.days * 24 * 60 * 60 * 1000 + 
                     timeLeft.hours * 60 * 60 * 1000 + 
                     timeLeft.minutes * 60 * 1000 + 
                     timeLeft.seconds * 1000);
  const progress = Math.min((timePassed / totalDuration) * 100, 100);

  if (isLaunched) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.iconContainer}>
            <Rocket size={40} color="white" />
          </div>
          
          <h1 style={styles.title}>CodeLab is Here! 🎉</h1>
          
          <p style={styles.subtitle}>
            The wait is over! CodeLab is now live and ready for you to explore.
          </p>

          <div style={styles.ctaButtons}>
            <Link href="/codelab" style={styles.primaryButton}>
              <Code size={18} />
              Launch CodeLab
            </Link>
            <Link href="/" style={styles.secondaryButton}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <Code size={40} color="white" />
        </div>
        
        <h1 style={styles.title}>CodeLab Coming Soon</h1>
        
        <p style={styles.subtitle}>
          We're building an amazing interactive coding environment to supercharge your learning experience
        </p>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        {/* Countdown Timer */}
        <div style={styles.countdown}>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.days.toString().padStart(2, '0')}</div>
            <div style={styles.countdownLabel}>Days</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div style={styles.countdownLabel}>Hours</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div style={styles.countdownLabel}>Minutes</div>
          </div>
          <div style={styles.countdownItem}>
            <div style={styles.countdownNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div style={styles.countdownLabel}>Seconds</div>
          </div>
        </div>

        <p style={styles.description}>
          Get ready to code, learn, and collaborate like never before. Our CodeLab will feature 
          real-time execution, AI assistance, and a vast library of coding exercises.
        </p>

        {/* Features Grid */}
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureText}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div style={styles.ctaButtons}>
          <Link href="/" style={styles.primaryButton}>
            <Rocket size={18} />
            Back to Home
          </Link>
         
        </div>

        {/* Notification */}
        <div style={styles.notification}>
          <Clock size={16} />
          Launching on 1 February, 2026
        </div>
      </div>
    </div>
  );
}