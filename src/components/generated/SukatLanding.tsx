import React, { useState } from 'react';
import { TrendingUp, Car, MapPin, Brain, AlertCircle, CheckCircle2, BarChart3, Clock, ShieldCheck, ChevronRight, Mail, HelpCircle, Menu, X, Sparkles, Zap, Target, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../img/Blue Modern Business Logo.svg'
import car from '../../img/Car Rental Image.webp'
// --- Types & Constants ---

type FormData = {
  name: string;
  email: string;
  carCount: string;
  city: string;
  listingChannel: string;
  contactNumber: string;
  fbLink: string;
};
const FAQS = [{
  question: "Is this fully automated AI?",
  answer: "Not yet. We start with human-in-the-loop recommendations while the AI learns your market. As more data is collected, automation increases. You're always in control of final pricing decisions."
}, {
  question: "Do I need to connect Facebook?",
  answer: "No. We don't access your Facebook account or booking history. You share only what you're comfortable with—simple calendar screenshots or booking summaries work fine."
}, {
  question: "How does the AI learn without booking history?",
  answer: "We use city-wide demand signals, availability patterns, seasonality, and your actions (accept/reject recommendations) to train the model. Over time, it gets smarter about what works in your specific market."
}, {
  question: "Can I override recommendations?",
  answer: "Always. You have full control. Every recommendation comes with an explanation—you decide whether to accept, modify, or ignore it. Your feedback helps the AI improve."
}, {
  question: "Is this safe for small operators?",
  answer: "Yes. We designed Sukat specifically for small operators (1-50 cars). No complex software, no risky automation. Just smart, explainable recommendations you can trust and control."
}] as any[];

// --- Animation Variants ---

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};
const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// --- Sub-components ---

const GlassCard = ({
  children,
  className = "",
  hover = true
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => <motion.div whileHover={hover ? {
  y: -4,
  transition: {
    duration: 0.3
  }
} : {}} transition={{
  duration: 0.2
}} className={`backdrop-blur-xl bg-slate-900/60 border border-cyan-500/20 rounded-2xl shadow-lg p-6 ${className}`}>
    {children}
  </motion.div>;


export const SukatLanding = () => {

  const [loading, setLoading] = useState(false);
// 1️⃣ Form data state
const [formData, setFormData] = useState({
  name: "",
  email: "",
  contactNumber: "",
  fbLink: "",
  city: "",
  carCount: "",
  listingChannel: ""
});

// 2️⃣ Submitted state for success message
const [submitted, setSubmitted] = useState(false);

// 3️⃣ handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page reload
  setLoading(true); 

  try {
    const response = await fetch("https://sukat.vercel.app/waitlist", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.status === "success") {
      setSubmitted(true); // show success message
    } else {
      alert("Something went wrong: " + result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to submit. Please try again.");
  }finally {
    setLoading(false); // stop loader
  }
};

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [carCount, setCarCount] = useState(10);

  // Calculate pricing based on car count
  const calculatePricing = (cars: number) => {
    const baseRevenuePerCar = 40000; // ₱30,000–₱50,000 average
    const upliftPercentage = cars <= 5 ? 0.10 : cars <= 20 ? 0.07 : 0.05; // 10% for small, 7% for medium, 5% for larger fleets
    const revenuePerCar = baseRevenuePerCar;
    const extraPerCar = revenuePerCar * upliftPercentage;
    const totalBaseRevenue = cars * revenuePerCar;
    const totalExtraRevenue = cars * extraPerCar;
    return {
      revenuePerCar,
      extraPerCar,
      totalBaseRevenue,
      totalExtraRevenue,
      upliftPercentage: upliftPercentage * 100
    };
  };
  const pricing = calculatePricing(carCount);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden relative">
      {/* Background Pattern & Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.15) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
        
        {/* Animated Gradient Orbs */}
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <motion.div animate={{
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.3, 0.15]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }} className="absolute top-2/3 right-1/4 w-80 h-80 md:w-[500px] md:h-[500px] bg-cyan-400/20 rounded-full blur-3xl" />
        <motion.div animate={{
        scale: [1, 1.4, 1],
        opacity: [0.1, 0.2, 0.1]
      }} transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }} className="absolute bottom-1/4 left-1/2 w-72 h-72 md:w-[400px] md:h-[400px] bg-blue-500/15 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-2xl bg-slate-950/70 border border-cyan-500/20 shadow-2xl shadow-slate-950/50 rounded-full w-[90%] md:w-[45%] max-w-5xl"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <img src={logo} alt="Logo" className="-m-8" />

          {/* CTA Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("signup")}
            className="relative px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 overflow-hidden"
          >
            <Zap className="w-4 h-4" />
            Get Early Access
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.nav>


      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-40 md:pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
                <motion.span animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }} className="flex h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-cyan-400 text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                  AI-Powered Pricing Intelligence
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6 max-w-4xl mx-auto leading-tight px-2">
                AI-Powered Pricing That Helps Your Cars{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  Earn More — Without Extra Work
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                Daily recommendations for car rental operators based on real demand signals. Start simple, see results, and watch the AI learn over time.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                <motion.button whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
              }} whileTap={{
                scale: 0.95
              }} onClick={() => scrollToSection('signup')} className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-semibold shadow-lg shadow-cyan-500/30 flex items-center gap-2 justify-center">
                  <motion.div animate={{
                  rotate: [0, 15, -15, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}>
                    <Zap className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                  Get Early Access
                </motion.button>

                <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={() => scrollToSection('how-it-works')} className="w-full sm:w-auto backdrop-blur-xl bg-slate-800/50 text-white border border-cyan-500/30 px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-semibold hover:bg-slate-800/70 transition-all">
                  See How It Works
                </motion.button>
              </motion.div>

              {/* Visual: Simple workflow */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.8,
              duration: 0.6
            }} className="mt-12 md:mt-16">
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 max-w-4xl mx-auto px-2">
                  <GlassCard className="w-full md:flex-1 backdrop-blur-xl bg-slate-900/60 border-cyan-500/20 text-center p-3 md:p-4">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs md:text-sm font-medium text-slate-300">Input</p>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-1">Demand Signals</p>
                  </GlassCard>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 rotate-90 md:rotate-0" />
                  <GlassCard className="w-full md:flex-1 backdrop-blur-xl bg-slate-900/60 border-cyan-500/20 text-center p-3 md:p-4">
                    <Brain className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs md:text-sm font-medium text-slate-300">AI Engine</p>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-1">Smart Analysis</p>
                  </GlassCard>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 rotate-90 md:rotate-0" />
                  <GlassCard className="w-full md:flex-1 backdrop-blur-xl bg-slate-900/60 border-cyan-500/20 text-center p-3 md:p-4">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs md:text-sm font-medium text-slate-300">Recommended Price</p>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-1">Daily Updates</p>
                  </GlassCard>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 rotate-90 md:rotate-0" />
                  <GlassCard className="w-full md:flex-1 backdrop-blur-xl bg-slate-900/60 border-cyan-500/20 text-center p-3 md:p-4">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs md:text-sm font-medium text-slate-300">Apply</p>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-1">You Control</p>
                  </GlassCard>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 md:py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <motion.div initial={{
                opacity: 0,
                scale: 0.8
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} viewport={{
                once: true
              }} className="inline-flex items-center gap-2 mb-3 md:mb-4">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                  <span className="text-[10px] md:text-xs font-semibold text-red-400 uppercase tracking-wide">
                    The Problem
                  </span>
                </motion.div>
                <motion.h2 initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.1
              }} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
                  Car Rental Pricing is Still Guesswork
                </motion.h2>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
                once: true
              }} className="space-y-3 md:space-y-4">
                  {[{
                  icon: TrendingDown,
                  text: "Prices stay the same even when demand changes daily"
                }, {
                  icon: Target,
                  text: "Operators rely on intuition or competitor pricing"
                }, {
                  icon: Clock,
                  text: "Weekdays go idle, peak days are underpriced"
                }, {
                  icon: MapPin,
                  text: "Facebook Marketplace has no pricing intelligence"
                }].map((item, i) => <motion.div key={i} variants={itemVariants} whileHover={{
                  x: 5,
                  transition: {
                    duration: 0.2
                  }
                }} className="flex gap-2 md:gap-3 items-start">
                      <motion.div whileHover={{
                    rotate: 360,
                    scale: 1.1
                  }} transition={{
                    duration: 0.5
                  }} className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 p-1.5 md:p-2 rounded-lg shrink-0">
                        <item.icon className="text-red-400 w-3 h-3 md:w-4 md:h-4" />
                      </motion.div>
                      <p className="text-sm md:text-base text-slate-300 pt-0.5 md:pt-1">{item.text}</p>
                    </motion.div>)}
                </motion.div>
                <motion.div initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.5
              }} className="mt-5 md:mt-6 backdrop-blur-xl bg-cyan-500/10 border-l-4 border-cyan-400 px-4 md:px-5 py-2.5 md:py-3 rounded-r-lg">
                  <p className="text-sm md:text-base font-semibold text-white">
                    Demand exists. Intelligence is missing.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <GlassCard className="backdrop-blur-xl bg-slate-900/60 border-cyan-500/20">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-slate-300 text-sm font-medium">Market Analysis</span>
                    <motion.span animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.95, 1.05, 0.95]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }} className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-full border border-cyan-500/30">
                      LIVE DATA
                    </motion.span>
                  </div>
                  <div className="space-y-3">
                    <motion.div initial={{
                    width: 0
                  }} whileInView={{
                    width: "100%"
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.8,
                    delay: 0.2
                  }} className="h-8 bg-slate-700/50 rounded-lg" />
                    <motion.div initial={{
                    width: 0
                  }} whileInView={{
                    width: "75%"
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.8,
                    delay: 0.4
                  }} className="h-8 bg-slate-700/50 rounded-lg" />
                    <motion.div initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.9
                  }} whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: 0.6,
                    type: "spring"
                  }} className="backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div animate={{
                        rotate: [0, 360]
                      }} transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}>
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                        </motion.div>
                        <p className="text-cyan-400 text-xs uppercase font-semibold tracking-wide">
                          AI Recommendation
                        </p>
                      </div>
                      <p className="text-base font-semibold mb-1 text-white">
                        Increase price by ₱400 for June 12-14
                      </p>
                      <p className="text-slate-300 text-sm">
                        Independence Day weekend: 85% utilization across your city.
                      </p>
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="how-it-works" className="py-16 md:py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-12">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                <span className="text-[10px] md:text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                  AI-Powered Solution
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white px-2">
                AI Pricing Intelligence, Per Car, Per Day
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto px-4">
                Sukat uses explainable pricing logic and demand signals to recommend safe price changes. Early on, humans guide the process — as more data is collected, the AI learns which prices perform best in each city.
              </p>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[{
              icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
              title: "AI-driven daily price recommendations",
              desc: "Get specific price points for every car, updated each morning based on real demand."
            }, {
              icon: <MapPin className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
              title: "City & season-aware demand modeling",
              desc: "We track holidays, local events, and seasonal patterns specific to your market."
            }, {
              icon: <Activity className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
              title: "Availability-based signals",
              desc: "Price adjustments based on your fleet's utilization and market availability."
            }, {
              icon: <Brain className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
              title: "Explainable 'why this price' logic",
              desc: "Every recommendation comes with clear reasoning so you understand the 'why.'"
            }, {
              icon: <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
              title: "Human-in-the-loop during early learning",
              desc: "Your feedback helps train the AI. You're always in control of final decisions."
            }, {
              icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />,
              title: "Safe, gradual optimization",
              desc: "No risky price swings. Start small, see results, scale with confidence."
            }].map((feature, i) => <motion.div key={i} variants={itemVariants}>
                  <GlassCard className="h-full">
                    <motion.div whileHover={{
                  scale: 1.1,
                  rotate: 5
                }} transition={{
                  duration: 0.3
                }} className="backdrop-blur-xl bg-cyan-500/10 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-sm md:text-base font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                  </GlassCard>
                </motion.div>)}
            </motion.div>
          </div>
        </section>

        {/* How the AI Works Section */}
        <section className="py-16 md:py-20 relative bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <Brain className="w-3 h-3 md:w-4 md:h-4 text-cyan-600" />
                <span className="text-[10px] md:text-xs font-semibold text-cyan-600 uppercase tracking-wide">
                  How It Works
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 px-2">
                Simple, Transparent AI
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-4">
                We don't access Facebook accounts or booking history. Operators stay fully in control.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[{
              step: "01",
              title: "Observe city, car type, and availability signals",
              desc: "We analyze market-wide demand patterns, not your private data."
            }, {
              step: "02",
              title: "Recommend safe price adjustments daily",
              desc: "Get clear, actionable recommendations with explanations every morning."
            }, {
              step: "03",
              title: "Learn from operator actions and outcomes",
              desc: "Your decisions train the AI to improve future recommendations for your market."
            }].map((item, i) => <motion.div key={i} variants={itemVariants} className="relative">
                  <motion.div initial={{
                opacity: 0,
                scale: 0.5
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: i * 0.1,
                type: "spring"
              }} className="text-4xl md:text-6xl font-black text-cyan-600 mb-3 md:mb-4 opacity-20">
                    {item.step}
                  </motion.div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>)}
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.5
          }} className="mt-8 md:mt-12 text-center">
              <div className="inline-block backdrop-blur-xl border border-cyan-600/30 bg-cyan-50 px-4 py-2 md:px-6 md:py-3 rounded-lg">
                <p className="text-xs md:text-sm text-slate-700 flex items-center gap-2 flex-wrap justify-center">
                  <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-cyan-600" />
                  <strong>Trust note:</strong> We don't access Facebook accounts or booking history. Operators stay fully in control.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-16 md:py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="backdrop-blur-xl bg-slate-900/60 border border-cyan-500/20 rounded-2xl overflow-hidden flex flex-col md:flex-row">
              <div className="p-8 md:p-12 flex-1">
                <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span className="text-[10px] md:text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                    Target Audience
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                  Built for Real Operators, Not Enterprises
                </h2>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
                once: true
              }} className="space-y-3 md:space-y-4 mb-6">
                  {["1–50 cars", "Facebook-based operations", "No complex fleet software needed", "Wants higher revenue without extra work"].map((text, i) => <motion.div key={i} variants={itemVariants} whileHover={{
                  x: 5
                }} className="flex gap-3 items-center">
                      <motion.div initial={{
                    scale: 0
                  }} whileInView={{
                    scale: 1
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: i * 0.1,
                    type: "spring"
                  }} className="backdrop-blur-xl bg-cyan-500/20 rounded-full p-1.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      </motion.div>
                      <span className="text-sm md:text-base text-slate-300">{text}</span>
                    </motion.div>)}
                </motion.div>
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.5
              }} className="inline-block backdrop-blur-xl border border-slate-700 bg-slate-800/50 px-4 py-2 rounded-lg text-sm text-slate-400">
                  Not built for large enterprise fleets (yet).
                </motion.div>
              </div>
              <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
  className="md:w-1/3 flex items-center justify-center p-12 rounded-2xl bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${car})` }} // car is your imported image
>
  {/* Optional floating element or effects can go here */}
</motion.div>

              </motion.div>
            
          </div>
        </section>

        {/* Simple Per-Car Pricing Section */}
        <section className="py-16 md:py-20 relative bg-white" style={{
        display: "none"
      }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-cyan-600" />
                <span className="text-[10px] md:text-xs font-semibold text-cyan-600 uppercase tracking-wide">
                  Simple, Per-Car Pricing (Monthly Big Numbers)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                ₱10,000–₱25,000 Extra Revenue Per Month, Without Extra Work
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-4">
                Small daily adjustments, big monthly impact. Sukat recommends the right price for each car every day — fully explainable, ready to apply in just 30 seconds.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Per Car Example */}
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div whileHover={{
                    rotate: 5,
                    scale: 1.1
                  }} className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl">
                      <Car className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900">Per Car Example</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Avg car revenue:</p>
                      <p className="text-2xl font-bold text-slate-900">₱10,000–₱25,000 / month</p>
                    </div>

                    <motion.div whileHover={{
                    x: 5
                  }} className="border-l-4 border-cyan-500 pl-4 bg-cyan-50 py-3">
                      <p className="text-sm text-cyan-700 mb-1">Recommended uplift:</p>
                      <p className="text-2xl font-bold text-cyan-600">₱1,000–₱2,500 extra per month per car</p>
                    </motion.div>

                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-2 flex items-center gap-2">
                        <Brain className="w-3 h-3" />
                        Reason:
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Adjusted for demand signals, weekday/weekend trends, and idle days
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fleet Example */}
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-300 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div whileHover={{
                    rotate: 5,
                    scale: 1.1
                  }} className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900">Fleet Example</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-cyan-700 mb-1">Fleet size:</p>
                      <p className="text-2xl font-bold text-slate-900">10 cars</p>
                    </div>

                    <motion.div whileHover={{
                    scale: 1.02
                  }} className="border-2 border-cyan-500 bg-gradient-to-r from-cyan-500 to-cyan-600 p-5 rounded-xl">
                      <p className="text-sm text-cyan-100 mb-2">Total extra revenue:</p>
                      <motion.p animate={{
                      textShadow: ["0 0 0px rgba(255, 255, 255, 0)", "0 0 20px rgba(255, 255, 255, 0.5)", "0 0 0px rgba(255, 255, 255, 0)"]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }} className="text-3xl md:text-4xl font-black text-white">
                        ₱10,000–₱25,000
                      </motion.p>
                      <p className="text-sm text-cyan-100 mt-1">extra per month</p>
                    </motion.div>

                    <div className="bg-white border border-cyan-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-cyan-700 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Result:
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        more booked days, fewer idle cars, more revenue with minimal effort
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Transparency Section */}
        <section id="pricing" className="py-16 md:py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <Target className="w-3 h-3 md:w-4 md:h-4 text-cyan-600" />
                <span className="text-[10px] md:text-xs font-semibold text-cyan-600 uppercase tracking-wide">
                  Revenue Calculator
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-300">How Much Extra Could Your Fleet Earn?</h2>
              <p className="text-base md:text-lg text-slate-600 mb-2 px-4">
                Small daily price adjustments add up to serious monthly profit
              </p>
              <p className="text-slate-400 mb-6 md:mb-8 text-xs md:text-sm flex items-center justify-center gap-2 px-4 flex-wrap">
                <motion.div animate={{
                rotate: [0, 360]
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}>
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                  Adjust the slider to see your fleet's potential
                </p>

                {/* Interactive Slider Section */}
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }} className="mb-6 md:mb-8">
                  <GlassCard className="backdrop-blur-xl bg-slate-800/60 border-cyan-500/20 text-left">
                    <div className="mb-5 md:mb-6">
                      <label className="text-xs md:text-sm font-semibold text-slate-300 mb-3 block flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Car className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                          How many cars do you have?
                        </span>
                        <motion.span key={carCount} initial={{
                      scale: 1.3,
                      color: "#06b6d4"
                    }} animate={{
                      scale: 1,
                      color: "#ffffff"
                    }} transition={{
                      duration: 0.2
                    }} className="text-xl md:text-2xl font-bold text-white">
                          {carCount}
                        </motion.span>
                      </label>
                      <input type="range" min="1" max="50" value={carCount} onChange={e => setCarCount(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 md:[&::-webkit-slider-thumb]:w-6 md:[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/50 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 md:[&::-moz-range-thumb]:w-6 md:[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-cyan-500 [&::-moz-range-thumb]:to-cyan-400 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-cyan-500/50" />
                      <div className="flex justify-between text-[10px] md:text-xs text-slate-500 mt-2">
                        <span>1 car</span>
                        <span>50 cars</span>
                      </div>
                    </div>

                    {/* Animated Calculations */}
                    <motion.div key={carCount} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.3
                }} className="space-y-3 md:space-y-4">
                      
                      {/* Per Car Breakdown */}
                      <motion.div className="backdrop-blur-xl bg-slate-900/60 border border-cyan-500/20 rounded-lg p-4 md:p-5">
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                          <Car className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                          <span className="text-xs md:text-sm font-semibold text-slate-300 uppercase tracking-wide">Per Car Example</span>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-xs md:text-sm">Base revenue per month</span>
                            <span className="font-semibold text-white text-sm md:text-base">₱{pricing.revenuePerCar.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-cyan-400">
                            <span className="font-medium flex items-center gap-2 text-xs md:text-sm">
                              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                              AI-powered uplift ({pricing.upliftPercentage}%)
                            </span>
                            <span className="font-bold text-base md:text-lg">+₱{Math.round(pricing.extraPerCar).toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Fleet Total */}
                      <motion.div whileHover={{
                    scale: 1.02
                  }} className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border-2 border-cyan-400/40 rounded-xl p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                          <span className="text-xs md:text-sm font-semibold text-slate-300 uppercase tracking-wide">Your {carCount}-Car Fleet</span>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                          <div>
                            <p className="text-[10px] md:text-xs text-cyan-300 mb-1">Extra revenue per month</p>
                            <motion.p key={pricing.totalExtraRevenue} initial={{
                          scale: 1.2
                        }} animate={{
                          scale: 1
                        }} transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10
                        }} className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                              +₱{Math.round(pricing.totalExtraRevenue).toLocaleString()}
                            </motion.p>
                          </div>
                          <div className="pt-2 md:pt-3 border-t border-cyan-400/30">
                            <p className="text-[10px] md:text-xs text-slate-300">
                              That's <strong className="text-cyan-300">₱{Math.round(pricing.extraPerCar).toLocaleString()} extra per car</strong> — every single month
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Motivating Subtext */}
                      <motion.div initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.3
                  }} className="backdrop-blur-xl bg-slate-900/40 border-l-4 border-cyan-400 pl-3 md:pl-4 py-2.5 md:py-3 rounded-r-lg">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          <Clock className="w-3 h-3 inline mr-1 text-cyan-400" />
                          <strong className="text-white">Just 30 seconds per day</strong> to review and apply pricing recommendations. 
                          No complex software. No risky automation. Just smarter pricing.
                        </p>
                      </motion.div>
                    </motion.div>
                  </GlassCard>
                </motion.div>

              <p className="text-sm md:text-base text-slate-400 italic px-4">
                "Small operators deserve the same pricing intelligence big fleets get. That's why we built Sukat."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Waitlist / Signup Section */}
        <section id="signup" className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatePresence mode="wait">
              {!submitted ? <motion.div key="form" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} transition={{
              duration: 0.5
            }}>
                  <GlassCard className="backdrop-blur-xl bg-slate-900/90 border-cyan-500/30">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <motion.div animate={{
                      rotate: [0, 360]
                    }} transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}>
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                          Limited Spots
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      Get Early Access
                      </h2>
                      <p className="text-slate-400 text-base">
                        Early pilots help train the AI and receive priority pricing recommendations.
                      </p>
                      <motion.div initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.3
                  }} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4" style={{
                    display: "none"
                  }}>
                        
                       
                      </motion.div>
                    </div>

                    <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-sm font-medium text-slate-300">Name</label>
                          <input type="text" required className="w-full px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-800/50 text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all backdrop-blur-xl placeholder:text-slate-500 text-sm" placeholder="Juan Dela Cruz" value={formData.name} onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                      })} />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-sm font-medium text-slate-300">Email</label>
                          <input type="email" required className="w-full px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-800/50 text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all backdrop-blur-xl placeholder:text-slate-500 text-sm" placeholder="juan@email.com" value={formData.email} onChange={e => setFormData({
                        ...formData,
                        email: e.target.value
                      })} />
                        </motion.div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-sm font-medium text-slate-300">Contact Number</label>
                          <input type="tel" required className="w-full px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-800/50 text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all backdrop-blur-xl placeholder:text-slate-500 text-sm" placeholder="+63 912 345 6789" value={formData.contactNumber} onChange={e => setFormData({
                        ...formData,
                        contactNumber: e.target.value
                      })} />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                          <label className="text-sm font-medium text-slate-300">Facebook Profile Link</label>
                          <input type="url" className="w-full px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-800/50 text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all backdrop-blur-xl placeholder:text-slate-500 text-sm" placeholder="https://facebook.com/yourprofile" value={formData.fbLink} onChange={e => setFormData({
                        ...formData,
                        fbLink: e.target.value
                      })} />
                        </motion.div>
                      </div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          City
                        </label>
                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-800/50 text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all backdrop-blur-xl placeholder:text-slate-500 text-sm" placeholder="e.g. Metro Manila, Cebu, Davao" value={formData.city} onChange={e => setFormData({
                      ...formData,
                      city: e.target.value
                    })} />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          Number of Cars
                        </label>
                        <select required className="w-full px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-800/50 text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all backdrop-blur-xl text-sm" value={formData.carCount} onChange={e => setFormData({
                      ...formData,
                      carCount: e.target.value
                    })}>
                          <option value="">Select range...</option>
                          <option value="1-5">1-5 cars</option>
                          <option value="6-15">6-15 cars</option>
                          <option value="16-30">16-30 cars</option>
                          <option value="31-50">31-50 cars</option>
                          <option value="50+">50+ cars</option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                          Primary listing platform
                        </label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {['Facebook', 'Website', 'Other'].map(option => <motion.button key={option} type="button" whileHover={{
                        scale: 1.05
                      }} whileTap={{
                        scale: 0.95
                      }} onClick={() => setFormData({
                        ...formData,
                        listingChannel: option
                      })} className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${formData.listingChannel === option ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 border-cyan-500' : 'backdrop-blur-xl bg-slate-800/50 text-slate-300 border-cyan-500/30 hover:border-cyan-500/50'}`}>
                              {option}
                            </motion.button>)}
                        </div>
                      </motion.div>

                      <motion.button
  type="submit"
  variants={itemVariants}
  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
  whileTap={{ scale: 0.98 }}
  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 py-4 rounded-xl text-base font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all mt-6 flex items-center justify-center gap-2"
  disabled={loading} // prevent multiple clicks
>
  {loading ? (
    <svg
      className="animate-spin h-5 w-5 text-slate-950"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      ></path>
    </svg>
  ) : (
    <>
      <Zap className="w-4 h-4" />
      Get Early Access
    </>
  )}
</motion.button>

                      <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Early pilots help train the AI and receive priority pricing recommendations.
                      </p>
                    </motion.form>
                  </GlassCard>
                </motion.div> : <motion.div key="success" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.9
            }} transition={{
              duration: 0.5
            }}>
                  <GlassCard className="backdrop-blur-xl bg-slate-900/90 text-center border-cyan-500/30">
                  
                    <motion.h2 initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.4
                }} className="text-3xl font-bold text-white mb-4">
                      You're on the list!
                    </motion.h2>
                    <motion.p initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.5
                }} className="text-slate-400 text-base mb-8">
                      Thanks, <span className="font-semibold text-cyan-400">{formData.name.split(' ')[0]}</span>!
                      We'll reach out to you at <strong>{formData.email}</strong> soon to discuss your fleet in{' '}
                      {formData.city}.
                    </motion.p>
                   
                  </GlassCard>
                </motion.div>}
            </AnimatePresence>
          </div>
        </section>


        {/* Founder Section */}
        <section className="py-16 md:py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-4xl mx-auto">
              <motion.div variants={floatingVariants} animate="animate" className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-full shrink-0 flex items-center justify-center text-slate-950 text-2xl md:text-3xl font-black" style={{
              display: "none"
            }}>
                G
              </motion.div>
              <div>
                <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span className="text-[10px] md:text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
                  Built for Real Operators, Not for Marketplaces
                </h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  "Sukat is built hands-on with real car rental operators in the Philippines. We wanted to
                  understand the pain of idle days and mispriced weekends before scaling automation. Our mission
                  is to put more profit in the operator's pocket, not the marketplace's."
                </p>
                <div className="mt-4 md:mt-6">
                  <p className="font-semibold text-white text-sm md:text-base">Glenn Zaballero, Founder</p>
                  <p className="text-slate-500 text-xs md:text-sm">Butuan, Philippines</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-xl bg-slate-950/80 py-12 border-t border-cyan-500/20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <img src={logo} alt="" />

            <div className="flex items-center gap-6">
              <motion.a whileHover={{
              scale: 1.05,
              y: -2
            }} href="mailto:hello@sukat.ph" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">zaballeroglenn052901@gmail.com</span>
              </motion.a>
              <span className="text-slate-700">|</span>
              <span className="text-sm text-slate-400">© 2025 Sukat Philippines</span>
            </div>

            <motion.div variants={pulseVariants} animate="animate" className="text-xs text-slate-400 backdrop-blur-xl bg-slate-800/50 px-3 py-1.5 rounded-full border border-cyan-500/20">
              Early-stage pilot validation
            </motion.div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="flex gap-6">
              
            </div>
            <p>Sukat is a revenue optimization tool. Results may vary based on market conditions.</p>
          </div>
        </div>
      </footer>
    </div>;
};