import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-12 py-8 px-4 md:px-6 lg:px-10 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Search className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-800">MCMS</span>
            </Link>
            <p className="text-sm text-gray-600">
              Medical Camp Management System — <br /> Join, manage & explore health camps easily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-800">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-700">Home</Link>
              </li>
              <li>
                <Link to="/available-camps" className="text-gray-600 hover:text-green-700">Available Camps</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-600 hover:text-green-700">Feedback</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-800">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="" className="text-gray-600 hover:text-green-700">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-green-700">Privacy Policy</Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-green-700">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-800">Connect With Us</h3>
            <div className="flex space-x-4 text-gray-500">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
               <FaTwitter></FaTwitter>
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
            <FaFacebook ></FaFacebook>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
             <FaInstagram></FaInstagram>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MCMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
