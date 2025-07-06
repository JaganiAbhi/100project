import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-luxury-gradient p-2 rounded-lg">
                <Car className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-luxury font-bold text-white">
                LuxeCars
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Your premier destination for luxury and quality vehicles. 
              We provide exceptional cars with unmatched service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Car Categories
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Car Brands */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Brands</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/bmw" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  BMW
                </Link>
              </li>
              <li>
                <Link to="/categories/mercedes" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Mercedes-Benz
                </Link>
              </li>
              <li>
                <Link to="/categories/audi" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Audi
                </Link>
              </li>
              <li>
                <Link to="/categories/tesla" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Tesla
                </Link>
              </li>
              <li>
                <Link to="/categories/porsche" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Porsche
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-luxury-gold" />
                <span className="text-gray-300 text-sm">
                  123 Luxury Ave, Premium City, PC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-luxury-gold" />
                <span className="text-gray-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-luxury-gold" />
                <span className="text-gray-300 text-sm">
                  info@luxecars.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 LuxeCars. All rights reserved. Built with passion for automotive excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;