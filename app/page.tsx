"use client"

import { useRouter } from 'next/navigation';
import { FileText, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              DocuChat
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              AI-Powered Document Q&A
            </p>
          </div>
          <p className="text-gray-600 text-lg">
            Upload your documents and ask questions
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/docs')}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200 group cursor-pointer"
          >
            <FileText className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Add Documents</span>
          </button>

          <button
            onClick={() => router.push('/ask')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Ask AI</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your intelligent document assistant
          </p>
        </div>
      </div>
    </div>
  );
}
