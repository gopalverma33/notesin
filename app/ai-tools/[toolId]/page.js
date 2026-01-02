// app/ai-tools/[toolId]/page.js (Server Component)
import ToolClient from "./ToolClient";

// ✅ Centralized tool configurations
const tools = {
  summarizer: {
    id: "summarizer",
    name: "Text Summarizer",
    gradient: "from-blue-500 to-cyan-500",
    placeholder: "Paste any text to get a smart summary...",
    description: "Transform lengthy texts into concise, key point summaries",
    prompt: "Summarize the following text clearly and concisely:",
  },
  quiz: {
    id: "quiz",
    name: "Quiz Generator",
    gradient: "from-green-500 to-emerald-500",
    placeholder: "Enter a topic like 'World War II' or 'Photosynthesis'...",
    description: "Create engaging quizzes and tests from any subject",
    prompt: "Generate a quiz from this topic:",
  },
  flashcards: {
    id: "flashcards",
    name: "Flashcard Generator",
    gradient: "from-purple-500 to-violet-500",
    placeholder: "What subject do you want flashcards for?",
    description: "Generate effective flashcards for better memorization",
    prompt: "Create flashcards for this subject:",
  },
  studyplan: {
    id: "studyplan",
    name: "Study Plan Generator",
    gradient: "from-orange-500 to-amber-500",
    placeholder: "Describe your goals: 'Learn Python in 2 weeks'...",
    description: "Create personalized study schedules and roadmaps",
    prompt: "Create a study plan based on this info:",
  },
  explainer: {
    id: "explainer",
    name: "Concept Explainer",
    gradient: "from-red-500 to-pink-500",
    placeholder: "Ask about any complex concept...",
    description: "Simplify complex topics with clear explanations",
    prompt: "Explain this concept in simple terms:",
  },
  codehelper: {
    id: "codehelper",
    name: "Code Helper",
    gradient: "from-yellow-500 to-orange-500",
    placeholder: "Need help with code? Ask away!",
    description: "Get intelligent coding assistance and debugging",
    prompt: "Assist with coding, debugging, or explaining code:",
  },
};

// ✅ Generate static params for all tool routes
export async function generateStaticParams() {
  return Object.keys(tools).map((id) => ({ toolId: id }));
}

export default async function ToolPage({ params }) {
  const { toolId } = await params;
  const tool = tools[toolId] || tools.summarizer;
  
  return <ToolClient tool={tool} />;
}