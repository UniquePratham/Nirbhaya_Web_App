import { Article } from '@/types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'your-api-key-here';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export const fetchWomenSafetyNews = async (): Promise<Article[]> => {
  try {
    const query = 'women safety OR women security OR domestic violence OR sexual harassment OR women rights OR gender violence';
    const response = await fetch(
      `${NEWS_API_URL}?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`News API error: ${data.message}`);
    }

    return data.articles.map((article: {
      title?: string;
      description?: string;
      url?: string;
      urlToImage?: string;
      publishedAt?: string;
      source?: { name?: string };
    }, index: number) => ({
      id: `article-${index}`,
      title: article.title || 'No title available',
      description: article.description || 'No description available',
      url: article.url || '#',
      urlToImage: article.urlToImage || '/placeholder-news.svg',
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        name: article.source?.name || 'Unknown Source',
      },
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Return mock data if API fails
    return getMockNewsData();
  }
};

const getMockNewsData = (): Article[] => [
  {
    id: 'mock-1',
    title: 'Women Safety: New Initiatives Launched Across Major Cities',
    description: 'Government announces new safety measures and helpline numbers for women in urban areas.',
    url: '#',
    urlToImage: '/placeholder-news.svg',
    publishedAt: new Date().toISOString(),
    source: { name: 'Safety News' },
  },
  {
    id: 'mock-2',
    title: 'Self-Defense Training Programs Show Positive Results',
    description: 'Community-based self-defense programs are helping women feel more confident and secure.',
    url: '#',
    urlToImage: '/placeholder-news.svg',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: { name: 'Community Safety' },
  },
  {
    id: 'mock-3',
    title: 'Technology Solutions for Women\'s Safety on the Rise',
    description: 'Mobile apps and wearable devices are becoming popular tools for personal safety.',
    url: '#',
    urlToImage: '/placeholder-news.svg',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: { name: 'Tech Safety' },
  },
  {
    id: 'mock-4',
    title: 'Legal Reforms Strengthen Women\'s Rights Protection',
    description: 'New legislation provides better protection and faster justice for women facing violence.',
    url: '#',
    urlToImage: '/placeholder-news.svg',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    source: { name: 'Legal News' },
  },
  {
    id: 'mock-5',
    title: 'Community Watch Programs Enhance Neighborhood Safety',
    description: 'Local communities are coming together to create safer environments for women and children.',
    url: '#',
    urlToImage: '/placeholder-news.svg',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    source: { name: 'Community News' },
  },
];
