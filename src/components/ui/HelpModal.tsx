import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import Button from './Button';

interface HelpModalProps {
  className?: string;
}

const HelpModal: React.FC<HelpModalProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className={className}
        aria-label="Help"
        leftIcon={<HelpCircle className="text-blue-600" />}
      >
        Help
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Help Guide</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Getting Started</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Welcome to the Kolkata Bus Schedule App! This app helps you find bus routes and schedules in Kolkata.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Finding a Bus</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Log in with your account (or sign up if you're new)</li>
                    <li>Select an area of Kolkata (Behala, North, South, or Central)</li>
                    <li>Choose your boarding (starting) location</li>
                    <li>Choose your destination location</li>
                    <li>View available bus routes, numbers, and schedules</li>
                  </ol>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Using the Search</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The search bar at the top lets you quickly find bus routes by bus number, area name, or stop name.
                    Simply type your query and press Enter or click the Search button.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Saving Favorites</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You can save your frequently used routes as favorites by clicking the star icon next to a route.
                    Access your saved routes from the "Favorites" section in your profile.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Need More Help?</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If you need additional assistance, please contact our support team at support@kolkatabusapp.com
                  </p>
                </section>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={() => setIsOpen(false)} fullWidth>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;