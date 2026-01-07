import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">♔</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">Kashoe</span>
                <span className="text-xs text-purple-400 leading-tight">Chess Club</span>
              </div>
            </div>
            <p className="text-sm">
              A faith-based chess club nurturing young minds through the beautiful game of chess in Nairobi, Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-purple-400 transition-colors">Events</Link></li>
              <li><Link to="/shop" className="hover:text-purple-400 transition-colors">Shop</Link></li>
              <li><Link to="/lessons" className="hover:text-purple-400 transition-colors">Lessons</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>info@kashoechess.club</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>+254 XXX XXX XXX</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                data-testid="facebook-link"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                data-testid="instagram-link"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                data-testid="twitter-link"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                data-testid="youtube-link"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm mt-4">
              Stay connected with us on social media for updates, events, and chess tips!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kashoe Chess Club. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Nurturing young minds through chess in Nairobi, Kenya 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;