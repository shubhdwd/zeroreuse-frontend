import { motion } from "framer-motion";
import { AlertTriangle, Eye, Database, Brain, CheckCircle, Shield } from "lucide-react";

const ProblemStatement = () => {
  const problems = [
    {
      icon: Database,
      title: "Hidden Storage",
      description: "Your personal photos stored on unknown servers indefinitely"
    },
    {
      icon: Brain,
      title: "Training Data",
      description: "Images used to train AI models without consent"
    },
    {
      icon: Eye,
      title: "Identity Risks",
      description: "Facial data and personal imagery exposed to third parties"
    },
    {
      icon: AlertTriangle,
      title: "Trust Policies",
      description: "Reliance on policy promises instead of technical guarantees"
    }
  ];

  return (
    <section id="problem-section" className="py-12 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4 sm:mb-6">
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-destructive" />
            <span className="text-xs sm:text-sm font-medium text-destructive">The Privacy Crisis</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            The <span className="text-destructive">Problem</span> With AI Image Tools
          </h2>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-lg px-4">
            With the increasing use of AI-based image editing tools, users frequently upload 
            personal photos without any technical assurance that their images are not stored, 
            reused, or indirectly learned by AI systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-4 sm:p-6 hover:border-destructive/40 transition-all group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8 md:p-12 border-success/30 text-center"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
            </div>
            <span className="text-xl sm:text-2xl text-muted-foreground">→</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
            <span className="text-primary">ZeroReuse AI</span> Solves This
          </h3>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            We enforce <span className="text-success font-semibold">technical non-reusability</span>. 
            Trust is not a policy—it's built into our architecture. Your images never leave 
            volatile memory, and are automatically destroyed after processing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;