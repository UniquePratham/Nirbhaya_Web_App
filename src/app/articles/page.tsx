'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import { TabType, Article } from '@/types';
import { fetchWomenSafetyNews } from '@/utils/news';
import { 
  Newspaper, 
  ExternalLink, 
  Calendar, 
  User, 
  RefreshCw,
  AlertCircle,
  BookOpen,
  Shield,
  TrendingUp,
  Search,
  Filter,
  Heart,
  Share2,
  Clock,
  Eye,
  Star,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const loadArticles = async () => {
    setIsLoadingArticles(true);
    setError('');
    
    try {
      const newsArticles = await fetchWomenSafetyNews();
      setArticles(newsArticles);
    } catch (err) {
      setError('Failed to load articles. Please try again.');
      console.error('Error loading articles:', err);
    } finally {
      setIsLoadingArticles(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth?mode=signin');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleSaveArticle = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const markAsRead = (articleId: string) => {
    setReadArticles(prev => 
      prev.includes(articleId) ? prev : [...prev, articleId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #c56ca1 0%, #c7bacc 50%, #9c6081 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
               style={{ background: 'radial-gradient(circle, #c06e99, transparent)' }}></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
               style={{ background: 'radial-gradient(circle, #b16a91, transparent)' }}></div>
        </div>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading Your Safety Hub</h3>
          <p className="text-white/80">Fetching the latest safety insights...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  const handleArticleClick = (article: Article) => {
    markAsRead(article.id);
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  const safetyTips = [
    { icon: '🛡️', tip: 'Always share your location with trusted contacts', category: 'Location' },
    { icon: '📱', tip: 'Keep emergency numbers saved in your phone', category: 'Emergency' },
    { icon: '👁️', tip: 'Trust your instincts and avoid risky situations', category: 'Awareness' },
    { icon: '🔋', tip: 'Keep your phone charged and easily accessible', category: 'Preparation' },
    { icon: '👥', tip: 'Travel in groups when possible, especially at night', category: 'Travel' },
    { icon: '🚨', tip: 'Learn basic self-defense techniques', category: 'Defense' }
  ];

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="min-h-screen relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #f8f5f7 0%, #f1eef2 50%, #ede8ef 100%)' }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-5 animate-float"
               style={{ background: 'radial-gradient(circle, #c56ca1, transparent)' }}></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-5 animate-float-delay"
               style={{ background: 'radial-gradient(circle, #9c6081, transparent)' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full opacity-5 animate-pulse"
               style={{ background: 'radial-gradient(circle, #b16a91, transparent)' }}></div>
        </div>

        <div className="max-w-md mx-auto p-4 relative z-10">
          {/* Enhanced Header with Stats */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-all duration-300"
                   style={{ background: 'linear-gradient(135deg, #c56ca1, #b16a91)' }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#c56ca1] to-[#9c6081] bg-clip-text text-transparent mb-2">
                Safety Articles
              </h1>
              <p className="text-[#6c636c] font-medium">Stay informed, stay empowered</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-[#c56ca1] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#9c6081]">{articles.length}</div>
                  <div className="text-xs text-[#6c636c] font-medium">Articles</div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <Eye className="w-6 h-6 text-[#c06e99] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#9c6081]">{readArticles.length}</div>
                  <div className="text-xs text-[#6c636c] font-medium">Read</div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <Bookmark className="w-6 h-6 text-[#b16a91] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#9c6081]">{savedArticles.length}</div>
                  <div className="text-xs text-[#6c636c] font-medium">Saved</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search and Filter */}
            <div className="space-y-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6c636c] group-focus-within:text-[#c56ca1] transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search safety articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c56ca1]/50 focus:border-[#c56ca1] transition-all duration-300 placeholder:text-[#6c636c]/60 font-medium"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={loadArticles}
                  disabled={isLoadingArticles}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#c56ca1] to-[#b16a91] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingArticles ? 'animate-spin' : ''}`} />
                  <span className="font-medium">Refresh</span>
                </button>

                <div className="text-sm text-[#6c636c] font-medium">
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingArticles && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl text-center animate-fade-in">
              <div className="w-12 h-12 border-4 border-[#c56ca1]/20 border-t-[#c56ca1] rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-lg font-semibold text-[#9c6081] mb-2">Loading Articles</h3>
              <p className="text-[#6c636c]">Fetching the latest safety insights...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-3xl p-6 mb-6 shadow-lg animate-slide-in">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-800 mb-2">Unable to Load Articles</h4>
                  <p className="text-red-600 text-sm mb-3">{error}</p>
                  <button
                    onClick={loadArticles}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoadingArticles && !error && filteredArticles.length === 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/30 shadow-2xl text-center animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#c56ca1]/10 to-[#b16a91]/10 flex items-center justify-center">
                <Newspaper className="w-12 h-12 text-[#c56ca1]" />
              </div>
              <h3 className="text-xl font-bold text-[#9c6081] mb-3">No Articles Found</h3>
              <p className="text-[#6c636c] mb-6">
                {searchTerm ? `No articles match "${searchTerm}"` : 'No articles available at the moment'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  loadArticles();
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#c56ca1] to-[#b16a91] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:scale-105"
              >
                {searchTerm ? 'Clear Search' : 'Refresh Articles'}
              </button>
            </div>
          )}

          {/* Articles List */}
          {!isLoadingArticles && !error && filteredArticles.length > 0 && (
            <div className="space-y-6 mb-8">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="p-6">
                    <div className="flex space-x-4">
                      {/* Enhanced Article Image */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                          {article.urlToImage ? (
                            <Image
                              src={article.urlToImage}
                              alt={article.title}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full bg-gradient-to-br from-[#c56ca1]/20 to-[#b16a91]/20 flex items-center justify-center ${article.urlToImage ? 'hidden' : ''}`}>
                            <Newspaper className="w-8 h-8 text-[#c56ca1]" />
                          </div>
                        </div>
                        
                        {/* Read indicator */}
                        {readArticles.includes(article.id) && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#c06e99] to-[#b16a91] rounded-full flex items-center justify-center shadow-lg">
                            <Eye className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Enhanced Article Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-[#9c6081] line-clamp-2 group-hover:text-[#c56ca1] transition-colors duration-300 leading-tight">
                            {article.title}
                          </h3>
                          <button
                            onClick={(e) => toggleSaveArticle(article.id, e)}
                            className="ml-2 p-1 rounded-lg hover:bg-[#c56ca1]/10 transition-colors duration-200 flex-shrink-0"
                          >
                            <Bookmark className={`w-4 h-4 transition-colors duration-200 ${
                              savedArticles.includes(article.id) 
                                ? 'text-[#c56ca1] fill-current' 
                                : 'text-[#6c636c] hover:text-[#c56ca1]'
                            }`} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-[#6c636c] line-clamp-2 mb-4 leading-relaxed">
                          {article.description}
                        </p>
                        
                        {/* Enhanced Metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1 text-[#6c636c]">
                              <User className="w-3 h-3" />
                              <span className="font-medium">{article.source.name}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-[#6c636c]">
                              <Clock className="w-3 h-3" />
                              <span>{getTimeAgo(article.publishedAt)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-xs text-[#c56ca1] font-medium">Read more</span>
                              <ChevronRight className="w-4 h-4 text-[#c56ca1] transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c56ca1]/0 to-[#b16a91]/0 group-hover:from-[#c56ca1]/5 group-hover:to-[#b16a91]/5 transition-all duration-500 pointer-events-none rounded-3xl"></div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Safety Tips */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl p-6 mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c56ca1]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#c56ca1] to-[#b16a91] flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#9c6081]">Essential Safety Tips</h3>
                  <p className="text-sm text-[#6c636c]">Your safety toolkit</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                {safetyTips.map((tip, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {tip.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#c56ca1] bg-[#c56ca1]/10 px-2 py-1 rounded-lg">
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-sm text-[#6c636c] font-medium leading-relaxed">
                        {tip.tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#c56ca1] to-[#b16a91] rounded-3xl p-6 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-bold text-white mb-2">Stay Connected</h3>
            <p className="text-white/90 text-sm mb-4">
              Join our community for the latest safety updates and tips
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium">
                Subscribe
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </AppLayout>
  );
}