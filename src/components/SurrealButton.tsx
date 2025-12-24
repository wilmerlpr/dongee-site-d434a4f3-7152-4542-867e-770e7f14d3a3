import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

export const SurrealButton = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  const baseStyles = "relative px-6 py-3 font-bold uppercase tracking-widest transition-all transform border-2 active:scale-95";
  const variants = {
    primary: "border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]",
    danger: "border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:rotate-2"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 animate-pulse z-0" />
    </motion.button>
  );
};