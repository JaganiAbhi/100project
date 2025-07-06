import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, Heart, Eye, Calendar, Fuel, Users, Gauge, DollarSign } from 'lucide-react';

const CarCategories = () => {
  const { brand } = useParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(brand || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [fuelType, setFuelType] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Porsche', 'Lexus', 'Ferrari', 'Lamborghini'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

  useEffect(() => {
    // Mock car data
    const mockCars = [
      {
        id: 1,
        name: 'BMW M5 Competition',
        brand: 'BMW',
        price: 105000,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: 2024,
        mileage: 15,
        fuelType: 'Gasoline',
        seats: 5,
        rating: 4.8,
        features: ['All-Wheel Drive', 'Luxury Package', 'Sport Mode'],
        description: 'The BMW M5 Competition delivers exceptional performance with its twin-turbo V8 engine.'
      },
      {
        id: 2,
        name: 'Mercedes-AMG GT 63 S',
        brand: 'Mercedes-Benz',
        price: 158000,
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: 2024,
        mileage: 12,
        fuelType: 'Gasoline',
        seats: 4,
        rating: 4.9,
        features: ['Carbon Fiber Package', 'AMG Track Package', 'Premium Audio'],
        description: 'Experience the pinnacle of Mercedes-AMG engineering with this high-performance GT.'
      },
      {
        id: 3,
        name: 'Audi RS7 Sportback',
        brand: 'Audi',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: 2024,
        mileage: 18,
        fuelType: 'Gasoline',
        seats: 5,
        rating: 4.7,
        features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen'],
        description: 'The Audi RS7 Sportback combines luxury with breathtaking performance.'
      },
      {
        id: 4,
        name: 'Tesla Model S Plaid',
        brand: 'Tesla',
        price: 135000,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: 2024,
        mileage: 120,
        fuelType: 'Electric',
        seats: 5,
        rating: 4.8,
        features: ['Autopilot', 'Ludicrous Mode', 'Full Self-Driving'],
        description: 'Revolutionary electric performance with cutting-edge technology.'
      },
      {
        id: 5,
        name: 'Porsche 911 Turbo S',
        brand: 'Porsche',
        price: 207000,
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: 2024,
        mileage: 16,
        fuelType: 'Gasoline',
        seats: 4,
        rating: 4.9,
        features: ['Sport Chrono', 'Ceramic Brakes', 'Active Suspension'],
        description: 'The ultimate sports car experience with iconic Porsche design.'
      },
      {
        id: 6,
        name: 'Lexus LS 500h',
        brand: 'Lexus',
        price: 76000,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: 2024,
        mileage: 28,
        fuelType: 'Hybrid',
        seats: 5,
        rating: 4.6,
        features: ['Luxury Package', 'Mark Levinson Audio', 'Hybrid Power'],
        description: 'Luxury redefined with hybrid efficiency and exceptional comfort.'
      }
    ];

    setTimeout(() => {
      setCars(mockCars);
      setFilteredCars(mockCars);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = cars;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter(car => car.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(car => car.price <= parseInt(priceRange.max));
    }

    // Filter by year range
    if (yearRange.min) {
      filtered = filtered.filter(car => car.year >= parseInt(yearRange.min));
    }
    if (yearRange.max) {
      filtered = filtered.filter(car => car.year <= parseInt(yearRange.max));
    }

    // Filter by fuel type
    if (fuelType) {
      filtered = filtered.filter(car => car.fuelType === fuelType);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCars(filtered);
  }, [cars, searchTerm, selectedBrand, priceRange, yearRange, fuelType, sortBy, sortOrder]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
    setFuelType('');
    setSortBy('name');
    setSortOrder('asc');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-luxury-navy font-medium">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-luxury font-bold text-luxury-navy mb-4">
              {selectedBrand ? `${selectedBrand} Collection` : 'Car Categories'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of luxury vehicles from the world's finest manufacturers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-luxury-navy">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-luxury-gold hover:text-luxury-gold/80 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search cars..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    placeholder="Min"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    placeholder="Max"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                  />
                </div>
              </div>

              {/* Year Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={yearRange.min}
                    onChange={(e) => setYearRange({...yearRange, min: e.target.value})}
                    placeholder="Min"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                  />
                  <input
                    type="number"
                    value={yearRange.max}
                    onChange={(e) => setYearRange({...yearRange, max: e.target.value})}
                    placeholder="Max"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                  />
                </div>
              </div>

              {/* Fuel Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                >
                  <option value="">All Types</option>
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredCars.length} cars found
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="year">Year</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                  
                  {/* View Mode */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-luxury-gold text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-luxury-gold text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cars Grid/List */}
            {filteredCars.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredCars.map((car) => (
                  <div key={car.id} className={`bg-white rounded-2xl shadow-sm overflow-hidden car-card-hover ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                      <img
                        src={car.image}
                        alt={car.name}
                        className={`object-cover ${
                          viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                        }`}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="price-tag">
                          {formatPrice(car.price)}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-luxury-navy">{car.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{car.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{car.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-4 w-4" />
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Gauge className="h-4 w-4" />
                          <span>{car.mileage} {car.fuelType === 'Electric' ? 'mi' : 'MPG'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{car.seats} Seats</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="feature-badge">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/car/${car.id}`}
                          className="flex-1 bg-luxury-gradient text-white py-2 px-4 rounded-lg font-medium text-center hover:opacity-90 transition-opacity"
                        >
                          View Details
                        </Link>
                        <button className="p-2 border border-luxury-gold text-luxury-gold rounded-lg hover:bg-luxury-gold hover:text-white transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No cars found</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCategories;