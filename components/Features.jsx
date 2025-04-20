import { BookOpen, Brain, FileText, MessageCircle, PenTool, BarChart2 } from 'lucide-react';

const features = [
    {
        name: "Intelligent Content Analysis",
        description: "Our AI analyzes your uploaded study materials to understand key concepts and learning objectives.",
        icon: BookOpen
    },
    {
        name: "AI Chat Support",
        description: "Get instant, contextual help from our AI assistant that understands your specific course materials.",
        icon: MessageCircle
    },
    {
        name: "Adaptive Exercise Generation",
        description: "Practice with questions tailored to your level and curriculum that adapt as you improve.",
        icon: PenTool
    },
    {
        name: "Exam Simulation",
        description: "Experience full-length practice exams that mimic real test conditions and question styles.",
        icon: FileText
    },
    {
        name: "Personalized Learning",
        description: "Receive customized explanations and summaries of key concepts based on your learning style.",
        icon: Brain
    },
    {
        name: "Progress Tracking",
        description: "Monitor your improvement with detailed analytics and targeted recommendations.",
        icon: BarChart2
    }
];

export default function Features() {
    return (
        <div className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        AI-Powered Features That Transform Your Study Experience
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        StudyBuddy AI combines advanced artificial intelligence with educational expertise to create a truly personalized learning platform.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 rounded-md bg-indigo-500 text-white flex items-center justify-center">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mt-6 text-xl font-medium text-gray-900">{feature.name}</h3>
                            <p className="mt-2 text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
