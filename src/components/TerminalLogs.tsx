import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "warning" | "security";
  message: string;
}

interface TerminalLogsProps {
  logs: LogEntry[];
}

const TerminalLogs = ({ logs }: TerminalLogsProps) => {
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
      case "security": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getTypePrefix = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "[SUCCESS]";
      case "warning": return "[WARNING]";
      case "security": return "[SECURITY]";
      default: return "[INFO]";
    }
  };

  return (
    <div className="glass-panel overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-mono text-muted-foreground">Audit Log</span>
        </div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="h-64 overflow-y-auto scrollbar-cyber p-4 terminal bg-card/80"
      >
        {logs.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-primary">❯</span>
            <span>Awaiting secure processing session...</span>
            <span className="animate-blink">▌</span>
          </div>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 mb-1.5 font-mono text-xs"
            >
              <span className="text-muted-foreground/60 shrink-0">{log.timestamp}</span>
              <span className={`shrink-0 ${getTypeColor(log.type)}`}>
                {getTypePrefix(log.type)}
              </span>
              <span className="text-foreground/90">{log.message}</span>
            </motion.div>
          ))
        )}
        
        {logs.length > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <span className="text-primary">❯</span>
            <span className="animate-blink">▌</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalLogs;