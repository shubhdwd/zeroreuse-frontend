import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left - App name and subtitle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-foreground">
              ZeroReuse <span className="text-primary">AI</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Privacy-Safe Image Processing</p>
          </div>
        </div>

        {/* Right - Status indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-success/10 border border-success/20">
          <div className="relative">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-success status-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-success">
            <span className="hidden sm:inline">System </span>Secure
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;