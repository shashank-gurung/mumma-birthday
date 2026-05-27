interface SectionContainerProps {
  children: React.ReactNode
  className?: string
}

export function SectionContainer({
  children,
  className = '',
}: SectionContainerProps) {
  return (
    <section
      className={`
        relative z-10 mx-auto 
        flex w-full max-w-lg flex-col items-center 
        gap-10 px-5 pb-32 pt-20
        sm:max-w-xl md:max-w-2xl
        ${className}
      `}
    >
      {children}
    </section>
  )
}
