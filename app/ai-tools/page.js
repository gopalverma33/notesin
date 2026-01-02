


"use client";

import { useState } from "react";
import { 
  Sparkles, FileText, HelpCircle, Layers, Calendar, 
  BookOpen, Zap, GraduationCap, ArrowRight, Users, Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AiToolsDashboard() {
  // Only the most used tools as before
  const tools = [
    {
      id: "summarizer",
      name: "Text Summarizer",
      type: "Content Optimization",
      icon: FileText,
      description: "Transform lengthy texts into concise, key point summaries",
      gradient: "from-blue-500 to-cyan-500",
      emoji: "📝",
      usage: "12.5K uses",
      rating: "4.8"
    },
    {
      id: "quiz",
      name: "Quiz Generator",
      type: "Assessment Tool",
      icon: HelpCircle,
      description: "Create engaging quizzes and tests from any subject",
      gradient: "from-green-500 to-emerald-500",
      emoji: "❓",
      usage: "8.7K uses",
      rating: "4.7"
    },
    {
      id: "flashcards",
      name: "Flashcard Generator",
      type: "Study Aid",
      icon: Layers,
      description: "Generate effective flashcards for better memorization",
      gradient: "from-purple-500 to-violet-500",
      emoji: "🎴",
      usage: "15.2K uses",
      rating: "4.9"
    },
    {
      id: "studyplan",
      name: "Study Plan Generator",
      type: "Planning Tool",
      icon: Calendar,
      description: "Create personalized study schedules and roadmaps",
      gradient: "from-orange-500 to-amber-500",
      emoji: "📅",
      usage: "6.3K uses",
      rating: "4.6"
    },
    {
      id: "explainer",
      name: "Concept Explainer",
      type: "Learning Assistant",
      icon: BookOpen,
      description: "Simplify complex topics with clear explanations",
      gradient: "from-red-500 to-pink-500",
      emoji: "📚",
      usage: "18.9K uses",
      rating: "4.8"
    },
    {
      id: "codehelper",
      name: "Code Helper",
      type: "Programming Aid",
      icon: Zap,
      description: "Get intelligent coding assistance and debugging",
      gradient: "from-yellow-500 to-orange-500",
      emoji: "💻",
      usage: "22.1K uses",
      rating: "4.9"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl mb-4">
          <GraduationCap className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Study Tools</h1>
          <Sparkles className="h-6 w-6 text-yellow-300" />
        </div>
        <p className="text-lg text-gray-600">
          Choose any tool below to open its dedicated workspace
        </p>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            
            return (
              <Link key={tool.id} href={`/ai-tools/${tool.id}`}>
                <Card className="group cursor-pointer h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-r ${tool.gradient} p-3 rounded-xl shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {tool.type}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {tool.emoji} {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">{tool.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tool.usage}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {tool.rating}
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold text-sm">Open Tool</span>
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}