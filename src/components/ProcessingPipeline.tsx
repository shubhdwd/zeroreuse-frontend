import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles, Shield, Trash2, Download } from "lucide-react";

interface ProcessingPipelineProps {
  currentStep: number;
  isProcessing: boolean;
}

const steps = [
  { icon: Upload, label: "Upload", description: "Secure browser upload" },
  { icon: Cpu, label: "Session", description: "Unique session ID" },
  { icon: Sparkles, label: "Process", description: "RAM-only execution" },
  { icon: Shield, label: "Transform", description: "Non-reversible ops" },
  { icon: Trash2, label: "Delete", description: "Auto-destroy data" },
  { icon: Download, label: "Output", description: "Return to user" },
];

const ProcessingPipeline = ({ currentStep, isProcessing }: ProcessingPipelineProps) => {
  return (
    <div className="glass-panel p-4 sm:p-6">
      <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-center">
        Secure Processing Pipeline
      </h3>
      <p className="text-[10px] sm:text-xs text-muted-foreground text-center mb-4 sm:mb-8">
        Every step enforces privacy by architecture
      </p>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-6 sm:top-8 left-0 right-0 h-0.5 bg-border hidden sm:block" />
        
        {/* Progress line */}
        <motion.div
          className="absolute top-6 sm:top-8 left-0 h-0.5 bg-primary hidden sm:block"
          initial={{ width: "0%" }}
          animate={{ width: isProcessing ? `${(currentStep / (steps.length - 1)) * 100}%` : "0%" }}
          transition={{ duration: 0.5 }}
        />

        {/* Steps - horizontal scroll on mobile */}
        <div className="relative flex gap-2 sm:gap-0 sm:justify-between overflow-x-auto pb-2 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {steps.map((step, index) => {
            const isActive = isProcessing && index === currentStep;
            const isComplete = isProcessing && index < currentStep;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center flex-shrink-0 w-14 sm:w-16"
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                  className={`
                    relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center
                    transition-all duration-300 z-10
                    ${isActive 
                      ? 'bg-primary shadow-lg' 
                      : isComplete
                        ? 'bg-primary/20 border border-primary/50'
                        : 'bg-muted border border-border'
                    }
                  `}
                >
                  <Icon className={`
                    w-5 h-5 sm:w-6 sm:h-6 transition-colors
                    ${isActive 
                      ? 'text-primary-foreground' 
                      : isComplete 
                        ? 'text-primary' 
                        : 'text-muted-foreground'
                    }
                  `} />
                  
                  {/* Active pulse effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-primary"
                      animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <p className={`
                  mt-2 sm:mt-3 text-[10px] sm:text-xs font-medium text-center
                  ${isActive ? 'text-primary' : isComplete ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step.label}
                </p>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground text-center mt-0.5 hidden lg:block">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Status message */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-8 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20 text-center"
        >
          <p className="text-xs sm:text-sm text-primary font-mono">
            {steps[currentStep]?.description}...
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProcessingPipeline;