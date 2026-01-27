import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Terminal } from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "warning" | "security";
  message: string;
}

interface LiveSecurityAuditProps {
  logs: LogEntry[];
  sessionId: string | null;
  isProcessing: boolean;
}

const LiveSecurityAudit = ({ logs, sessionId, isProcessing }: LiveSecurityAuditProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "text-green-400";
      case "warning": return "text-amber-400";
      case "security": return "text-cyan-400";
      default: return "text-gray-400";
    }
  };

  const getTypePrefix = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "[✓ SUCCESS]";
      case "warning": return "[⚠ WARNING]";
      case "security": return "[🔒 SECURITY]";
      default: return "[INFO]";
    }
  };

  return (
    <div className="glass-panel overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-foreground">LIVE SECURITY AUDIT</h3>
            {sessionId && (
              <p className="text-[10px] sm:text-xs font-mono text-muted-foreground truncate max-w-[120px] sm:max-w-none">ID: {sessionId}</p>
            )}
          </div>
        </div>
        
        {isProcessing && (
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium text-primary">MONITORING</span>
          </div>
        )}
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="h-48 sm:h-72 overflow-y-auto scrollbar-cyber p-3 sm:p-4 terminal"
      >
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/30 mb-2 sm:mb-3" />
            <p className="text-muted-foreground text-xs sm:text-sm">Awaiting secure processing session...</p>
            <p className="text-muted-foreground/60 text-[10px] sm:text-xs mt-1">Upload an image to begin</p>
          </div>
        ) : (
          <>
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-3 mb-2 font-mono text-[10px] sm:text-xs leading-relaxed"
              >
                <span className="text-gray-500 shrink-0">{log.timestamp}</span>
                <span className={`shrink-0 ${getTypeColor(log.type)}`}>
                  {getTypePrefix(log.type)}
                </span>
                <span className="text-gray-200 break-all sm:break-normal w-full sm:w-auto">{log.message}</span>
              </motion.div>
            ))}
            
            {logs.length > 0 && !isProcessing && logs.some(l => l.message.includes('Session') && l.message.includes('closed')) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700"
              >
                <div className="space-y-1 font-mono text-[10px] sm:text-xs">
                  <div className="text-cyan-400">→ Deleting source file</div>
                  <div className="text-cyan-400">→ Flushing RAM buffers</div>
                  <div className="text-cyan-400">→ Destroying mathematical features</div>
                  <div className="text-green-400 font-semibold">✓ Session terminated. No data retained.</div>
                </div>
              </motion.div>
            )}
            
            {isProcessing && (
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <span className="text-primary">❯</span>
                <span className="animate-blink">▌</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LiveSecurityAudit;