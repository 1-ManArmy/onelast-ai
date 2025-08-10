'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Search, 
  MessageSquare, 
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Brain,
  Globe,
  Database,
  Trash2,
  BookOpen,
  Loader2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { GlassCard, ModernButton, FeatureCard, StatCard, TestimonialCard } from '@/components/ui/ModernComponents';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

interface UploadedPDF {
  id: string;
  name: string;
  size: string;
  pages: number;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  preview?: string;
  embedding_status?: 'pending' | 'completed' | 'failed';
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  sources?: string[];
  confidence?: number;
}

interface SearchResult {
  id: string;
  document: string;
  page: number;
  excerpt: string;
  relevance: number;
}

const PDFMindPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'chat' | 'library' | 'search'>('upload');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedPDFs, setUploadedPDFs] = useState<UploadedPDF[]>([
    {
      id: '1',
      name: 'Annual Report 2024.pdf',
      size: '2.3 MB',
      pages: 45,
      uploadDate: '2024-07-30',
      status: 'ready',
      embedding_status: 'completed'
    },
    {
      id: '2', 
      name: 'Research Paper - AI Trends.pdf',
      size: '1.8 MB',
      pages: 28,
      uploadDate: '2024-07-29',
      status: 'ready',
      embedding_status: 'completed'
    },
    {
      id: '3',
      name: 'Technical Specification.pdf',
      size: '3.1 MB', 
      pages: 67,
      uploadDate: '2024-07-28',
      status: 'processing',
      embedding_status: 'pending'
    }
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: 'Hello! I\'ve analyzed your PDF library. You can now ask me questions about any of your uploaded documents. What would you like to know?',
      timestamp: '10:30 AM',
      confidence: 100
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
    setSelectedFiles(files);
    if (files.length > 0) {
      handleMultipleUpload(files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    if (files.length > 0) {
      handleMultipleUpload(files);
    }
  };

  const handleMultipleUpload = async (files: File[]) => {
    setIsProcessing(true);
    
    for (const file of files) {
      const newPDF: UploadedPDF = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        pages: Math.floor(Math.random() * 50) + 10, // Simulated
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing',
        embedding_status: 'pending'
      };
      
      setUploadedPDFs(prev => [...prev, newPDF]);
      
      // Simulate processing
      setTimeout(() => {
        setUploadedPDFs(prev => 
          prev.map(pdf => 
            pdf.id === newPDF.id 
              ? { ...pdf, status: 'ready', embedding_status: 'completed' }
              : pdf
          )
        );
      }, 3000 + Math.random() * 2000);
    }
    
    setIsProcessing(false);
    setSelectedFiles([]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    const messageToProcess = currentMessage;
    setCurrentMessage('');
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: `Based on your uploaded documents, I found relevant information about "${messageToProcess}". The annual report shows a 23% increase in revenue, while the research paper discusses emerging AI trends that align with your query. Would you like me to provide more specific details from any particular document?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['Annual Report 2024.pdf', 'Research Paper - AI Trends.pdf'],
        confidence: 87
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate search results
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          document: 'Annual Report 2024.pdf',
          page: 15,
          excerpt: `...quarterly revenue increased by 23% compared to the previous year, driven by strong performance in the AI sector and expanded market reach...`,
          relevance: 95
        },
        {
          id: '2',
          document: 'Research Paper - AI Trends.pdf',
          page: 8,
          excerpt: `...artificial intelligence technologies are transforming industries at an unprecedented pace, with machine learning algorithms becoming more sophisticated...`,
          relevance: 89
        },
        {
          id: '3',
          document: 'Technical Specification.pdf',
          page: 23,
          excerpt: `...the system architecture supports scalable processing of large datasets with real-time analytics capabilities...`,
          relevance: 76
        }
      ];
      
      setSearchResults(mockResults);
      setIsProcessing(false);
    }, 1000);
  };

  const deletePDF = (id: string) => {
    setUploadedPDFs(prev => prev.filter(pdf => pdf.id !== id));
  };

  const demoFeatures = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Vector Embeddings",
      description: "FAISS-powered semantic search across all your documents",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "LangChain Integration", 
      description: "Advanced document Q&A with context-aware responses",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Multi-PDF Search",
      description: "Search across multiple documents simultaneously",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Intelligent Chat",
      description: "Chat with your PDFs like talking to a knowledge expert",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Documents Processed", value: "50K+", icon: <FileText className="h-5 w-5" /> },
    { label: "Average Accuracy", value: "94%", icon: <CheckCircle className="h-5 w-5" /> },
    { label: "Processing Speed", value: "3.2s", icon: <Zap className="h-5 w-5" /> },
    { label: "Languages Supported", value: "25+", icon: <Globe className="h-5 w-5" /> }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Research Director",
      content: "PDFMind transformed how our team handles research papers. The semantic search is incredibly accurate.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Legal Counsel",
      content: "Analyzing contracts and legal documents is now 10x faster. The Q&A feature is phenomenal.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "Data Analyst",
      content: "The multi-document search capabilities are exactly what we needed for our compliance reports.",
      rating: 5,
      avatar: "ET"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <FileText className="h-4 w-4 mr-2" />
              PDFs that talk back
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                PDFMind
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-300">
                Talk to Your Files
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Upload a stack of PDFs, ask questions, get answers. Uses LangChain + Vector Store (FAISS) 
              for fast, smart Q&A. Transform your document library into an intelligent knowledge base.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <ModernButton
                onClick={() => setActiveTab('upload')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg"
              >
                <Upload className="h-5 w-5 mr-2" />
                Start Uploading
              </ModernButton>
              
              <ModernButton
                onClick={() => setActiveTab('chat')}
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Try Demo Chat
              </ModernButton>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
            {[
              { id: 'upload', label: 'Upload & Process', icon: Upload },
              { id: 'chat', label: 'AI Chat', icon: MessageSquare },
              { id: 'search', label: 'Vector Search', icon: Search },
              { id: 'library', label: 'Document Library', icon: BookOpen }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-8">
                  <div className="text-center mb-8">
                    <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Upload Your PDFs</h3>
                    <p className="text-gray-300">Drag & drop multiple PDFs or click to select files</p>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                      isDragOver
                        ? 'border-purple-400 bg-purple-400/10'
                        : 'border-gray-600 hover:border-purple-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-300 mb-2">
                      Drop your PDFs here or <span className="text-purple-400 cursor-pointer">browse files</span>
                    </p>
                    <p className="text-sm text-gray-500">Supports multiple PDFs up to 50MB each</p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Selected Files:</h4>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-purple-400 mr-3" />
                              <span className="text-white">{file.name}</span>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {(file.size / (1024 * 1024)).toFixed(1)} MB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <MessageSquare className="h-6 w-6 mr-2 text-purple-400" />
                      AI Chat Interface
                    </h3>
                    <div className="text-sm text-gray-400">
                      {uploadedPDFs.filter(pdf => pdf.status === 'ready').length} documents ready
                    </div>
                  </div>

                  <div className="h-96 overflow-y-auto bg-black/20 rounded-xl p-4 mb-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-white/10 text-gray-100'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          {message.sources && (
                            <div className="mt-2 text-xs opacity-75">
                              <p>Sources: {message.sources.join(', ')}</p>
                              {message.confidence && (
                                <p>Confidence: {message.confidence}%</p>
                              )}
                            </div>
                          )}
                          <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 px-4 py-2 rounded-2xl">
                          <div className="flex items-center text-gray-300">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            AI is thinking...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask questions about your documents..."
                      className="flex-1 bg-white/10 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      disabled={isProcessing}
                    />
                    <ModernButton
                      onClick={handleSendMessage}
                      disabled={isProcessing || !currentMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </ModernButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Search className="h-6 w-6 mr-2 text-purple-400" />
                      Vector Search
                    </h3>
                    <div className="text-sm text-gray-400">
                      FAISS-powered semantic search
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search across all your documents..."
                      className="flex-1 bg-white/10 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    />
                    <ModernButton
                      onClick={handleSearch}
                      disabled={isProcessing || !searchQuery.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6"
                    >
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </ModernButton>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Search Results:</h4>
                      {searchResults.map((result) => (
                        <div key={result.id} className="bg-white/5 rounded-xl p-4 border border-gray-700 hover:border-purple-400 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-purple-400 mr-2" />
                              <span className="text-white font-medium">{result.document}</span>
                              <span className="text-gray-400 text-sm ml-2">Page {result.page}</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                result.relevance >= 90 ? 'bg-green-500/20 text-green-400' :
                                result.relevance >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {result.relevance}% match
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{result.excerpt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {activeTab === 'library' && (
              <motion.div
                key="library"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <BookOpen className="h-6 w-6 mr-2 text-purple-400" />
                      Document Library
                    </h3>
                    <div className="text-sm text-gray-400">
                      {uploadedPDFs.length} documents uploaded
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {uploadedPDFs.map((pdf) => (
                      <div key={pdf.id} className="bg-white/5 rounded-xl p-4 border border-gray-700 hover:border-purple-400 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                              <h4 className="text-white font-medium">{pdf.name}</h4>
                              <p className="text-gray-400 text-sm">
                                {pdf.size} • {pdf.pages} pages • Uploaded {pdf.uploadDate}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              pdf.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                              pdf.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {pdf.status === 'ready' ? '✓ Ready' : 
                               pdf.status === 'processing' ? '⏳ Processing' : '✗ Error'}
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              pdf.embedding_status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                              pdf.embedding_status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {pdf.embedding_status === 'completed' ? '🧠 Embedded' :
                               pdf.embedding_status === 'pending' ? '⏳ Embedding' : '✗ Failed'}
                            </div>
                            
                            <button
                              onClick={() => deletePDF(pdf.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced PDF Intelligence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge AI technologies for maximum accuracy and speed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">System Architecture</h3>
              <p className="text-gray-300">Built with industry-leading technologies</p>
            </div>
            
            <div className="bg-black/40 rounded-2xl p-8 font-mono text-sm">
              <div className="text-green-400 mb-4"># PDFMind Architecture Overview</div>
              <div className="text-gray-300 space-y-2">
                <div>📚 <span className="text-purple-400">PDFMind/</span></div>
                <div>├── <span className="text-blue-400">app/</span></div>
                <div>│   ├── interface.py         <span className="text-gray-500"># Streamlit UI</span></div>
                <div>│   ├── pdf_reader.py       <span className="text-gray-500"># PyPDF2 + OCR</span></div>
                <div>│   └── vector_engine.py    <span className="text-gray-500"># FAISS embeddings</span></div>
                <div>├── <span className="text-blue-400">uploads/</span></div>
                <div>│   └── sample_docs/        <span className="text-gray-500"># PDF storage</span></div>
                <div>├── <span className="text-blue-400">storage/</span></div>
                <div>│   ├── faiss_index/        <span className="text-gray-500"># Vector database</span></div>
                <div>│   └── embeddings/         <span className="text-gray-500"># Cached vectors</span></div>
                <div>├── <span className="text-blue-400">config/</span></div>
                <div>│   └── settings.yaml       <span className="text-gray-500"># Configuration</span></div>
                <div>├── app.py                  <span className="text-gray-500"># Main application</span></div>
                <div>├── requirements.txt       <span className="text-gray-500"># Dependencies</span></div>
                <div>└── README.md              <span className="text-gray-500"># Documentation</span></div>
                <div className="mt-4 text-yellow-400"># Technologies: LangChain + FAISS + Streamlit + OpenAI</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-gray-300">
              See what our users say about PDFMind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your PDFs?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of professionals who use PDFMind for intelligent document analysis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ModernButton
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Free Trial
              </ModernButton>
              
              <ModernButton
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </ModernButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer variant="dark" />

      {/* Subscription Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <SubscriptionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            service="PDFMind"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PDFMindPage;
