import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle, 
  XCircle,
  User,
  ArrowLeft,
  Sun,
  Moon,
  Sparkles,
  Shield,
  Zap,
  Trophy,
  Star,
  Users,
  Clock,
  Target,
  Github
} from "lucide-react";

interface AuthPageProps {
  onAuthSuccess: (userData: any) => void;
}

interface PasswordValidation {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecialChar: boolean;
  minLength: boolean;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'contact'>('login');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSocialAccounts, setShowSocialAccounts] = useState<'google' | 'github' | 'linkedin' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('faangify-theme');
    return saved ? saved === 'dark' : false;
  });
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Password validation
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    hasUppercase: false,
    hasLowercase: false,
    hasDigit: false,
    hasSpecialChar: false,
    minLength: false
  });

  // Add floating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll('.floating');
      elements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const validatePassword = (password: string): PasswordValidation => {
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      minLength: password.length >= 8
    };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');

    if (field === 'password') {
      setPasswordValidation(validatePassword(value));
    }
  };

  const isPasswordValid = (validation: PasswordValidation): boolean => {
    return Object.values(validation).every(Boolean);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'register') {
        // Validation for registration
        if (!formData.name.trim()) {
          throw new Error('Name is required');
        }

        if (contactMethod === 'email') {
          if (!formData.email || !validateEmail(formData.email)) {
            throw new Error('Please enter a valid email address');
          }
        } else {
          if (!formData.phone || !validatePhone(formData.phone)) {
            throw new Error('Please enter a valid phone number');
          }
        }

        if (!isPasswordValid(passwordValidation)) {
          throw new Error('Password does not meet requirements');
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const userData = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          contactMethod,
          registeredAt: new Date().toISOString(),
          level: 1,
          xp: 0,
          streak: 0,
          achievements: [],
          completedChallenges: 0
        };

        // Store in localStorage
        localStorage.setItem('faang-user-auth', JSON.stringify({
          isAuthenticated: true,
          user: userData
        }));

        onAuthSuccess(userData);

      } else {
        // Login validation
        const loginField = contactMethod === 'email' ? formData.email : formData.phone;
        
        if (!loginField) {
          throw new Error(`Please enter your ${contactMethod}`);
        }

        if (contactMethod === 'email' && !validateEmail(formData.email)) {
          throw new Error('Please enter a valid email address');
        }

        if (contactMethod === 'phone' && !validatePhone(formData.phone)) {
          throw new Error('Please enter a valid phone number');
        }

        if (!formData.password) {
          throw new Error('Password is required');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock user data for demo
        const userData = {
          id: '1',
          name: 'Alex Johnson',
          email: contactMethod === 'email' ? formData.email : 'alex.johnson@example.com',
          phone: contactMethod === 'phone' ? formData.phone : '+1234567890',
          contactMethod,
          registeredAt: new Date().toISOString(),
          level: 5,
          xp: 2450,
          streak: 12,
          achievements: ['First Steps', 'Problem Solver', 'Streak Master'],
          completedChallenges: 28
        };

        localStorage.setItem('faang-user-auth', JSON.stringify({
          isAuthenticated: true,
          user: userData
        }));

        onAuthSuccess(userData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('faangify-theme', newTheme ? 'dark' : 'light');
  };

  // Mock social accounts for demonstration
  const mockSocialAccounts = {
    google: [
      { email: 'john.doe@gmail.com', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
      { email: 'sarah.smith@gmail.com', name: 'Sarah Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
      { email: 'alex.johnson@gmail.com', name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
    ],
    github: [
      { email: 'johndoe@github.com', name: 'johndoe', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=John' },
      { email: 'sarahcodes@github.com', name: 'sarahcodes', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah' }
    ],
    linkedin: [
      { email: 'john.doe@linkedin.com', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JD' },
      { email: 'sarah.smith@linkedin.com', name: 'Sarah Smith', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SS' }
    ]
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'linkedin', accountEmail?: string) => {
    setIsLoading(true);
    setError('');

    try {
      // Show account selection if no account email provided
      if (!accountEmail) {
        setShowSocialAccounts(provider);
        setIsLoading(false);
        return;
      }

      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Find the selected account
      const accounts = mockSocialAccounts[provider];
      const selectedAccount = accounts.find(acc => acc.email === accountEmail);

      if (!selectedAccount) {
        throw new Error('Account not found');
      }

      const userData = {
        id: Date.now().toString(),
        name: selectedAccount.name,
        email: selectedAccount.email,
        avatar: selectedAccount.avatar,
        provider,
        contactMethod: 'email',
        registeredAt: new Date().toISOString(),
        level: authMode === 'register' ? 1 : 5,
        xp: authMode === 'register' ? 0 : 2450,
        streak: authMode === 'register' ? 0 : 12,
        achievements: authMode === 'register' ? [] : ['First Steps', 'Problem Solver', 'Streak Master'],
        completedChallenges: authMode === 'register' ? 0 : 28
      };

      localStorage.setItem('faang-user-auth', JSON.stringify({
        isAuthenticated: true,
        user: userData
      }));

      onAuthSuccess(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Social login failed');
    } finally {
      setIsLoading(false);
      setShowSocialAccounts(null);
    }
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${met ? 'scale-105' : ''}`}>
      {met ? (
        <CheckCircle className="w-4 h-4 text-green-500 animate-pulse" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span className={met ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>{text}</span>
    </div>
  );

  const features = [
    { icon: Target, title: "AI-Powered Practice", desc: "Personalized coding challenges" },
    { icon: Trophy, title: "Track Progress", desc: "XP, achievements & leaderboards" },
    { icon: Users, title: "Mock Interviews", desc: "Real-time interview simulation" },
    { icon: Sparkles, title: "Smart Feedback", desc: "Multi-dimensional performance analysis" }
  ];

  const stats = [
    { label: "Active Users", value: "50,000+", icon: Users },
    { label: "Success Rate", value: "94%", icon: Trophy },
    { label: "Companies", value: "FAANG+", icon: Star },
    { label: "Questions", value: "1000+", icon: Target }
  ];

  if (authMode === 'contact') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob floating"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 floating"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 floating"></div>
        </div>

        <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
          <CardHeader className="text-center relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute left-4 top-4 hover:bg-white/20"
              onClick={() => setAuthMode('login')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 hover:bg-white/20"
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg animate-pulse">
              F
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Contact Method
            </CardTitle>
            <CardDescription className="text-lg">
              How would you like to create your account?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-20 flex items-center gap-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-500 transform hover:scale-[1.03] border-2 border-blue-200 dark:border-blue-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-blue-500/20 group relative overflow-hidden"
              onClick={() => {
                setContactMethod('email');
                setAuthMode('register');
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg text-blue-700 dark:text-blue-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">Continue with Email</div>
                  <div className="text-sm text-muted-foreground">We'll send you updates via email</div>
                </div>
                <div className="text-blue-400 dark:text-blue-500 group-hover:text-purple-400 dark:group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-20 flex items-center gap-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-500 transform hover:scale-[1.03] border-2 border-green-200 dark:border-green-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl hover:shadow-green-500/20 group relative overflow-hidden"
              onClick={() => {
                setContactMethod('phone');
                setAuthMode('register');
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg text-green-700 dark:text-green-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">Continue with Phone</div>
                  <div className="text-sm text-muted-foreground">We'll send you SMS updates</div>
                </div>
                <div className="text-green-400 dark:text-green-500 group-hover:text-emerald-400 dark:group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Button>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Join thousands of successful candidates</p>
                <div className="flex justify-center space-x-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-bold text-blue-600">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob floating"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 floating"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 floating"></div>
      </div>

      <div className="w-full max-w-6xl flex items-center justify-center gap-8">
        {/* Left side - Features showcase (hidden on mobile) */}
        <div className="hidden lg:flex flex-col space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                F
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FAANGify
                </h1>
                <p className="text-muted-foreground">Master Your Tech Interview</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands preparing for top tech companies with our AI-powered platform
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 floating"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg floating"
              >
                <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-xl text-blue-600">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Auth form */}
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 hover:bg-white/20"
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg animate-pulse">
              F
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {authMode === 'login' ? 'Welcome Back!' : 'Join FAANGify'}
            </CardTitle>
            <CardDescription className="text-lg">
              {authMode === 'login' 
                ? 'Continue your interview preparation journey'
                : 'Start your journey to landing your dream job'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-12 h-12 text-base border-2 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-base font-medium">
                  {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                </Label>
                <div className="relative">
                  {contactMethod === 'email' ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  )}
                  <Input
                    id="contact"
                    type={contactMethod === 'email' ? 'email' : 'tel'}
                    placeholder={contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    value={contactMethod === 'email' ? formData.email : formData.phone}
                    onChange={(e) => handleInputChange(contactMethod, e.target.value)}
                    className="pl-12 h-12 text-base border-2 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                {authMode === 'login' && (
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setContactMethod(contactMethod === 'email' ? 'phone' : 'email')}
                  >
                    Use {contactMethod === 'email' ? 'phone number' : 'email'} instead
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-12 pr-12 h-12 text-base border-2 focus:border-blue-500 transition-colors"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                {authMode === 'register' && formData.password && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl space-y-2 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Password requirements:
                    </p>
                    <PasswordRequirement 
                      met={passwordValidation.minLength} 
                      text="At least 8 characters" 
                    />
                    <PasswordRequirement 
                      met={passwordValidation.hasUppercase} 
                      text="One uppercase letter" 
                    />
                    <PasswordRequirement 
                      met={passwordValidation.hasLowercase} 
                      text="One lowercase letter" 
                    />
                    <PasswordRequirement 
                      met={passwordValidation.hasDigit} 
                      text="One digit" 
                    />
                    <PasswordRequirement 
                      met={passwordValidation.hasSpecialChar} 
                      text="One special character (!@#$%^&*)" 
                    />
                  </div>
                )}
              </div>

              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-12 h-12 text-base border-2 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Passwords do not match
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 text-base font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-[1.03] shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 relative overflow-hidden group" 
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {isLoading ? (
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white">{authMode === 'login' ? 'Signing you in...' : 'Creating your account...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    {authMode === 'login' ? (
                      <>
                        <Zap className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-white">Sign In to Continue</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-white">Create Your Account</span>
                      </>
                    )}
                  </div>
                )}
              </Button>

              {/* Social Login Section */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              {!showSocialAccounts ? (
                <div className="space-y-3">
                  {/* Google Login - Full Width with Beautiful Design */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14 border-2 bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-red-950/20 dark:hover:to-orange-950/20 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/10 group relative overflow-hidden"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="font-semibold group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                        Continue with Google
                      </span>
                    </div>
                  </Button>

                  {/* GitHub Login - Full Width with Beautiful Design */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14 border-2 bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 dark:hover:from-gray-800 dark:hover:to-slate-900 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-500/10 group relative overflow-hidden"
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full group-hover:bg-gray-900 dark:group-hover:bg-white transition-colors duration-300">
                        <Github className="w-5 h-5 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
                      </div>
                      <span className="font-semibold group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        Continue with GitHub
                      </span>
                    </div>
                  </Button>

                  {/* LinkedIn Login - Full Width with Beautiful Design */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14 border-2 bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/20 dark:hover:to-cyan-950/20 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 group relative overflow-hidden"
                    onClick={() => handleSocialLogin('linkedin')}
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <div className="p-1 bg-[#0A66C2] rounded group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <span className="font-semibold group-hover:text-[#0A66C2] transition-colors">
                        Continue with LinkedIn
                      </span>
                    </div>
                  </Button>
                </div>
              ) : (
                /* Account Selection UI */
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Choose an account</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSocialAccounts(null)}
                      className="hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                    {mockSocialAccounts[showSocialAccounts].map((account, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        className="w-full h-auto p-4 justify-start bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden"
                        onClick={() => handleSocialLogin(showSocialAccounts, account.email)}
                        disabled={isLoading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="flex items-center gap-4 w-full relative z-10">
                          <div className="relative">
                            <img 
                              src={account.avatar} 
                              alt={account.name}
                              className="w-12 h-12 rounded-full border-3 border-blue-200 dark:border-blue-700 group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-colors duration-300 group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md">
                              {showSocialAccounts === 'google' && (
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                              )}
                              {showSocialAccounts === 'github' && (
                                <Github className="w-4 h-4" />
                              )}
                              {showSocialAccounts === 'linkedin' && (
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-semibold text-base group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">{account.name}</div>
                            <div className="text-sm text-muted-foreground">{account.email}</div>
                          </div>
                          <div className="text-blue-400 dark:text-blue-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-2 border-dashed bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 group"
                    onClick={() => handleSocialLogin(showSocialAccounts, `new.user@${showSocialAccounts}.com`)}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-200 dark:bg-gray-700 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors duration-300">
                        <User className="w-4 h-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
                      </div>
                      <span className="font-semibold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">Use another account</span>
                    </div>
                  </Button>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {authMode === 'login' ? 'New to FAANGify?' : 'Already have an account?'}
                  </span>
                </div>
              </div>

              {authMode === 'login' ? (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-14 text-base border-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border-blue-200 dark:border-blue-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden"
                  onClick={() => setAuthMode('contact')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-blue-700 dark:text-blue-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                      Create New Account
                    </span>
                  </div>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-14 text-base border-2 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border-green-200 dark:border-green-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden"
                  onClick={() => setAuthMode('login')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/50 rounded-full group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors duration-300">
                      <Zap className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-green-700 dark:text-green-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                      Sign In to Existing Account
                    </span>
                  </div>
                </Button>
              )}

              {authMode === 'login' && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot your password?
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}