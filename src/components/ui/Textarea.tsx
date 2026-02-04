import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s/g, '-')}`
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-slate-500 uppercase tracking-[0.3em] mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
            className={`w-full px-4 py-3 rounded-2xl border bg-white/90 text-slate-900 placeholder-slate-400 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-colors focus:outline-none focus:ring-2 focus:ring-sky-200/80 focus:border-sky-300 disabled:opacity-50 disabled:cursor-not-allowed resize-y ${
              error
                ? 'border-red-400 focus:border-red-400 focus:ring-red-200/80'
                : 'border-black/10'
            } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
