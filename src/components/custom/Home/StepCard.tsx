interface StepCardProps {
  number: number
  title: string
  description: string
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="melixir-card-glass rounded-lg p-6 relative overflow-hidden transition-all hover:border-melixir-purple/30 melixir-animate-on-scroll opacity-0">
      <span className="absolute -right-4 -top-4 text-7xl font-bold opacity-10">{number}</span>
      <h3 className="font-grotesk font-bold text-xl mb-3 melixir-text-gradient">{title}</h3>
      <p className="text-melixir-light/70">{description}</p>
    </div>
  )
}
