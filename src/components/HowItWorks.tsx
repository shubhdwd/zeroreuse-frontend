import { motion } from "framer-motion";
import { Upload, Cpu, Shield, Trash2, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Image Securely",
    description: "Your image is loaded directly into browser memory"
  },
  {
    icon: Cpu,
    title: "AI Processes Image",
    description: "Transformation applied within secure session"
  },
  {
    icon: Shield,
    title: "ZeroReuse Protocol Initiates",
    description: "Security protocols activate upon completion"
  },
  {
    icon: Trash2,
    title: "Image is Deleted",
    description: "Original data permanently purged from memory"
  },
  {
    icon: CheckCircle,
    title: "Session Ends",
    description: "No trace remains. Zero data retained."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="trust-badge mb-4 sm:mb-6 text-xs sm:text-sm">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Transparent Process</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            How <span className="text-primary">ZeroReuse</span> Works
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-lg px-4">
            Every step is designed for complete transparency and security. 
            Watch your data's journey from upload to guaranteed deletion.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line - hidden on mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-success/20 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`glass-panel p-4 sm:p-6 inline-block w-full md:w-auto ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{step.description}</p>
                  </div>
                </div>
                
                {/* Center icon */}
                <div className="relative z-10 shrink-0 order-first md:order-none">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg ${
                    index === steps.length - 1 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;