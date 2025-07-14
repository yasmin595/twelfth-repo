
import { Link } from 'react-router';
import { Search } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-8 py-4 px-4 md:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                     <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Search className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-800">WhereIsIt</span>
            </Link>
            <p className="text-sm text-gray-600">
              A safe platform to report and find <br /> lost or found items near you.
            </p>
          </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4 text-green-800">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to='/' className="text-muted-foreground hover:text-foreground text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/addItems' className="text-muted-foreground hover:text-foreground text-sm">
                                   Add Items
                                </Link>
                            </li>
                            <li>
                                <Link to="/allItems"  className="text-muted-foreground hover:text-foreground text-sm">
                                   Found & lost Items
                                </Link>
                            </li>
                          
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4 text-green-800">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-muted-foreground hover:text-foreground text-sm">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4 text-green-800">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Event Explorer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;