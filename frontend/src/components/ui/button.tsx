import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";
    
    const variants = {
      default: "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 shadow-sm",
      secondary: "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-white/10 shadow-sm",
      outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--card)] hover:text-[var(--foreground)]",
      ghost: "hover:bg-[var(--card)] hover:text-[var(--foreground)]",
      danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }
    
    const classNames = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`;
    
    return (
      <button
        className={classNames}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
