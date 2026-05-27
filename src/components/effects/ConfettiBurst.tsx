import Confetti from 'react-confetti'
import { useWindowSize } from '../../hooks/useWindowSize'

interface ConfettiBurstProps {
  active: boolean
}

export function ConfettiBurst({ active }: ConfettiBurstProps) {
  const { width, height } = useWindowSize()

  if (!active || width === 0) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.18}
      wind={0.01}
      colors={[
        '#d4a574', // gold
        '#f5e6c8', // gold-soft
        '#ffdad0', // rose-soft
        '#c76a5e', // rose-accent
        '#fffaf5', // cream
        '#b8956a', // gold-deep
      ]}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
    />
  )
}
