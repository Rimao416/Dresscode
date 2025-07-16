"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <div className="w-full bg-white flex h-full">
        {/* Left Panel - Login Form - 40% */}
        <div className="w-full lg:w-2/5 p-6 lg:p-8 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                Welcome
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                back!
              </h2>
            </div>
           
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 hover:bg-white"
                />
              </div>
              
              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 hover:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-pink-600 hover:text-pink-700 transition-colors font-medium">
                  Forgot your password?
                </a>
              </div>
              
              {/* Login Button */}
              <button
                type="button"
                onClick={() => console.log('Login clicked')}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </div>
            
            {/* Divider */}
            <div className="mt-6 mb-5 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm text-gray-500 font-medium">or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            
            {/* Social Login - 50/50 split */}
            <div className="flex space-x-3 mb-6">
              <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-200 rounded-xl py-3 px-4 hover:bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium text-sm">Google</span>
              </button>
              
              <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-200 rounded-xl py-3 px-4 hover:bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:shadow-md">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-gray-700 font-medium text-sm">Facebook</span>
              </button>
            </div>
            
            {/* Create Account */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-pink-600 hover:text-pink-700 font-semibold transition-colors">
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Flower Image - 60% */}
        <div className="hidden lg:block lg:w-3/5 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
          
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-8 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"></div>
         
          {/* Text content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="text-white">
              <h3 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                Fresh flowers
              </h3>
              <p className="text-xl lg:text-2xl font-light opacity-90 mb-3">
                for any special occasion
              </p>
              <p className="text-base lg:text-lg opacity-80 max-w-lg leading-relaxed">
                Découvrez notre collection exclusive de bouquets artisanaux, créés avec passion pour sublimer vos moments les plus précieux.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}