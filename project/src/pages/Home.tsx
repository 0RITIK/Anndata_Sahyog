import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, TrendingUp, Building2, X, Globe2, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface TutorialSlide {
  title: string;
  description: string;
  image: string;
}

const tutorialSlides: Record<string, TutorialSlide[]> = {
  en: [
    {
      title: "Welcome to Ann-daata Sahyogya",
      description: "Your one-stop platform for agricultural trading, market insights, and government schemes.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products directly. Choose between MSP and market prices, or create custom listings.",
      image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?ixlib=rb-1.2.1&auto=format&fit=crop&w=2800&q=80"
    },
    {
      title: "Price Predictions",
      description: "Access real-time market insights, price trends, and seasonal analyses to make informed decisions.",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "Subsidy Schemes",
      description: "Stay updated with government schemes and subsidies. Track fund allocations and eligibility criteria.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "Delivery Tracking",
      description: "Track your shipments in real-time. View delivery history and get instant updates on your orders.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    }
  ],
  hi: [
    {
      title: "अन्न-दाता सहयोग में आपका स्वागत है",
      description: "कृषि व्यापार, बाजार अंतर्दृष्टि और सरकारी योजनाओं के लिए आपका एकल मंच।",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "मार्केटप्लेस",
      description: "सीधे कृषि उत्पादों को खरीदें और बेचें। MSP और बाजार मूल्यों के बीच चयन करें, या कस्टम लिस्टिंग बनाएं।",
      image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?ixlib=rb-1.2.1&auto=format&fit=crop&w=2800&q=80"
    },
    {
      title: "मूल्य पूर्वानुमान",
      description: "सूचित निर्णय लेने के लिए रीयल-टाइम बाजार अंतर्दृष्टि, मूल्य रुझान और मौसमी विश्लेषण तक पहुंच प्राप्त करें।",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "सब्सिडी योजनाएं",
      description: "सरकारी योजनाओं और सब्सिडी से अपडेट रहें। फंड आवंटन और पात्रता मानदंड को ट्रैक करें।",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "डिलीवरी ट्रैकिंग",
      description: "रीयल-टाइम में अपने शिपमेंट को ट्रैक करें। डिलीवरी इतिहास देखें और अपने ऑर्डर पर तत्काल अपडेट प्राप्त करें।",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    }
  ],
  gu: [
    {
      title: "અન્ન-દાતા સહયોગમાં આપનું સ્વાગત છે",
      description: "કૃષિ વ્યાપાર, બજાર અંતર્દૃષ્ટિ અને સરકારી યોજનાઓ માટે તમારું એક સ્ટોપ પ્લેટફોર્મ.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "માર્કેટપ્લેસ",
      description: "સીધા કૃષિ ઉત્પાદનો ખરીદો અને વેચો. MSP અને બજાર ભાવો વચ્ચે પસંદગી કરો, અથવા કસ્ટમ લિસ્ટિંગ બનાવો.",
      image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?ixlib=rb-1.2.1&auto=format&fit=crop&w=2800&q=80"
    },
    {
      title: "ભાવ આગાહી",
      description: "માહિતગાર નિર્ણયો લેવા માટે રીયલ-ટાઈમ બજાર અંતર્દૃષ્ટિ, ભાવ વલણો અને મોસમી વિશ્લેષણ મેળવો.",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "સબસિડી યોજનાઓ",
      description: "સરકારી યોજનાઓ અને સબસિડીથી અપડેટ રહો. ફંડ ફાળવણી અને પાત્રતા માપદંડને ટ્રૅક કરો.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    },
    {
      title: "ડિલિવરી ટ્રેકિંગ",
      description: "રીયલ-ટાઈમમાં તમારા શિપમેન્ટને ટ્રૅક કરો. ડિલિવરી ઇતિહાસ જુઓ અને તમારા ઓર્ડર પર તાત્કાલિક અપડેટ્સ મેળવો.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
    }
  ]
};

function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const welcomed = localStorage.getItem('welcomed');
    if (welcomed) {
      setShowWelcome(false);
    }
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem('welcomed', 'true');
    setShowWelcome(false);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:chootu3679@gmail.com?subject=Feedback for Ann-daata Sahyogya&body=${encodeURIComponent(feedback)}`;
    setFeedback('');
    setShowFeedbackForm(false);
  };

  const startTutorial = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setShowLanguageSelect(false);
    setShowTutorial(true);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === tutorialSlides[language].length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? tutorialSlides[language].length - 1 : prev - 1
    );
  };

  const translations = {
    en: {
      welcome: 'Welcome to Ann-daata Sahyogya',
      tutorial: 'Watch Tutorial',
      dontShow: "Don't show again",
      getStarted: 'Get Started',
      empowering: 'Empowering Indian Agriculture',
      connect: 'Connect directly with buyers and sellers, access market insights, and discover government schemes',
      feedback: 'Share Your Feedback',
      feedbackPlaceholder: 'Tell us your thoughts, suggestions, or concerns...',
      submit: 'Submit',
      next: 'Next',
      prev: 'Previous',
      close: 'Close Tutorial',
      selectLanguage: 'Select Tutorial Language',
      continueInLanguage: 'Continue in English'
    },
    hi: {
      welcome: 'अन्न-दाता सहयोग में आपका स्वागत है',
      tutorial: 'ट्यूटोरियल देखें',
      dontShow: 'फिर मत दिखाना',
      getStarted: 'शुरू करें',
      empowering: 'भारतीय कृषि को सशक्त बनाना',
      connect: 'खरीदारों और विक्रेताओं से सीधे जुड़ें, बाजार की जानकारी प्राप्त करें, और सरकारी योजनाओं की खोज करें',
      feedback: 'अपनी प्रतिक्रिया साझा करें',
      feedbackPlaceholder: 'अपने विचार, सुझाव या चिंताएं बताएं...',
      submit: 'जमा करें',
      next: 'अगला',
      prev: 'पिछला',
      close: 'ट्यूटोरियल बंद करें',
      selectLanguage: 'ट्यूटोरियल भाषा चुनें',
      continueInLanguage: 'हिंदी में जारी रखें'
    },
    gu: {
      welcome: 'અન્ન-દાતા સહયોગમાં આપનું સ્વાગત છે',
      tutorial: 'ટ્યુટોરિયલ જુઓ',
      dontShow: 'ફરીથી બતાવશો નહીં',
      getStarted: 'શરૂ કરો',
      empowering: 'ભારતીય કૃષિને સશક્ત બનાવવી',
      connect: 'ખરીદદારો અને વેચનારાઓ સાથે સીધા જોડાઓ, બજાર માહિતી મેળવો, અને સરકારી યોજનાઓ શોધો',
      feedback: 'તમારો પ્રતિસાદ શેર કરો',
      feedbackPlaceholder: 'તમારા વિચારો, સૂચનો અથવા ચિંતાઓ જણાવો...',
      submit: 'સબમિટ કરો',
      next: 'આગળ',
      prev: 'પાછળ',
      close: 'ટ્યુટોરિયલ બંધ કરો',
      selectLanguage: 'ટ્યુટોરિયલ ભાષા પસંદ કરો',
      continueInLanguage: 'ગુજરાતીમાં આગળ વધો'
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="flex flex-col relative">
      {/* Welcome Alert */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{t.welcome}</h2>
              <button onClick={() => setShowWelcome(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Language Selection */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Globe2 className="h-5 w-5 text-green-600" />
                <span className="font-medium">Select Language:</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded ${language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 rounded ${language === 'hi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => setLanguage('gu')}
                  className={`px-3 py-1 rounded ${language === 'gu' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  ગુજરાતી
                </button>
              </div>
            </div>

            {/* Tutorial Button */}
            <button 
              onClick={() => {
                setShowWelcome(false);
                setShowLanguageSelect(true);
              }} 
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-4"
            >
              <PlayCircle className="h-5 w-5" />
              <span>{t.tutorial}</span>
            </button>

            {/* Don't Show Again */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="dontShow"
                onChange={handleDontShowAgain}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="dontShow" className="ml-2 text-gray-700">
                {t.dontShow}
              </label>
            </div>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      )}

      {/* Language Selection Modal */}
      {showLanguageSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{t.selectLanguage}</h2>
              <button onClick={() => setShowLanguageSelect(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => startTutorial('en')}
                className="flex items-center justify-between p-4 border-2 border-green-500 rounded-lg hover:bg-green-50"
              >
                <div className="flex items-center">
                  <img src="https://flagcdn.com/w40/gb.png" alt="English" className="w-8 h-6 mr-3" />
                  <span className="text-lg">English</span>
                </div>
                <ArrowRight className="h-5 w-5 text-green-600" />
              </button>
              
              <button
                onClick={() => startTutorial('hi')}
                className="flex items-center justify-between p-4 border-2 border-green-500 rounded-lg hover:bg-green-50"
              >
                <div className="flex items-center">
                  <img src="https://flagcdn.com/w40/in.png" alt="Hindi" className="w-8 h-6 mr-3" />
                  <span className="text-lg">हिंदी</span>
                </div>
                <ArrowRight className="h-5 w-5 text-green-600" />
              </button>
              
              <button
                onClick={() => startTutorial('gu')}
                className="flex items-center justify-between p-4 border-2 border-green-500 rounded-lg hover:bg-green-50"
              >
                <div className="flex items-center">
                  <img src="https://flagcdn.com/w40/in.png" alt="Gujarati" className="w-8 h-6 mr-3" />
                  <span className="text-lg">ગુજરાતી</span>
                </div>
                <ArrowRight className="h-5 w-5 text-green-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full relative">
            <button 
              onClick={() => setShowTutorial(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative h-[600px]">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${tutorialSlides[language][currentSlide].image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {tutorialSlides[language][currentSlide].title}
                </h2>
                <p className="text-lg mb-8">
                  {tutorialSlides[language][currentSlide].description}
                </p>
                
                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={prevSlide}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span>{t.prev}</span>
                  </button>
                  
                  {/* Slide Indicators */}
                  <div className="flex space-x-2">
                    {tutorialSlides[language].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full ${
                          currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextSlide}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg"
                  >
                    <span>{t.next}</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">{t.empowering}</h1>
            <p className="text-xl mb-8">{t.connect}</p>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-500">
                <span>{t.getStarted}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowLanguageSelect(true)}
                className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-opacity-30"
              >
                <PlayCircle className="h-5 w-5" />
                <span>{t.tutorial}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Ann-daata Sahyogya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
              <p className="text-gray-600">Connect directly with farmers and buyers without intermediaries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
              <p className="text-gray-600">Access real-time price predictions and market trends</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building2 className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Government Support</h3>
              <p className="text-gray-600">Stay updated with latest government schemes and subsidies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Market Prices */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Market Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Rice', 'Wheat', 'Corn', 'Soybeans'].map((crop) => (
              <div key={crop} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">{crop}</h3>
                <p className="text-3xl font-bold text-green-600">₹2,500/q</p>
                <p className="text-sm text-gray-500">Updated 2 hours ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 shadow-lg"
      >
        {t.feedback}
      </button>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{t.feedback}</h2>
              <button onClick={() => setShowFeedbackForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLength={1000}
                rows={6}
                className="w-full border rounded-lg p-2 mb-4"
                placeholder={t.feedbackPlaceholder}
                required
              />
              <div className="text-right">
                <span className="text-sm text-gray-500 mr-4">{feedback.length}/1000</span>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;