import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

const guarantees = [
  { label: "No server transmission", value: true },
  { label: "No disk storage", value: true },
  { label: "No cloud backup", value: true },
  { label: "No model training", value: true },
  { label: "No session persistence", value: true },
  { label: "Automatic memory purge", value: true },
];

const PrivacyGuarantees = () => {
  return (
    <div className="glass-panel p-4 sm:p-6 border-success/20">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-success/10 flex items-center justify-center">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">ZeroReuse Guarantee</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Architecture-enforced privacy</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {guarantees.map((guarantee, index) => (
          <motion.div
            key={guarantee.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success" />
            </div>
            <span className="text-xs sm:text-sm text-foreground">{guarantee.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
          <span className="text-success font-semibold">✓ Trust by Architecture</span>
          <span className="mx-1 sm:mx-2">-</span>
          <span className="hidden sm:inline">Privacy enforced by system design, not policy promises</span>
          <span className="sm:hidden">System design enforced</span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyGuarantees;