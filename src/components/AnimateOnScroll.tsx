import { useInView } from "@/hooks/useInView";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-in-right";
  delay?: string;
}

const AnimateOnScroll = ({
  children,
  className = "",
  animation = "fade-up",
  delay,
}: AnimateOnScrollProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? `animate-${animation}` : "opacity-0"}`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
