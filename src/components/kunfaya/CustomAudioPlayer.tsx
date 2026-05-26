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
      className="w-full max-w-sm rounded-3xl border border-violet-400/20 bg-white/5 p-6 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
    >
      <audio ref={audioRef} src={ASSETS.audio.kunFayaKun} preload="metadata" />

      <div className="mb-6 flex items-center justify-center gap-1 h-12">
        {[...Array(24)].map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-violet-300/80"
            animate={
              playing
                ? {
                    height: [8, 12 + Math.sin(i) * 16, 8],
                  }
                : { height: 8 }
            }
            transition={
              playing
                ? { duration: 0.5 + (i % 5) * 0.1, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <input
        type="range"
        min={0}
        max={duration || 100}
        value={progress}
        onChange={seek}
        className="mb-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-violet-900/50 accent-violet-300"
        style={{
          background: `linear-gradient(to right, rgb(196 181 253) ${pct}%, rgba(76,29,149,0.4) ${pct}%)`,
        }}
        aria-label="Seek"
      />

      <div className="mb-6 flex justify-between text-xs text-violet-200/60">
        <span>{format(progress)}</span>
        <span>{format(duration)}</span>
      </div>

      <motion.button
        type="button"
        onClick={toggle}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 text-2xl text-white shadow-[0_8px_32px_rgba(139,92,246,0.5)]"
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? '⏸' : '▶'}
      </motion.button>

      <p className="mt-4 text-center text-xs text-violet-200/50">
        Kun Faya Kun · Rockstar
      </p>
    </div>
  )
}
