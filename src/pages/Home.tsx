import { motion, type Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Zap, RefreshCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Enhanced floating animations - more visible but still smooth
const floatAnimation = {
  y: [0, -20, 0],
  rotate: [0, 1, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as Easing
  }
};

const floatDelayedAnimation = {
  y: [0, -16, 0],
  rotate: [0, -0.5, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as Easing,
    delay: 0.5
  }
};

const floatSlowAnimation = {
  y: [0, -24, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as Easing,
    delay: 1
  }
};

const floatCardAnimation = (delay: number) => ({
  y: [0, -12, 0],
  transition: {
    duration: 4.5 + delay,
    repeat: Infinity,
    ease: "easeInOut" as Easing,
    delay: delay * 0.3
  }
});

const useCards = [
  {
    icon: Lock,
    title: 'No Image Storage',
    description: 'Images are never saved to disk or cloud storage. Processing happens entirely in volatile memory.',
    delay: 0
  },
  {
    icon: Eye,
    title: 'Live Security Audit',
    description: 'Real-time proof that your images are deleted. Watch the security audit as it happens.',
    delay: 1
  },
  {
    icon: Zap,
    title: 'Instant Secure Processing',
    description: 'Fast AI processing within a secure, isolated session. No waiting, no compromise.',
    delay: 2
  },
  {
    icon: RefreshCcw,
    title: 'Zero Reuse Guarantee',
    description: 'Your data is never reused or trained on. Each session is completely independent.',
    delay: 3
  }
];

const steps = [
  { number: '01', title: 'Upload Image', description: 'Securely upload your image to browser memory' },
  { number: '02', title: 'AI Processes', description: 'AI transforms your image in isolated environment' },
  { number: '03', title: 'ZeroReuse Protocol', description: 'Automatic deletion protocol initiates' },
  { number: '04', title: 'Image Deleted', description: 'Source image permanently purged' },
  { number: '05', title: 'Session Ends', description: 'All data cleared, no trace remains' }
];

export default function Home() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pastel-gradient-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/40 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              ZeroReuse <span className="text-primary">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden sm:flex items-center gap-1.5 text-xs text-success"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              System Secure
            </motion.span>
            <Link to="/signin">
              <Button variant="outline" size="sm" className="bg-card/50 hover:bg-card">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background decorations - more visible */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={floatSlowAnimation}
            className="absolute top-20 left-[5%] w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={floatDelayedAnimation}
            className="absolute bottom-10 right-[5%] w-96 h-96 rounded-full bg-secondary/15 blur-3xl"
          />
          <motion.div
            animate={floatAnimation}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 text-primary text-sm font-medium mb-8 border border-primary/20"
            >
              <Lock className="w-4 h-4" />
              Privacy-Safe Image Processing
            </motion.div>
          </motion.div>

          <motion.div
            animate={floatAnimation}
            className="mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 mb-6 border border-primary/10"
            >
              <Shield className="w-14 h-14 text-primary" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            ZeroReuse <span className="text-primary">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            A privacy-safe AI platform that processes images without storing them.
            Process with confidence, zero storage, zero reuse, zero trace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signin">
              <Button size="lg" className="gap-2 w-full sm:w-auto shadow-lg shadow-primary/20">
                Get Started Securely
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToHowItWorks}
              className="w-full sm:w-auto bg-card/50 hover:bg-card"
            >
              How ZeroReuse Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why ZeroReuse AI */}
      <section className="py-24 px-6 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why <span className="text-primary">ZeroReuse AI</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built from the ground up with privacy as the foundation, not an afterthought.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                animate={floatCardAnimation(card.delay)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-panel p-6 text-center group hover:border-primary/40 transition-all duration-300"
              >
                <motion.div 
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: card.delay * 0.2 }}
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center mx-auto mb-4 group-hover:from-primary/30 group-hover:to-secondary/25 transition-colors"
                >
                  <card.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A transparent, step-by-step process you can trust.
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="glass-panel p-5 flex items-center gap-5 hover:border-primary/30 transition-all"
              >
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-primary font-bold text-lg">{step.number}</span>
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/signin">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                Get Started Securely
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl font-bold mb-4 text-foreground"
          >
            ZeroReuse <span className="text-primary">AI</span>
          </motion.div>
          <p className="text-muted-foreground text-sm mb-6">
            Privacy-first AI image processing. Trust enforced by architecture.
          </p>
          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-success" />
              No Storage
            </motion.span>
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-success" />
              No Training
            </motion.span>
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-success" />
              No Trace
            </motion.span>
          </div>
        </div>
      </footer>
    </div>
  );
}
