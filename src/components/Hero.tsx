import { motion } from "framer-motion";
import { Shield, Lock, Zap, RefreshCw } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 px-4 sm:px-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center top, hsl(210 90% 55% / 0.08) 0%, transparent 50%)"
        }}
      />

      <div className="relative z-10 container mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="trust-badge mb-6 sm:mb-8 text-xs sm:text-sm"
        >
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Privacy-First AI Processing</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight"
        >
          <span className="text-foreground">ZeroReuse</span>
          <span className="text-primary"> AI</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 sm:mb-4 max-w-3xl mx-auto px-2"
        >
          Process images with AI, without storing, reusing, or retaining your data.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
        >
          Your images are processed securely and deleted immediately. 
          Trust enforced by architecture, not policy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm sm:text-base"
          >
            Get Started Securely
          </button>
          <button 
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-foreground glass-panel hover:bg-muted transition-all text-sm sm:text-base"
          >
            How ZeroReuse Works
          </button>
        </motion.div>

        {/* Use Cases / Why ZeroReuse - Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            {
              icon: Lock,
              title: "No Image Storage",
              description: "Images are never saved to disk or cloud storage"
            },
            {
              icon: Shield,
              title: "Live Security Audit",
              description: "Real-time proof that images are deleted"
            },
            {
              icon: Zap,
              title: "Instant Secure Processing",
              description: "Fast AI processing within a secure session"
            },
            {
              icon: RefreshCw,
              title: "Zero Reuse Guarantee",
              description: "Your data is never reused or trained on"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="feature-card text-left p-4 sm:p-5"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3">
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;