"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Upload, CheckCircle, XCircle } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

export default function DocsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([
    { id: '', title: '', content: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const addDocument = () => {
    setDocuments([...documents, { id: '', title: '', content: '' }]);
  };

  const removeDocument = (index: number) => {
    if (documents.length > 1) {
      setDocuments(documents.filter((_, i) => i !== index));
    }
  };

  const updateDocument = (index: number, field: keyof Document, value: string) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const handleSubmit = async () => {
    setMessage(null);

    // Validate
    const hasEmpty = documents.some(doc => !doc.id || !doc.title || !doc.content);
    if (hasEmpty) {
      setMessage({ type: 'error', text: 'Please fill in all fields for each document.' });
      return;
    }

    setLoading(true);

    const INGEST_ENDPOINT = process.env.NEXT_PUBLIC_INGEST_ENDPOINT || '';
    try {
      const response = await fetch(INGEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documents),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Documents uploaded successfully!' });
        setDocuments([{ id: '', title: '', content: '' }]);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to upload documents.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add Documents</h1>
          <p className="text-gray-600">Upload documents to your knowledge base</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
              }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Documents */}
        <div className="space-y-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 relative"
            >
              {/* Remove button */}
              {documents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document ID
                  </label>
                  <input
                    type="text"
                    value={doc.id}
                    onChange={(e) => updateDocument(index, 'id', e.target.value)}
                    placeholder="e.g., doc_id"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={doc.title}
                    onChange={(e) => updateDocument(index, 'title', e.target.value)}
                    placeholder="Document title"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={doc.content}
                    onChange={(e) => updateDocument(index, 'content', e.target.value)}
                    placeholder="Document content..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y text-gray-900"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addDocument}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border border-gray-300 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Add Another Document</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              <span>{loading ? 'Uploading...' : 'Upload Documents'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
