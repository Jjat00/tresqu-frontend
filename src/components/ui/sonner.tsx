import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!bg-[#4ade80] !text-black !font-medium !border-[#22c55e]",
          error:
            "!bg-[hsl(0_63%_31%)] !text-white !font-medium !border-red-800",
          warning: "!bg-amber-600 !text-white !font-medium !border-amber-800",
          info: "!bg-[#60a5fa] !text-white !font-medium !border-[#3b82f6]",
        },
        duration: 4000,
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
