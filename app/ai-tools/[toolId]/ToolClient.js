'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// ✅ Lucide icons
import {
  ArrowLeft,
  Loader2,
  Rocket,
  Sparkles,
  Copy,
  Download,
  Volume2,
  FileText,
  HelpCircle,
  Layers,
  Calendar,
  BookOpen,
  Zap,
  Trash2,
  Wifi,
  WifiOff,
} from 'lucide-react';

// 🔹 Custom hook for debounce
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

// 🔹 Function to clean markdown formatting
const cleanMarkdown = (text) => {
  if (!text) return '';
  
  return text
    // Remove headers (###, ##, #)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic markers (**text**, *text*, __text__)
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove code blocks (```code```)
    .replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```[\w]*\n?/g, '').replace(/```/g, '');
    })
    // Remove inline code (`code`)
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes (> text)
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules (---, ***)
    .replace(/^[-*]{3,}$/gm, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();
};

// 🔹 Function to clean AI response
const cleanAIResponse = (response) => {
  if (!response) return '';
  
  let cleaned = response;
  
  // Remove common AI prefixes
  const prefixes = [
    'Of course.',
    'Certainly!',
    'Here is',
    'Here are',
    'I\'d be happy to',
    "Let me",
    "I'll",
    "Absolutely!"
  ];
  
  prefixes.forEach(prefix => {
    if (cleaned.startsWith(prefix)) {
      cleaned = cleaned.slice(prefix.length).trim();
    }
  });
  
  // Clean markdown
  cleaned = cleanMarkdown(cleaned);
  
  return cleaned;
};

export default function ToolClient({ tool }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [requestsRemaining, setRequestsRemaining] = useState(50);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 5000;

  // 🔹 Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    setIsOffline(!navigator.onLine);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 🔹 Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`tool-history-${tool.id}`);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading history:', err);
      }
    }
  }, [tool.id]);

  // 🔹 Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(`tool-history-${tool.id}`, JSON.stringify(history));
    }
  }, [history, tool.id]);

  // 🔹 Input change handler with character limit
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setInput(value);
      setCharCount(value.length);
    }
  };

  const handleFetch = useCallback(async () => {
    // 🔹 Validation checks
    if (isOffline) {
      setError('You are offline. Please check your internet connection.');
      return;
    }

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    // 🔹 Rate limiting: 1 request per 2 seconds
    if (timeSinceLastRequest < 2000) {
      setError('Please wait a moment before making another request');
      return;
    }
    
    if (requestsRemaining <= 0) {
      setError('Daily limit reached. Please try again tomorrow.');
      return;
    }

    if (!input.trim()) {
      setError('Please enter some input');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setLastRequestTime(now);
    setRequestsRemaining(prev => prev - 1);

    try {
      // Enhanced prompt to get clean responses without markdown
      const enhancedInput = `${input}

Please provide the response in clean, plain text without any markdown formatting, asterisks, hashtags, or code blocks. Use clear, readable formatting.`;

      // 🔹 CORRECTED: Use relative path to your own API route
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          toolName: tool.id, 
          input: enhancedInput 
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }

      const data = await res.json();

      // Clean the AI response before setting it
      const cleanedResult = cleanAIResponse(data.result || data.response || 'No output generated');
      setResult(cleanedResult);
      
      setHistory((prev) => [
        { 
          id: Date.now(), 
          input: input.trim().substring(0, 100) + (input.trim().length > 100 ? '...' : ''), 
          timestamp: new Date().toLocaleString() 
        },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      console.error('💥 Fetch error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setRequestsRemaining(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [tool, input, isOffline, lastRequestTime, requestsRemaining]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.id}-result-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTextToSpeech = () => {
    if (!result) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(result);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      setError('Text-to-speech is not supported in your browser');
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(`tool-history-${tool.id}`);
  };

  // 🔹 UPDATED: Better quiz formatter that handles the nested structure
  const renderFormattedResult = () => {
    if (!result) return null;

    if (loading) {
      return <ResultSkeleton />;
    }

    // Try to parse as JSON
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      // If it's not JSON, display as plain text
      return (
        <div className="prose max-w-none">
          {result.split('\n').map((line, idx) => (
            <p key={idx} className="mb-2">{line}</p>
          ))}
        </div>
      );
    }

    // Handle different tool types
    switch (tool.id) {
      case 'quiz':
        return renderQuiz(parsed);
      case 'flashcards':
        return renderFlashcards(parsed);
      case 'studyplan':
        return renderStudyPlan(parsed);
      case 'explainer':
        return renderExplainer(parsed);
      case 'summarizer':
        return (
          <div className="prose max-w-none">
            {result.split('\n').map((line, idx) => (
              <p key={idx} className="mb-3 text-gray-700 leading-relaxed">{line}</p>
            ))}
          </div>
        );
      case 'codehelper':
        return (
          <div className="space-y-4">
            {result.split('\n\n').map((paragraph, idx) => {
              const isCodeBlock = paragraph.includes('function') || 
                                 paragraph.includes('const ') || 
                                 paragraph.includes('let ') || 
                                 paragraph.includes('var ') ||
                                 paragraph.includes('class ') ||
                                 paragraph.includes('import ') ||
                                 paragraph.includes('export ');
              
              if (isCodeBlock) {
                return (
                  <pre key={idx} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700">
                    {paragraph}
                  </pre>
                );
              }
              
              return (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        );
      default:
        return (
          <pre className="whitespace-pre-wrap text-gray-800 text-sm font-sans">
            {result}
          </pre>
        );
    }
  };

  // 🔹 CORRECTED: Quiz renderer that handles the nested structure
  const renderQuiz = (quizData) => {
    // Extract questions from the nested structure
    const questions = quizData.quiz?.questions || quizData.questions || [];
    const quizTitle = quizData.quiz?.title || quizData.quizTitle || 'Generated Quiz';
    const quizDescription = quizData.quiz?.description || quizData.description;

    if (questions.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No questions found in the quiz data.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Quiz Header */}
        <div className="text-center mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{quizTitle}</h2>
          {quizDescription && (
            <p className="text-gray-600 max-w-2xl mx-auto">{quizDescription}</p>
          )}
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <Card key={question.id || index} className="border-2 border-gray-100 hover:border-blue-200 transition-colors">
            <CardContent className="p-6">
              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <span>{question.question || question.questionText}</span>
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {(question.options || []).map((option, optIndex) => {
                  const isCorrect = option === question.answer || option === question.correctAnswer;
                  return (
                    <div
                      key={optIndex}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCorrect
                          ? 'border-green-500 bg-green-50 text-green-800 font-medium'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm bg-white rounded-full w-6 h-6 flex items-center justify-center border">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isCorrect && (
                          <span className="ml-auto text-green-600 font-semibold text-sm flex items-center gap-1">
                            <Sparkles className="h-4 w-4" />
                            Correct
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {question.explanation && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">💡 Explanation:</span> {question.explanation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderFlashcards = (flashcardData) => {
    const cards = flashcardData.cards || flashcardData.flashcards || [];
    
    if (cards.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No flashcards found.
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 border-purple-100">
            <CardContent className="p-6">
              {/* Question Side */}
              <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 text-sm mb-1">Question:</h4>
                <p className="text-gray-800 font-medium">{card.question || card.front}</p>
              </div>
              
              {/* Answer Side */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 text-sm mb-1">Answer:</h4>
                <p className="text-gray-700">{card.answer || card.back}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderStudyPlan = (planData) => {
    const plan = planData.plan || planData.schedule || [];
    
    if (plan.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No study plan found.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {plan.map((day, index) => (
          <Card key={index} className="border-2 border-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {day.day || `Day ${index + 1}`}
                </h3>
                {day.duration && (
                  <span className="ml-auto bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                    {day.duration}
                  </span>
                )}
              </div>
              
              <ul className="space-y-2">
                {(day.tasks || day.activities || []).map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderExplainer = (explainerData) => {
    return (
      <div className="space-y-4">
        {(explainerData.topic || explainerData.title) && (
          <h2 className="text-2xl font-bold text-gray-800">
            {explainerData.topic || explainerData.title}
          </h2>
        )}
        
        {explainerData.explanation && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {explainerData.explanation}
            </p>
          </div>
        )}
        
        {explainerData.examples && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Examples:</h3>
            <p className="text-yellow-700">{explainerData.examples}</p>
          </div>
        )}
        
        {explainerData.keyPoints && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Key Points:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {explainerData.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const IconComponent = getToolIcon(tool.id);

  // 🔹 Template suggestions
  const templateSuggestions = useMemo(() => ({
    quiz: [
      "Generate a 5-question quiz about React hooks",
      "Create a biology quiz about cell structure for high school students"
    ],
    flashcards: [
      "Make flashcards for JavaScript array methods with simple explanations",
      "Create vocabulary cards for Spanish learning with English translations"
    ],
    studyplan: [
      "Create a 7-day study plan for learning Python programming basics",
      "Generate a 30-day plan to prepare for SAT math section"
    ],
    summarizer: [
      "Summarize this text into key bullet points",
      "Provide a brief summary of the main concepts"
    ],
    explainer: [
      "Explain quantum computing in simple terms with examples",
      "Describe how machine learning algorithms work step by step"
    ],
    codehelper: [
      "Help fix this JavaScript function that has an off by one error",
      "Explain how to implement user authentication in Next.js"
    ]
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/ai-tools"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back to Tools</span>
            </Link>

            <div className="flex items-center gap-3">
              <div
                className={`bg-gradient-to-r ${tool.gradient} p-2 sm:p-3 rounded-xl shadow-lg`}
              >
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                  {tool.name}
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {tool.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isOffline ? (
                <WifiOff className="h-5 w-5 text-red-500" title="Offline" />
              ) : (
                <Wifi className="h-5 w-5 text-green-500" title="Online" />
              )}
              <div className="text-sm text-gray-600">
                {requestsRemaining} requests left
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Input & Results */}
          <div className="xl:col-span-2 space-y-6">
            {/* Input Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Template Suggestions */}
                  {templateSuggestions[tool.id] && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {templateSuggestions[tool.id].map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInput(suggestion)}
                          className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          {suggestion.substring(0, 40)}...
                        </button>
                      ))}
                    </div>
                  )}

                  <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder={tool.placeholder}
                    className="w-full h-40 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                    disabled={loading}
                  />

                  <div className="flex justify-between items-center text-sm">
                    <span className={`text-xs ${charCount > MAX_CHARS * 0.8 ? 'text-orange-500' : 'text-gray-500'}`}>
                      {charCount}/{MAX_CHARS} characters
                    </span>
                    {charCount > MAX_CHARS * 0.9 && (
                      <span className="text-red-500 text-xs">Approaching limit</span>
                    )}
                  </div>

                  <button
                    onClick={handleFetch}
                    disabled={loading || !input.trim() || charCount === 0 || isOffline}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Rocket className="h-5 w-5" />
                        Generate {tool.name}
                      </>
                    )}
                  </button>

                  {isOffline && (
                    <p className="text-red-500 text-sm text-center">
                      You are currently offline. Please check your internet connection.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            {result && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      {tool.name} Result
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleCopy} 
                        title="Copy to clipboard"
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={!result}
                      >
                        <Copy className="h-4 w-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={handleDownload} 
                        title="Download as text file"
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={!result}
                      >
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={handleTextToSpeech} 
                        title="Read aloud"
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={!result}
                      >
                        <Volume2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-dashed min-h-[200px]">
                    {renderFormattedResult()}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar 
            tool={tool} 
            history={history} 
            setInput={setInput}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}

// 🔹 Sidebar Component
function Sidebar({ tool, history, setInput, clearHistory }) {
  return (
    <div className="space-y-6">
      {/* Tips Card */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            💡 {tool.name} Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {getToolSpecificTips(tool.name).map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* History Card */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Activity</h3>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                title="Clear history"
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No recent activity
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setInput(item.input)}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <p className="text-sm text-gray-600 truncate">{item.input}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 🔹 Skeleton Loader Component
function ResultSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}

// 🔹 Icons Mapping
function getToolIcon(toolId) {
  const icons = {
    summarizer: FileText,
    quiz: HelpCircle,
    flashcards: Layers,
    studyplan: Calendar,
    explainer: BookOpen,
    codehelper: Zap,
  };
  return icons[toolId] || FileText;
}

// 🔹 Tips Mapping
function getToolSpecificTips(toolName) {
  const tips = {
    'Text Summarizer': [
      'Paste long articles or essays for concise summaries',
      'Keep key paragraphs intact for better accuracy',
    ],
    'Quiz Generator': [
      'Specify topic and difficulty level clearly',
      'Mention number of questions required',
    ],
    'Flashcard Generator': [
      'Provide terms or concepts you want to learn',
      'Request definitions or explanations',
    ],
    'Study Plan Generator': [
      'Include deadlines and time constraints',
      'Add your available study hours per day',
    ],
    'Concept Explainer': [
      'Ask for step-by-step explanations',
      'Request real-world examples',
    ],
    'Code Helper': [
      'Specify programming language clearly',
      'Include error messages if debugging',
    ],
  };
  return tips[toolName] || [
    'Provide clear and specific input',
    'Break down complex requests into steps',
  ];
}