import React from 'react';
import { Sparkles, Droplets } from 'lucide-react';

interface CleaningLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const CleaningLoader: React.FC<CleaningLoaderProps> = ({
  size = 'md',
  text = 'Loading...',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Main Loader Container */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        {/* Neon Blue Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/25 via-blue-600/25 to-teal-400/25 animate-ping"></div>
        
        {/* Central 3D Water Drop Icon */}
        <div className="relative z-10 w-10 h-10 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full animate-pulse"
            style={{ filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' }}
          >
            {/* 3D Water Drop with Gradient */}
            <defs>
              <radialGradient id="waterDropGradient" cx="0.3" cy="0.3" r="0.8">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity="1" />
                <stop offset="30%" stopColor="#0ea5e9" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#1e40af" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </radialGradient>
              <radialGradient id="waterDropHighlight" cx="0.25" cy="0.25" r="0.4">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Main Water Drop Shape */}
            <path
              d="M12 2C12 2 6 8 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 8 12 2 12 2Z"
              fill="url(#waterDropGradient)"
              className="animate-pulse"
            />
            
            {/* Liquid Highlight */}
            <ellipse
              cx="10.5"
              cy="10"
              rx="2.5"
              ry="3"
              fill="url(#waterDropHighlight)"
              opacity="0.7"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
            
            {/* Small Reflection Dot */}
            <circle
              cx="10"
              cy="8"
              r="1.2"
              fill="#ffffff"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            
            {/* Subtle Inner Glow */}
            <path
              d="M12 2C12 2 6 8 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 8 12 2 12 2Z"
              fill="none"
              stroke="url(#waterDropHighlight)"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Orbiting Elements */}
        {/* Bubble 1 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full animate-bounce opacity-80"
                 style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))' }}></div>
          </div>
        </div>

        {/* Water Drop */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
            <Droplets className="w-4 h-4 text-blue-400 animate-pulse" 
                     style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))' }} />
          </div>
        </div>

        {/* Sparkle */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '5s' }}>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" 
                      style={{ filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.5))' }} />
          </div>
        </div>

        {/* Mop Head */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
          <div className="absolute top-1/2 -left-2 transform -translate-y-1/2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-400 animate-pulse"
                 style={{ filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.4))' }}>
              <path d="M12 2L8 6V10L12 14L16 10V6L12 2Z" fill="currentColor" opacity="0.7" />
              <path d="M8 14V18C8 19.1 8.9 20 10 20H14C15.1 20 16 19.1 16 18V14" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Bubble 2 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '7s' }}>
          <div className="absolute top-1/4 right-1/4">
            <div className="w-2 h-2 bg-gradient-to-br from-teal-300 to-cyan-400 rounded-full animate-bounce opacity-70"
                 style={{ filter: 'drop-shadow(0 0 3px rgba(20, 184, 166, 0.4))', animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Cleaning Cloth */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
          <div className="absolute bottom-1/4 left-1/4">
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-pink-400 animate-pulse"
                 style={{ filter: 'drop-shadow(0 0 3px rgba(244, 114, 182, 0.4))' }}>
              <rect x="4" y="4" width="16" height="12" rx="2" fill="currentColor" opacity="0.6" />
              <path d="M6 8H18M6 12H18" stroke="white" strokeWidth="1" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Additional Floating Bubbles */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '9s' }}>
          <div className="absolute bottom-1/3 right-1/3">
            <div className="w-1.5 h-1.5 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full animate-bounce opacity-60"
                 style={{ filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.3))', animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className={`${textSizes[size]} font-medium text-gray-700 dark:text-gray-300 mb-1`}>
          {text}
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export const FullScreenCleaningLoader: React.FC<{ text?: string }> = ({
  text = 'Loading...'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Neon Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-blue-600/15 to-teal-400/15 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 via-indigo-600/8 to-cyan-500/8"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/5 via-blue-700/10 to-cyan-600/8"></div>
        {/* Animated Background Orbs - Neon Blue Theme */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-600/15 to-teal-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-teal-400/12 to-cyan-500/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-blue-400/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
          <CleaningLoader size="lg" text={text} className="py-4" />
          
          {/* Branding */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 bg-clip-text text-transparent mb-2">
              Neatrix
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 mx-auto mb-3 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Professional Cleaning Services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningLoader;