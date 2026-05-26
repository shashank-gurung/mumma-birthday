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
      numberOfPieces={400}
      gravity={0.25}
      colors={['#ffb8d4', '#ff9ec5', '#ffd6e8', '#f9a8d4', '#fce7f3', '#fbbf24']}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
    />
  )
}
