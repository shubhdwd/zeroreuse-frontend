import { motion } from "framer-motion";
import { Download, RefreshCw, CheckCircle, Trash2, Upload } from "lucide-react";

interface OutputPanelProps {
  outputImage: string | null;
  onReset: () => void;
  imageDeleted?: boolean;
}

const OutputPanel = ({ outputImage, onReset, imageDeleted = false }: OutputPanelProps) => {
  const handleDownload = () => {
    if (!outputImage) return;
    
    const link = document.createElement('a');
    link.href = outputImage;
    link.download = `zeroreuse-output-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Empty state - no image uploaded
  if (!outputImage && !imageDeleted) {
    return (
      <div className="glass-panel p-4 sm:p-6 h-full flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px]">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4">
          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-center font-medium text-sm sm:text-base">
          Upload an image to process securely
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/70 text-center mt-1 sm:mt-2">
          Your processed image will appear here
        </p>
      </div>
    );
  }

  // Success state - image processed
  if (outputImage) {
    const deletionTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-4 sm:p-6 border-success/30"
      >
        {/* Success header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Image Successfully Processed</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Ready for download</p>
            </div>
          </div>
        </div>

        {/* Output image */}
        <div className="relative rounded-xl overflow-hidden border border-success/20 mb-3 sm:mb-4">
          <img
            src={outputImage}
            alt="Processed output"
            className="w-full h-48 sm:h-64 object-contain bg-muted/50"
          />
          
          {/* Success overlay */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-success/10 backdrop-blur-sm border border-success/20">
            <span className="text-[10px] sm:text-xs font-mono text-success">✓ Zero memory footprint</span>
          </div>
        </div>

        {/* Purge confirmation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-1 sm:gap-2">
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Your image has been permanently purged
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
            at {deletionTime}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 sm:py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm sm:text-base touch-manipulation"
          >
            <Download className="w-4 h-4" />
            Download Image
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2.5 sm:py-3 rounded-xl font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
          >
            <RefreshCw className="w-4 h-4" />
            New Session
          </button>
        </div>
      </motion.div>
    );
  }

  // Error/deleted state
  return (
    <div className="glass-panel p-4 sm:p-6 h-full flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px]">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4">
        <Download className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-center text-sm sm:text-base">
        Processing failed. No data was stored.
      </p>
    </div>
  );
};

export default OutputPanel;