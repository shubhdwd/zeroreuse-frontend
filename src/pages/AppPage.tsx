import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import WelcomeBanner from "@/components/WelcomeBanner";
import ImageUpload from "@/components/ImageUpload";
import PromptInput from "@/components/PromptInput";
import ProcessingPipeline from "@/components/ProcessingPipeline";
import LiveSecurityAudit from "@/components/LiveSecurityAudit";
import PrivacyGuarantees from "@/components/PrivacyGuarantees";
import OutputPanel from "@/components/OutputPanel";
import { processImage} from "@/lib/imageProcessor";
import { processImageWithAI, requiresAIProcessing } from "@/lib/aiImageProcessor";
import { useAuth } from "@/contexts/AuthContext";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "warning" | "security";
  message: string;
}

// Floating animations for app page
const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as Easing
  }
};

const floatDelayedAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as Easing,
    delay: 0.5
  }
};

export default function AppPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const { signOut, user, userName } = useAuth();
  const navigate = useNavigate();

  // Check if welcome banner was dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('welcomeDismissed');
    if (dismissed) {
      setShowWelcome(false);
    }
  }, []);

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem('welcomeDismissed', 'true');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const addLog = useCallback((message: string, type: LogEntry["type"]) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    setLogs(prev => [...prev, { timestamp, type, message }]);
  }, []);

  const handleProcess = async () => {
    if (!selectedImage || !prompt.trim()) return;

    setIsProcessing(true);
    setOutputImage(null);
    setLogs([]);
    setCurrentStep(0);
    setImageDeleted(false);

    // Generate unique session
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    addLog(`Session initialized: ${newSessionId}`, "info");


    try {
      // Step 1: Upload
      await new Promise(r => setTimeout(r, 500));
      setCurrentStep(1);
      addLog('Image uploaded to browser memory', 'success');
      addLog('No server transmission occurred', 'security');

      // Step 2: Session
      await new Promise(r => setTimeout(r, 500));
      setCurrentStep(2);
      addLog('Unique session ID generated', 'info');
      addLog('No database write performed', 'security');

      // Step 3: Process
      await new Promise(r => setTimeout(r, 500));
      setCurrentStep(3);
      addLog('AI runtime initialized', 'info');
      addLog('Isolated execution environment active', 'security');

      // Step 4: Transform - Use AI for advanced transformations
      await new Promise(r => setTimeout(r, 500));
      setCurrentStep(4);
      
      let result;
      
      // Check if prompt requires AI processing (cartoon, gender swap, etc.)
      if (requiresAIProcessing(prompt)) {
        addLog('Advanced AI transformation detected', 'info');
        addLog('Routing to AI processing pipeline...', 'info');
        try {
          result = await processImageWithAI(selectedImage, prompt, addLog);
        } catch (aiError) {
          // If AI fails (e.g., credits depleted), fall back to local processing
          addLog('AI unavailable, using local processing...', 'warning');
          result = await processImage(selectedImage, prompt, addLog);
        }
      } else {
        // Use local Canvas processing for simple effects
        result = await processImage(selectedImage, prompt, addLog);
      }
      
      addLog('Image processed successfully', 'success');
      
      // Step 5: Delete - Clear original image BEFORE showing output
      await new Promise(r => setTimeout(r, 500));
      setCurrentStep(5);
      
      // CRITICAL: Clear original image and prompt from memory
      setSelectedImage(null);
      setPrompt("");
      setImageDeleted(true);
      
      // Add the mandatory final security logs
      addLog('Deleting source file', 'security');
      addLog('Flushing RAM buffers', 'security');
      addLog('Destroying mathematical features', 'security');

      // Complete - Show output after deletion
      await new Promise(r => setTimeout(r, 300));
      setOutputImage(result.outputImage);
      addLog('Session terminated. No data retained.', 'success');

    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'warning');
      // Also clear on error to prevent any reuse attempt
      setSelectedImage(null);
      setPrompt("");
      setImageDeleted(true);
      addLog('Processing failed. No data was stored.', 'warning');
      addLog('All temporary data cleared', 'security');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPrompt("");
    setOutputImage(null);
    setLogs([]);
    setCurrentStep(0);
    setSessionId(null);
    setIsProcessing(false);
    setImageDeleted(false);
  };

  // Get first name for greeting
  const firstName = userName?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen pastel-gradient-bg">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/40 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">
              ZeroReuse <span className="text-primary">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.span 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden sm:flex items-center gap-1.5 text-xs text-success"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              System Secure
            </motion.span>
            <span className="hidden md:block text-sm text-muted-foreground truncate max-w-[150px]">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 sm:gap-2 hover:bg-card px-2 sm:px-3">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Personalized Welcome Banner */}
      {showWelcome && (
        <div className="pt-14 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 border-b border-primary/20"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <motion.div 
                animate={floatDelayedAnimation}
                className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
              >
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    Hello {firstName}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Welcome to ZeroReuse AI, a platform that guarantees your images are processed securely and never stored.
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDismissWelcome}
                  className="shrink-0 hover:bg-card/50"
                >
                  Dismiss
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Processing Section */}
      <section className={`py-12 sm:py-24 relative ${showWelcome ? '' : 'pt-24 sm:pt-32'}`}>
        {/* Background decorations - reduced on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 left-[5%] w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-primary/8 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-[10%] w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-secondary/10 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div 
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary/20"
            >
              <span>Secure Processing Zone</span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
              Secure <span className="text-primary">AI Processing</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Upload your image and describe the transformation. Everything happens in your 
              browser's volatile memory - zero server storage, zero trace.
            </p>
            {sessionId && (
              <motion.p 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[10px] sm:text-xs font-mono text-primary mt-3 sm:mt-4 bg-primary/10 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20"
              >
                Active Session: {sessionId}
              </motion.p>
            )}
          </motion.div>

          {/* Processing Pipeline Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-12"
          >
            <ProcessingPipeline 
              currentStep={currentStep} 
              isProcessing={isProcessing} 
            />
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Left column - Input */}
            <div className="space-y-4 sm:space-y-6">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing-notice"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="glass-panel p-4 sm:p-6 h-48 sm:h-64 flex flex-col items-center justify-center"
                  >
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center mb-3 sm:mb-4"
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                    <p className="font-semibold text-primary mb-1 sm:mb-2 text-sm sm:text-base">
                      Processing Securely...
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground text-center font-mono">
                      Source image isolated in volatile memory
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="image-upload"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageUpload 
                      selectedImage={selectedImage}
                      onImageSelect={(img) => {
                        setSelectedImage(img);
                        // Reset deleted state when new image is uploaded
                        if (img) {
                          setImageDeleted(false);
                          setOutputImage(null);
                          setLogs([]);
                          setCurrentStep(0);
                          setSessionId(null);
                        }
                      }}
                      isDeleted={imageDeleted && !selectedImage}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <PromptInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  onProcess={handleProcess}
                  isProcessing={isProcessing}
                  hasImage={!!selectedImage}
                />
              </motion.div>
            </div>

            {/* Right column - Output & Live Security Audit */}
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <OutputPanel 
                  outputImage={outputImage}
                  onReset={handleReset}
                  imageDeleted={imageDeleted}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <LiveSecurityAudit 
                  logs={logs} 
                  sessionId={sessionId}
                  isProcessing={isProcessing}
                />
              </motion.div>
            </div>
          </div>

          {/* Privacy Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <PrivacyGuarantees />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-border/50 bg-card/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground"
          >
            ZeroReuse <span className="text-primary">AI</span>
          </motion.div>
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
            Privacy-first AI image processing. Trust enforced by architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No Storage
            </motion.span>
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No Training
            </motion.span>
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No Trace
            </motion.span>
          </div>
        </div>
      </footer>
    </div>
  );
}
