import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Car, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Filter,
  Upload,
  X,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [cars, setCars] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newCar, setNewCar] = useState({
    name: '',
    brand: '',
    price: '',
    year: '',
    mileage: '',
    fuelType: '',
    seats: '',
    description: '',
    features: [],
    image: ''
  });

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const stats = [
    {
      title: 'Total Cars',
      value: '47',
      icon: Car,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Active Users',
      value: '2,341',
      icon: Users,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Total Revenue',
      value: '$1.2M',
      icon: DollarSign,
      color: 'bg-purple-500',
      trend: '+15%'
    },
    {
      title: 'Monthly Sales',
      value: '24',
      icon: TrendingUp,
      color: 'bg-orange-500',
      trend: '+5%'
    }
  ];

  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Porsche', 'Lexus', 'Ferrari', 'Lamborghini'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

  useEffect(() => {
    // Mock cars data
    const mockCars = [
      {
        id: 1,
        name: 'BMW M5 Competition',
        brand: 'BMW',
        price: 105000,
        year: 2024,
        mileage: 15,
        fuelType: 'Gasoline',
        seats: 5,
        description: 'The BMW M5 Competition delivers exceptional performance.',
        features: ['All-Wheel Drive', 'Luxury Package', 'Sport Mode'],
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400',
        status: 'active',
        views: 1234,
        inquiries: 23
      },
      {
        id: 2,
        name: 'Mercedes-AMG GT 63 S',
        brand: 'Mercedes-Benz',
        price: 158000,
        year: 2024,
        mileage: 12,
        fuelType: 'Gasoline',
        seats: 4,
        description: 'Experience the pinnacle of Mercedes-AMG engineering.',
        features: ['Carbon Fiber Package', 'AMG Track Package', 'Premium Audio'],
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=400',
        status: 'active',
        views: 987,
        inquiries: 18
      },
      {
        id: 3,
        name: 'Audi RS7 Sportback',
        brand: 'Audi',
        price: 120000,
        year: 2024,
        mileage: 18,
        fuelType: 'Gasoline',
        seats: 5,
        description: 'The Audi RS7 Sportback combines luxury with performance.',
        features: ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen'],
        image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=400',
        status: 'active',
        views: 756,
        inquiries: 15
      }
    ];

    setTimeout(() => {
      setCars(mockCars);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddCar = () => {
    if (newCar.name && newCar.brand && newCar.price) {
      const car = {
        id: Date.now(),
        ...newCar,
        price: parseInt(newCar.price),
        year: parseInt(newCar.year),
        mileage: parseInt(newCar.mileage),
        seats: parseInt(newCar.seats),
        features: newCar.features.filter(f => f.trim() !== ''),
        status: 'active',
        views: 0,
        inquiries: 0
      };
      
      setCars([...cars, car]);
      setNewCar({
        name: '',
        brand: '',
        price: '',
        year: '',
        mileage: '',
        fuelType: '',
        seats: '',
        description: '',
        features: [],
        image: ''
      });
      setShowAddCarModal(false);
    }
  };

  const handleDeleteCar = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newCar.features];
    updatedFeatures[index] = value;
    setNewCar({ ...newCar, features: updatedFeatures });
  };

  const addFeature = () => {
    setNewCar({ ...newCar, features: [...newCar.features, ''] });
  };

  const removeFeature = (index) => {
    const updatedFeatures = newCar.features.filter((_, i) => i !== index);
    setNewCar({ ...newCar, features: updatedFeatures });
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === '' || car.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-luxury-navy">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddCarModal(true)}
                className="bg-luxury-gradient text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Car</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'cars', 'users', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-luxury-gold text-luxury-gold'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-full`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New car added: BMW M5 Competition</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mercedes-AMG GT 63 S received 5 new inquiries</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">3 new users registered</p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search cars..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                    />
                  </div>
                  <select
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  {filteredCars.length} cars found
                </div>
              </div>
            </div>

            {/* Cars List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-gray-600">Loading cars...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inquiries
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCars.map((car) => (
                        <tr key={car.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={car.image}
                                alt={car.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{car.name}</div>
                                <div className="text-sm text-gray-500">{car.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(car.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {car.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              car.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {car.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {car.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {car.inquiries}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-yellow-600 hover:text-yellow-900 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCar(car.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-luxury-navy">Add New Car</h3>
                <button
                  onClick={() => setShowAddCarModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
                    <input
                      type="text"
                      value={newCar.name}
                      onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                      placeholder="e.g., BMW M5 Competition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <select
                      value={newCar.brand}
                      onChange={(e) => setNewCar({...newCar, brand: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                    >
                      <option value="">Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={newCar.price}
                      onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                      placeholder="105000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                    <input
                      type="number"
                      value={newCar.seats}
                      onChange={(e) => setNewCar({...newCar, seats: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (MPG)</label>
                    <input
                      type="number"
                      value={newCar.mileage}
                      onChange={(e) => setNewCar({...newCar, mileage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                    <select
                      value={newCar.fuelType}
                      onChange={(e) => setNewCar({...newCar, fuelType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                    >
                      <option value="">Select Fuel Type</option>
                      {fuelTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCar.description}
                    onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                    placeholder="Brief description of the car..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  {newCar.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                        placeholder="Enter feature..."
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFeature}
                    className="text-luxury-gold hover:text-luxury-gold/80 transition-colors text-sm"
                  >
                    + Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newCar.image}
                    onChange={(e) => setNewCar({...newCar, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAddCarModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCar}
                  className="bg-luxury-gradient text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Add Car</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;