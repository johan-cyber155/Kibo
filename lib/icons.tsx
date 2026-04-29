import {
  Cpu,
  Eye,
  Printer,
  Zap,
  Layers,
  Crown,
  type LucideIcon,
  type LucideProps,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Eye,
  Printer,
  Zap,
  Layers,
  Crown,
}

export function DynamicIcon({
  name,
  ...props
}: { name: string | null | undefined } & LucideProps) {
  if (!name) return null
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon {...props} />
}
