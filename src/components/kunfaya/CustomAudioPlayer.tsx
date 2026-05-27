import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ASSETS } from '../../lib/constants'

export function CustomAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      void audio.play()
      setPlaying(true)
    }
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const t = parseFloat(e.target.value)
    audio.currentTime = t
    setProgress(t)
  }

  const format = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div
      data-page-content
      className="w-full max-w-sm"
    >
      {/* Glass card container */}
      <div 
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          backdropFilter: 'blur(24px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          border: '1px solid rgba(212,165,116,0.1)',
        }}
      >
        <audio ref={audioRef} src={ASSETS.audio.kunFayaKun} preload="metadata" />

        {/* Waveform visualization */}
        <div className="mb-8 flex items-center justify-center gap-[3px] h-14">
          {[...Array(32)].map((_, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full"
              style={{
                background: 'linear-gradient(to top, var(--color-gold), var(--color-gold-soft))',
              }}
              animate={
                playing
                  ? {
                      height: [6, 10 + Math.sin(i * 0.5) * 20, 6],
                      opacity: [0.5, 0.9, 0.5],
                    }
                  : { height: 6, opacity: 0.3 }
              }
              transition={
                playing
                  ? { duration: 0.4 + (i % 4) * 0.1, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.4 }
              }
            />
          ))}
        </div>

        {/* Progress track */}
        <div className="relative mb-2">
          <div 
            className="absolute inset-0 h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div 
              className="h-full rounded-full transition-all duration-100"
              style={{ 
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--color-gold-deep), var(--color-gold))',
              }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={seek}
            className="relative z-10 h-1 w-full cursor-pointer opacity-0"
            aria-label="Seek"
          />
        </div>

        {/* Time display */}
        <div className="mb-6 flex justify-between font-body text-[11px] tracking-wide text-gold-soft/50">
          <span>{format(progress)}</span>
          <span>{format(duration)}</span>
        </div>

        {/* Play/Pause button */}
        <div className="flex justify-center">
          <motion.button
            type="button"
            onClick={toggle}
            className="relative flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-deep))',
              boxShadow: '0 8px 32px rgba(212,165,116,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-night-deep">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-night-deep ml-1">
                <path d="M8 5.14v13.72a1 1 0 001.52.85l10.1-6.86a1 1 0 000-1.7l-10.1-6.86A1 1 0 008 5.14z" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Song info */}
        <div className="mt-6 text-center">
          <p className="font-display text-sm text-gold-soft/90">Kun Faya Kun</p>
          <p className="mt-1 font-body text-[11px] tracking-wide text-gold-soft/40">Rockstar</p>
        </div>
      </div>
    </div>
  )
}
