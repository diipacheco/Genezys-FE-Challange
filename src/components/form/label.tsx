import * as React from 'react'

import { cn } from '@/lib/utils'

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, ...props }, ref) => {
    return (
      <label
        htmlFor={htmlFor}
        className={cn(
          'block text-foreground text-sm font-bold mb-2',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Label.displayName = 'Label'

export { Label }