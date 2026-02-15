import { cn } from "@/lib/utils";

interface StepActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function StepActionButton({
  onClick,
  disabled,
  children,
  className,
}: StepActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200",
        "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
        "hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg",
        "active:translate-y-0",
        className
      )}
    >
      {children}
    </button>
  );
}
