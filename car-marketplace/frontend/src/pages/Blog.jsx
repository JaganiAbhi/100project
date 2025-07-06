import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Search, 
  Filter, 
  ChevronRight, 
  Eye, 
  Heart, 
  Share2,
  TrendingUp,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState(null);

  const categories = [
    'Reviews',
    'Electric Vehicles',
    'Luxury Cars',
    'Car Maintenance',
    'Industry News',
    'Technology',
    'Racing',
    'Car Culture'
  ];

  useEffect(() => {
    // Mock blog posts data
    const mockPosts = [
      {
        id: 1,
        title: 'The Future of Electric Luxury: BMW iX vs Mercedes EQS',
        excerpt: 'A comprehensive comparison of two flagship electric luxury vehicles that are reshaping the automotive landscape.',
        content: 'In the rapidly evolving world of electric vehicles, luxury manufacturers are pushing boundaries...',
        category: 'Electric Vehicles',
        author: 'David Chen',
        publishedAt: '2024-01-15',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop',
        views: 2340,
        likes: 156,
        featured: true,
        tags: ['BMW', 'Mercedes', 'Electric', 'Luxury', 'Comparison']
      },
      {
        id: 2,
        title: 'Porsche 911 Turbo S: Engineering Perfection',
        excerpt: 'An in-depth look at what makes the 911 Turbo S one of the most celebrated sports cars of all time.',
        content: 'The Porsche 911 has been the benchmark for sports cars for decades...',
        category: 'Reviews',
        author: 'Sarah Mitchell',
        publishedAt: '2024-01-12',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=800&auto=format&fit=crop',
        views: 1890,
        likes: 203,
        featured: false,
        tags: ['Porsche', '911', 'Sports Car', 'Performance']
      },
      {
        id: 3,
        title: 'Essential Car Maintenance Tips for Winter',
        excerpt: 'Keep your vehicle running smoothly during the cold months with these expert maintenance tips.',
        content: 'Winter can be harsh on vehicles, but proper maintenance can prevent costly repairs...',
        category: 'Car Maintenance',
        author: 'Mike Rodriguez',
        publishedAt: '2024-01-10',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop',
        views: 3210,
        likes: 287,
        featured: false,
        tags: ['Maintenance', 'Winter', 'Tips', 'Care']
      },
      {
        id: 4,
        title: 'The Rise of Autonomous Driving Technology',
        excerpt: 'Exploring the latest developments in self-driving cars and what they mean for the future of transportation.',
        content: 'Autonomous driving technology has made significant strides in recent years...',
        category: 'Technology',
        author: 'Emma Thompson',
        publishedAt: '2024-01-08',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
        views: 4150,
        likes: 342,
        featured: false,
        tags: ['Autonomous', 'Technology', 'Future', 'AI']
      },
      {
        id: 5,
        title: 'Ferrari SF90 Stradale: When Hybrid Meets Supercar',
        excerpt: 'Ferrari\'s first plug-in hybrid supercar represents a new era for the iconic Italian brand.',
        content: 'The Ferrari SF90 Stradale marks a significant milestone in Ferrari\'s history...',
        category: 'Luxury Cars',
        author: 'Antonio Rossi',
        publishedAt: '2024-01-05',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop',
        views: 2890,
        likes: 231,
        featured: false,
        tags: ['Ferrari', 'Hybrid', 'Supercar', 'Performance']
      },
      {
        id: 6,
        title: 'Formula 1 Technology Making Its Way to Road Cars',
        excerpt: 'Discover how cutting-edge F1 technology is being adapted for everyday luxury vehicles.',
        content: 'Formula 1 has always been a testing ground for automotive innovation...',
        category: 'Racing',
        author: 'James Walker',
        publishedAt: '2024-01-03',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop',
        views: 1670,
        likes: 189,
        featured: false,
        tags: ['Formula 1', 'Technology', 'Innovation', 'Racing']
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setFeaturedPost(mockPosts.find(post => post.featured));
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-luxury-navy font-medium">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <div className="bg-luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              LuxeCars Blog
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Stay updated with the latest in automotive excellence, industry insights, and luxury car culture.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-luxury-gold" />
              <span className="text-luxury-gold font-semibold">Featured Article</span>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredPost.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-luxury-navy mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${featuredPost.author}&background=D4A574&color=fff`}
                        alt={featuredPost.author}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{featuredPost.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{featuredPost.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="bg-luxury-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold w-full sm:w-80"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredPosts.length} articles found
              </span>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-luxury-gold hover:text-luxury-gold/80 transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden blog-card">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-luxury-navy/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                    <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                      <Share2 className="h-4 w-4 text-gray-600 hover:text-luxury-gold" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-luxury-navy mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-luxury-cream text-luxury-navy px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${post.author}&background=D4A574&color=fff`}
                        alt={post.author}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-luxury-gold hover:text-luxury-gold/80 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing filters.
            </p>
            <button
              onClick={clearFilters}
              className="bg-luxury-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-luxury-gradient text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest automotive insights, luxury car reviews, and industry news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-luxury-navy px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;