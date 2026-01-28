import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Lock } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
  hasImage: boolean;
}

const PromptInput = ({
  prompt,
  onPromptChange,
  onProcess,
  isProcessing,
  hasImage,
}: PromptInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePromptChange = (value: string) => {
    onPromptChange(value);
  };

  return (
    <div className="glass-panel p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            Transformation Prompt
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Describe how you want to process the image
          </p>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-2 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3 sm:mb-4">
        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            Prompt Privacy:
          </span>{" "}
          Your prompt is processed in memory and immediately discarded. No
          storage, no logging.
        </p>
      </div>

      {/* Textarea */}
      <div
        className={`
          relative rounded-xl border-2 transition-all duration-200
          ${
            isFocused
              ? "border-primary bg-card shadow-lg shadow-primary/10"
              : "border-border bg-muted/30"
          }
        `}
      >
        <textarea
          value={prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="e.g. apply vintage tone, enhance lighting, blur face for privacy"
          className="w-full h-24 sm:h-28 p-3 sm:p-4 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
          disabled={isProcessing}
        />
      </div>

      {/* Process button */}
      <motion.button
        whileHover={{ scale: hasImage && prompt.trim() ? 1.02 : 1 }}
        whileTap={{ scale: hasImage && prompt.trim() ? 0.98 : 1 }}
        onClick={onProcess}
        disabled={isProcessing || !hasImage || !prompt.trim()}
        className={`
          w-full mt-4 sm:mt-6 py-3 sm:py-4 rounded-xl font-semibold
          transition-all duration-300 flex items-center justify-center gap-2
          ${
            isProcessing || !hasImage || !prompt.trim()
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          }
        `}
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span className="text-sm sm:text-base">
              Processing Securely...
            </span>
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Process Image</span>
          </>
        )}
      </motion.button>

      {/* Status hints */}
      {!hasImage && (
        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
          ↑ Upload an image to enable processing
        </p>
      )}

      {hasImage && !prompt.trim() && (
        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
          ↑ Enter a prompt to describe the transformation
        </p>
      )}
    </div>
  );
};

export default PromptInput;
