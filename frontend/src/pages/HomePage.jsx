import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Users, 
  Calculator, 
  BarChart3,
  LogIn,
  Menu, 
  X,
  LayoutDashboard
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="flex items-center">
                  <DollarSign className="h-8 w-8 text-emerald-400" />
                  <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">SplitEase</span>
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {isLoggedIn ? (
                  <Link to="/dashboard" className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                    <Link to="/register" className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <Link to="/dashboard" className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-base font-medium">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white block px-3 py-2 rounded-md text-base font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        {/* Hero section */}
        <div className="pt-16 sm:pt-24 lg:pt-32 pb-20 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="block text-white">Split expenses</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mt-2">without the hassle</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
            Track shared expenses, split bills, and settle up with friends and roommates easily.
          </p>
          <div className="mt-10">
            {isLoggedIn ? (
              <Link to="/dashboard" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:text-lg md:px-10 md:py-4">
                <LayoutDashboard className="h-5 w-5 mr-2" /> Go to Dashboard
              </Link>
            ) : (
              <Link to="/register" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:text-lg md:px-10 md:py-4">
                <LogIn className="h-5 w-5 mr-2" /> Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
        {/* Features section */}
        <div className="bg-gray-800 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold uppercase tracking-wider text-emerald-400">Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Everything you need to manage shared expenses
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mb-5">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Create Groups</h3>
                  <p className="mt-2 text-base text-gray-400">
                    Organize expenses by creating groups for roommates, trips, or events.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mb-5">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Split Bills Fairly</h3>
                  <p className="mt-2 text-base text-gray-400">
                    Split expenses equally or customize amounts for each person.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mb-5">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Track Balances</h3>
                  <p className="mt-2 text-base text-gray-400">
                    See who owes you and who you owe at a glance. Settle up with a tap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-emerald-400 mt-2">Create your account now.</span>
            </h2>
            <div className="mt-8">
              {isLoggedIn ? (
                <Link to="/dashboard" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:text-lg md:px-10 md:py-4">
                  <LayoutDashboard className="h-5 w-5 mr-2" /> Go to Dashboard
                </Link>
              ) : (
                <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:text-lg md:px-10 md:py-4">
                  Register for free
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-emerald-400" />
            <span className="ml-2 text-lg font-semibold text-white">SplitEase</span>
          </div>
          <p className="mt-4 md:mt-0 text-base text-gray-400">
            &copy; 2025 SplitEase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}