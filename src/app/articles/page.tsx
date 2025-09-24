'use client';

import React, { useState, useEffect } from 'react';
import  Image from 'next/image';  
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
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [error, setError] = useState('');
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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

  const handleArticleClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Safety Articles</h2>
            <p className="text-gray-600">Stay informed about women&apos;s safety</p>
          </div>
          <button
            onClick={loadArticles}
            disabled={isLoadingArticles}
            className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoadingArticles ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Loading State */}
        {isLoadingArticles && (
          <div className="card text-center py-12">
            <div className="spinner mx-auto mb-4" />
            <p className="text-gray-600">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card bg-red-50 border border-red-200 text-red-600 p-4 mb-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <button
              onClick={loadArticles}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Articles List */}
        {!isLoadingArticles && !error && articles.length === 0 && (
          <div className="card text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Available</h3>
            <p className="text-gray-600 mb-4">Unable to load articles at the moment</p>
            <button
              onClick={loadArticles}
              className="btn-primary"
            >
              Refresh
            </button>
          </div>
        )}

        {!isLoading && !error && articles.length > 0 && (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="card card-hover cursor-pointer"
                onClick={() => handleArticleClick(article.url)}
              >
                <div className="flex space-x-4">
                  {/* Article Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      {article.urlToImage ? (
                        <Image
                          src={article.urlToImage}
                          alt={article.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center ${article.urlToImage ? 'hidden' : ''}`}>
                        <Newspaper className="w-8 h-8 text-pink-400" />
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{article.source.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Safety Tips */}
        <div className="mt-8 card bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <h3 className="font-semibold text-gray-900 mb-3">Safety Tips</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Always share your location with trusted contacts</p>
            <p>• Keep emergency numbers saved in your phone</p>
            <p>• Trust your instincts and avoid risky situations</p>
            <p>• Stay aware of your surroundings at all times</p>
            <p>• Keep your phone charged and easily accessible</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
