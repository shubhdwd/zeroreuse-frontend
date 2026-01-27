import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Lock, Palette, Sparkles, Zap } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
  hasImage: boolean;
}

const examplePrompts = [
  { text: "Make it cartoon style", icon: Palette },
  { text: "Apply vintage filter", icon: Sparkles },
  { text: "Add dramatic lighting", icon: Zap },
  { text: "Cinematic lighting", icon: Zap },
  { text: "Studio-grade clarity", icon: Sparkles },
  { text: "Soft portrait enhancement", icon: Palette },
  { text: "Cyberpunk neon tone", icon: Zap },
  { text: "Minimal professional aesthetic", icon: Sparkles },
];

const PromptInput = ({ prompt, onPromptChange, onProcess, isProcessing, hasImage }: PromptInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const handlePromptSelect = (text: string) => {
    setActivePrompt(text);
    onPromptChange(text);
  };

  // Clear active state when prompt is manually edited or cleared
  const handlePromptChange = (value: string) => {
    onPromptChange(value);
    // If the value doesn't match any example prompt, clear active state
    if (!examplePrompts.some(p => p.text === value)) {
      setActivePrompt(null);
    }
  };

  return (
    <div className="glass-panel p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">Transformation Prompt</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Describe your desired effect</p>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-2 p-2.5 sm:p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3 sm:mb-4">
        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Prompt Privacy:</span> Your prompt is processed and immediately discarded. No history, no logging.
        </p>
      </div>

      {/* Textarea */}
      <div className={`
        relative rounded-xl border-2 transition-all duration-200
        ${isFocused ? 'border-primary bg-card shadow-lg shadow-primary/10' : 'border-border bg-muted/30'}
      `}>
        <textarea
          value={prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Describe how you want to transform your image..."
          className="w-full h-24 sm:h-28 p-3 sm:p-4 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
          disabled={isProcessing}
        />
      </div>

      {/* Example prompts */}
      <div className="mt-3 sm:mt-4">
        <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-[120px] sm:max-h-none overflow-y-auto sm:overflow-visible pb-1">
          {examplePrompts.map((example) => {
            const isActive = activePrompt === example.text;
            return (
              <button
                key={example.text}
                onClick={() => handlePromptSelect(example.text)}
                disabled={isProcessing}
                className={`
                  inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs 
                  transition-all duration-300 ease-out disabled:opacity-50 touch-manipulation
                  ${isActive 
                    ? 'bg-primary/20 text-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.4)] ring-1 ring-primary/30' 
                    : 'bg-muted text-foreground hover:bg-muted/80 hover:shadow-[0_0_8px_1px_hsl(var(--primary)/0.25)] hover:ring-1 hover:ring-primary/20 active:bg-primary/15 active:shadow-[0_0_10px_1px_hsl(var(--primary)/0.3)]'
                  }
                `}
              >
                <example.icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isActive ? 'text-primary' : 'text-primary'}`} />
                {example.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Process button */}
      <motion.button
        whileHover={{ scale: hasImage && prompt.trim() ? 1.02 : 1 }}
        whileTap={{ scale: hasImage && prompt.trim() ? 0.98 : 1 }}
        onClick={onProcess}
        disabled={isProcessing || !hasImage || !prompt.trim()}
        className={`
          w-full mt-4 sm:mt-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg
          transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3
          ${isProcessing || !hasImage || !prompt.trim()
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
          }
        `}
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span className="text-sm sm:text-base">Processing Securely...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Process Image</span>
          </>
        )}
      </motion.button>

      {/* Status message */}
      {!hasImage && (
        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
          ↑ Upload an image first to enable processing
        </p>
      )}
      {hasImage && !prompt.trim() && (
        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
          ↑ Enter a prompt to describe your transformation
        </p>
      )}
    </div>
  );
};

export default PromptInput;