import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  Calendar, 
  Fuel, 
  Users, 
  Gauge, 
  Shield, 
  Car, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  X,
  Play
} from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock car data - in real app, this would be an API call
    const mockCar = {
      id: parseInt(id),
      name: 'BMW M5 Competition',
      brand: 'BMW',
      price: 105000,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      year: 2024,
      mileage: 15,
      fuelType: 'Gasoline',
      seats: 5,
      rating: 4.8,
      reviews: 127,
      features: ['All-Wheel Drive', 'Luxury Package', 'Sport Mode', 'Carbon Fiber Trim', 'Premium Audio', 'Adaptive Suspension'],
      description: 'The BMW M5 Competition delivers exceptional performance with its twin-turbo V8 engine, combining luxury and power in perfect harmony. This flagship sedan represents the pinnacle of BMW M engineering.',
      specifications: {
        engine: '4.4L Twin-Turbo V8',
        horsepower: '617 hp',
        torque: '553 lb-ft',
        transmission: '8-Speed Automatic',
        drivetrain: 'All-Wheel Drive',
        acceleration: '0-60 mph in 3.1 seconds',
        topSpeed: '190 mph (electronically limited)',
        fuelEconomy: '15/21 MPG (city/highway)',
        weight: '4,370 lbs',
        length: '196.0 inches',
        width: '74.9 inches',
        height: '58.1 inches'
      },
      warranty: {
        basic: '4 years / 50,000 miles',
        powertrain: '4 years / 50,000 miles',
        maintenance: '3 years / 36,000 miles'
      },
      dealer: {
        name: 'LuxeCars Premium',
        phone: '+1 (555) 123-4567',
        email: 'sales@luxecars.com',
        address: '123 Luxury Ave, Premium City, PC 12345'
      },
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      condition: 'Brand New',
      vin: 'WBSJF0C55NCE12345',
      stockNumber: 'LC2024001'
    };

    setTimeout(() => {
      setCar(mockCar);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const nextImage = () => {
    if (car && car.images) {
      setSelectedImage((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car && car.images) {
      setSelectedImage((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-luxury-navy font-medium">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <div className="text-center">
          <Car className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car Not Found</h2>
          <p className="text-gray-600 mb-4">The car you're looking for doesn't exist.</p>
          <Link
            to="/categories"
            className="bg-luxury-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/categories"
              className="flex items-center space-x-2 text-luxury-navy hover:text-luxury-gold transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Categories</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-luxury-gold transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={car.images[selectedImage]}
                  alt={car.name}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                />
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-luxury-gold' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'specifications', 'features', 'warranty'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-luxury-gold text-luxury-gold'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{car.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-luxury-gold" />
                        <span className="text-sm text-gray-600">{car.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Fuel className="h-4 w-4 text-luxury-gold" />
                        <span className="text-sm text-gray-600">{car.fuelType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-luxury-gold" />
                        <span className="text-sm text-gray-600">{car.mileage} MPG</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-luxury-gold" />
                        <span className="text-sm text-gray-600">{car.seats} Seats</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(car.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'warranty' && (
                  <div className="space-y-4">
                    {Object.entries(car.warranty).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-luxury-gold" />
                        <div>
                          <span className="font-medium text-gray-900 capitalize">
                            {key} Warranty:
                          </span>
                          <span className="text-gray-600 ml-2">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Car Info Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-luxury-navy">{car.name}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{car.rating}</span>
                  <span className="text-sm text-gray-400">({car.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-luxury-gold mb-4">
                {formatPrice(car.price)}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium">{car.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock #:</span>
                  <span className="font-medium">{car.stockNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VIN:</span>
                  <span className="font-medium text-sm">{car.vin}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-luxury-gradient text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Schedule Test Drive
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Get Pre-Approved
                </button>
                <button className="w-full border border-luxury-gold text-luxury-gold py-3 px-4 rounded-lg font-medium hover:bg-luxury-gold hover:text-white transition-colors">
                  Make an Offer
                </button>
              </div>
            </div>

            {/* Dealer Info Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-luxury-navy mb-4">Dealer Information</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{car.dealer.name}</h4>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-luxury-gold" />
                  <span className="text-gray-600">{car.dealer.phone}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-luxury-gold" />
                  <span className="text-gray-600">{car.dealer.email}</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-luxury-gold mt-1" />
                  <span className="text-gray-600">{car.dealer.address}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-luxury-navy text-white py-2 px-4 rounded-lg font-medium hover:bg-luxury-charcoal transition-colors">
                  Contact Dealer
                </button>
              </div>
            </div>

            {/* Video Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-luxury-navy mb-4">Video Tour</h3>
              
              <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={car.images[0]}
                  alt="Video thumbnail"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                    <Play className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <img
              src={car.images[selectedImage]}
              alt={car.name}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;