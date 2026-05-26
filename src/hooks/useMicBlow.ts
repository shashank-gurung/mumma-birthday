import { useCallback, useEffect, useRef, useState } from 'react'

interface UseMicBlowOptions {
  threshold?: number
  onBlow: () => void
  enabled?: boolean
}

export function useMicBlow({
  threshold = 0.55,
  onBlow,
  enabled = true,
}: UseMicBlowOptions) {
  const [listening, setListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const triggered = useRef(false)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef<number>(0)
  const streamRef = useRef<MediaStream | null>(null)

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    analyserRef.current = null
    setListening(false)
  }, [])

  const start = useCallback(async () => {
    if (!enabled || triggered.current) return
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const ctx = new AudioContext()
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser
      setListening(true)

      const data = new Uint8Array(analyser.frequencyBinCount)

      const tick = () => {
        if (!analyserRef.current || triggered.current) return
        analyserRef.current.getByteFrequencyData(data)
        const avg = data.reduce((a, b) => a + b, 0) / data.length / 255
        if (avg > threshold) {
          triggered.current = true
          onBlow()
          stop()
          return
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch {
      setError('Microphone unavailable — tap the candles instead')
    }
  }, [enabled, onBlow, stop, threshold])

  const reset = useCallback(() => {
    triggered.current = false
  }, [])

  useEffect(() => () => stop(), [stop])

  return { start, stop, listening, error, reset, triggered: triggered.current }
}
