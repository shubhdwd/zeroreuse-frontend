import { motion } from "framer-motion";
import { CheckCircle, Trash2 } from "lucide-react";

interface ImagePurgedConfirmationProps {
  timestamp?: string;
}

const ImagePurgedConfirmation = ({ timestamp }: ImagePurgedConfirmationProps) => {
  const deletionTime = timestamp || new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-6 text-center border-success/30"
    >
      <div className="flex justify-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-success" />
        </div>
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Trash2 className="w-7 h-7 text-primary" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">
        Image Successfully Processed
      </h3>
      
      <p className="text-lg text-primary font-medium mb-3">
        Your image has been permanently purged
      </p>
      
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-mono">
        <span>Deletion confirmed at</span>
        <span className="text-foreground font-semibold">{deletionTime}</span>
      </div>
    </motion.div>
  );
};

export default ImagePurgedConfirmation;