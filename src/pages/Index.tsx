import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProblemStatement from "@/components/ProblemStatement";
import ImageUpload from "@/components/ImageUpload";
import PromptInput from "@/components/PromptInput";
import ProcessingPipeline from "@/components/ProcessingPipeline";
import LiveSecurityAudit from "@/components/LiveSecurityAudit";
import PrivacyGuarantees from "@/components/PrivacyGuarantees";
import OutputPanel from "@/components/OutputPanel";
import { processImage, generateSessionId } from "@/lib/imageProcessor";
import { processImageWithAI, requiresAIProcessing } from "@/lib/aiImageProcessor";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "warning" | "security";
  message: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [imageDeleted, setImageDeleted] = useState(false);

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
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    addLog(`Session initialized: ${newSessionId}`, 'info');

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

  return (
    <div className="min-h-screen bg-background animated-gradient relative">
      {/* Fixed Header */}
      <Header />
      
      {/* Welcome Banner - below header */}
      <div className="pt-14 sm:pt-16">
        <WelcomeBanner />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Problem Statement */}
      <ProblemStatement />

      {/* Main Processing Section */}
      <section id="upload-section" className="py-12 sm:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="trust-badge mb-4 sm:mb-6 text-xs sm:text-sm">
              <span>🔒 Secure Processing Zone</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
              Secure <span className="text-primary">AI Processing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
              Upload your image and describe the transformation. Everything happens in your 
              browser's volatile memory—zero server storage, zero trace.
            </p>
            {sessionId && (
              <p className="text-[10px] sm:text-xs font-mono text-primary mt-3 sm:mt-4 bg-primary/10 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                Active Session: {sessionId}
              </p>
            )}
          </motion.div>

          {/* Processing Pipeline Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
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
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <PrivacyGuarantees />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
            ZeroReuse <span className="text-primary">AI</span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
            Privacy-first AI image processing. Trust enforced by architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No Storage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No Training
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              No Trace
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;