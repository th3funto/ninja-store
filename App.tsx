import React from 'react';
import NinjaCalculator from './components/NinjaCalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-ninja-dark text-ninja-text selection:bg-ninja-accent selection:text-white pb-10">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"></div>
       <NinjaCalculator />
       
       <footer className="max-w-6xl mx-auto px-4 text-center mt-12 text-ninja-muted text-xs">
         <p>© {new Date().getFullYear()} Ninja Store System. All rights reserved.</p>
       </footer>
    </div>
  );
};

export default App;
