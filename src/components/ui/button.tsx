import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// EMBER GLASS: Botones con estética de piedras de río pulidas
const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap font-medium 
   transition-all duration-300 ease-out transform-gpu will-change-transform
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]`,
  {
    variants: {
      variant: {
        // Botón primario - Magma Orange con glow cálido
        default: `
          bg-primary text-white font-medium tracking-wide
          rounded-full
          shadow-[0_4px_20px_rgba(255,77,0,0.25)]
          hover:bg-primary-hover hover:shadow-[0_8px_30px_rgba(255,77,0,0.35)]
          hover:scale-[1.02]
        `,
        
        // Botón outline - Cristal con borde sutil
        outline: `
          bg-transparent text-text-main font-medium tracking-wide
          rounded-full
          border border-text-main/15
          hover:border-primary/40 hover:text-primary
          hover:shadow-[0_4px_20px_rgba(255,77,0,0.1)]
        `,
        
        // Botón secundario - Superficie elevada
        secondary: `
          bg-white/80 text-text-main font-medium
          rounded-full backdrop-blur-sm
          border border-text-main/5
          shadow-[0_2px_12px_rgba(26,24,24,0.06)]
          hover:bg-white hover:shadow-[0_4px_20px_rgba(26,24,24,0.1)]
        `,
        
        // Botón ghost - Mínimo, solo texto
        ghost: `
          text-text-muted font-medium
          rounded-full
          hover:text-text-main hover:bg-text-main/5
        `,
        
        // Botón link - Estilo editorial
        link: `
          text-primary underline-offset-4 hover:underline font-medium
          tracking-wide hover:text-primary-hover
        `,

        // Botón destructivo
        destructive: `
          bg-red-500 text-white font-medium
          rounded-full
          shadow-[0_4px_20px_rgba(239,68,68,0.25)]
          hover:bg-red-600 hover:shadow-[0_8px_30px_rgba(239,68,68,0.35)]
        `,
      },
      size: {
        default: "h-12 px-7 text-sm",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
