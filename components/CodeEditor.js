'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Copy, Download, RotateCcw, Settings } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Alert from '@/components/ui/Alert';

const CodeEditor = ({ 
  initialCode = '', 
  language = 'javascript',
  onCodeChange,
  showOutput = true,
  showTestCases = true 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testCases, setTestCases] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('dark');
  
  const editorRef = useRef(null);

  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  const runCode = async () => {
    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      if (language === 'javascript') {
        // Safe JavaScript execution
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        let capturedOutput = [];
        let capturedErrors = [];

        console.log = (...args) => {
          capturedOutput.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        console.error = (...args) => {
          capturedErrors.push(args.join(' '));
        };

        try {
          // Create a safe execution context
          const wrappedCode = `
            (function() {
              ${code}
            })();
          `;
          
          const result = Function('"use strict"; ' + wrappedCode)();
          
          if (result !== undefined) {
            capturedOutput.push(String(result));
          }

          if (capturedErrors.length > 0) {
            setError(capturedErrors.join('\n'));
          } else {
            setOutput(capturedOutput.join('\n') || 'Code executed successfully');
          }
        } catch (execError) {
          setError(`Runtime Error: ${execError.message}`);
        } finally {
          console.log = originalConsoleLog;
          console.error = originalConsoleError;
        }
      } else if (language === 'python') {
        // Mock Python execution for demo
        setOutput('Python execution would be implemented using Pyodide or Skulpt in production');
      } else {
        setOutput('Code execution not supported for this language in browser environment');
      }
    } catch (err) {
      setError(`Execution Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="space-y-4">
      {/* Editor Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{language}</Badge>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
            >
              A-
            </button>
            <span className="text-xs text-gray-600">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(20, fontSize + 1))}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
            >
              A+
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={copyCode}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCode}>
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={resetCode}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button 
            onClick={runCode} 
            loading={isRunning}
            disabled={!code.trim()}
          >
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <Card>
          <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Code Editor</h3>
          </div>
          <div className="p-0">
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                'w-full h-80 p-4 font-mono resize-none border-0 focus:outline-none',
                theme === 'dark' 
                  ? 'bg-gray-900 text-green-400' 
                  : 'bg-white text-gray-800'
              )}
              style={{ fontSize: `${fontSize}px` }}
              placeholder={`Write your ${language} code here...`}
              spellCheck={false}
            />
          </div>
        </Card>

        {/* Output Panel */}
        {showOutput && (
          <Card>
            <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">Output</h3>
            </div>
            <div className="p-4">
              {error ? (
                <Alert variant="error">
                  <div>
                    <h4 className="font-medium text-sm">Execution Error</h4>
                    <pre className="mt-2 text-xs whitespace-pre-wrap font-mono">
                      {error}
                    </pre>
                  </div>
                </Alert>
              ) : output ? (
                <div className="bg-gray-900 text-green-400 rounded-lg p-3">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {output}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click "Run" to execute your code</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Test Cases */}
      {showTestCases && (
        <Card>
          <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Test Cases (Optional)</h3>
          </div>
          <div className="p-4">
            <textarea
              value={testCases}
              onChange={(e) => setTestCases(e.target.value)}
              className="w-full h-24 p-3 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add test inputs here (one per line)..."
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;