import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Heart, Eye, Calendar, DollarSign, Fuel, Users, Gauge } from 'lucide-react';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [currentHero, setCurrentHero] = useState(0);

  const heroImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Find Your Perfect Luxury Car',
      subtitle: 'Experience the ultimate in automotive excellence',
      cta: 'Explore Collection'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Premium Quality Vehicles',
      subtitle: 'Handpicked selection of the finest automobiles',
      cta: 'View Categories'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Unmatched Service Excellence',
      subtitle: 'Your journey to the perfect car starts here',
      cta: 'Learn More'
    }
  ];

  const brands = [
    { name: 'BMW', logo: 'https://logos-world.net/wp-content/uploads/2020/03/BMW-Logo.png' },
    { name: 'Mercedes-Benz', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Mercedes-Benz-Logo.png' },
    { name: 'Audi', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Audi-Logo.png' },
    { name: 'Tesla', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Tesla-Logo.png' },
    { name: 'Porsche', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Porsche-Logo.png' },
    { name: 'Lexus', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Lexus-Logo.png' }
  ];

  useEffect(() => {
    // Mock featured cars data
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
        features: ['All-Wheel Drive', 'Luxury Package', 'Sport Mode']
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
        features: ['Carbon Fiber Package', 'AMG Track Package', 'Premium Audio']
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
        features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen']
      }
    ];
    setFeaturedCars(mockCars);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((hero, index) => (
          <div
            key={hero.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHero ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${hero.image})` }}
            />
            <div className="absolute inset-0 hero-overlay" />
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-luxury font-bold mb-6 text-shadow">
                  {hero.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-shadow">
                  {hero.subtitle}
                </p>
                <Link
                  to="/categories"
                  className="inline-flex items-center space-x-2 bg-luxury-gradient text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  <span>{hero.cta}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentHero ? 'bg-luxury-gold' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-luxury font-bold text-luxury-navy mb-4">
              Featured Luxury Vehicles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium automobiles, each representing the pinnacle of automotive excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-2xl shadow-lg overflow-hidden car-card-hover">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-64 object-cover"
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
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-luxury-navy">{car.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{car.rating}</span>
                    </div>
                  </div>
                  
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
                      <span>{car.mileage} MPG</span>
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
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-luxury font-bold text-luxury-navy mb-4">
              Premium Car Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our extensive collection featuring the world's most prestigious automotive brands.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/categories/${brand.name.toLowerCase().replace('-', '')}`}
                className="group p-6 bg-luxury-cream rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="car-brand-logo group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-sm font-medium text-luxury-navy group-hover:text-luxury-gold transition-colors">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-luxury font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect vehicle with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/categories"
              className="bg-white text-luxury-navy px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-luxury-navy transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;