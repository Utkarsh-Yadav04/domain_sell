import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ════════════════════════════════════════════════════════════════
   CONFIG — Change these to customize in 5 seconds
   ════════════════════════════════════════════════════════════════ */

const DOMAINS = ['lnuniverse.org', 'lnuniverse.events']

const CONTACT = {
  email: 'utxydv@gmail.com',
  telegram: { handle: '@utxyd', url: 'https://t.me/utxyd' },
}

const PHOTO = '/me-back.jpg'

/* ════════════════════════════════════════════════════════════════ */

const spring = { stiffness: 300, damping: 30 }
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, ...spring },
  },
}

/* ─── SVG: Grain Texture ─── */
function Grain() {
  return (
    <svg className="grain" width="100%" height="100%">
      <filter id="g">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" />
    </svg>
  )
}

/* ─── SVG: Gmail Icon ─── */
function GmailIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path d="M1.5 13.5h3V6.75L0 4.5v7.5c0 .83.67 1.5 1.5 1.5z" fill="#4285F4" />
      <path d="M13.5 13.5h3c.83 0 1.5-.67 1.5-1.5V4.5l-4.5 2.25" fill="#34A853" />
      <path d="M13.5 1.5v5.25L18 4.5V2.25c0-1.85-2.11-2.9-3.6-1.8" fill="#FBBC04" />
      <path d="M4.5 6.75V1.5l4.5 3.38L13.5 1.5v5.25L9 10.13" fill="#EA4335" />
      <path d="M0 2.25V4.5l4.5 2.25V1.5L3.6.45C2.11-.65 0 .4 0 2.25" fill="#C5221F" />
    </svg>
  )
}

/* ─── SVG: Telegram Icon ─── */
function TelegramIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.2 3.17l-3.04 15.3c-.2.97-.79 1.22-1.6.76l-4.42-3.26-2.13 2.06c-.24.23-.44.43-.89.43l.32-4.47L18.12 6c.37-.33-.08-.51-.57-.18l-10.3 6.5-4.44-1.39c-.97-.3-.98-.97.2-1.44l17.36-6.69c.8-.3 1.5.18 1.24 1.44z"
        fill={hovered ? '#229ED9' : '#78756F'}
        style={{ transition: 'fill 300ms ease' }}
      />
    </svg>
  )
}

/* ─── SVG: Copy Icon ─── */
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="9" y="9" width="13" height="13" rx="2.5" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

/* ─── SVG: Check Icon ─── */
function CheckIcon() {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#166534"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </motion.svg>
  )
}

/* ─── SVG: Mailto Arrow ─── */
function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#78756F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════════════════════ */
export default function App() {
  const [copied, setCopied] = useState(false)
  const [tgHovered, setTgHovered] = useState(false)

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(CONTACT.email)
    } catch {
      const t = document.createElement('textarea')
      t.value = CONTACT.email
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <>
      <Grain />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          padding: '24px',
          maxWidth: '480px',
          width: '100%',
        }}
      >
        {/* ── Portrait Capsule ── */}
        <motion.div variants={fadeUp} className="capsule">
          <div className="capsule-inner">
            <img src={PHOTO} alt="" draggable={false} />
          </div>
        </motion.div>

        {/* ── Domain Names ── */}
        <motion.div variants={fadeUp} className="domain-pair">
          <span>{DOMAINS[0]}</span>
          <span className="domain-slash">/</span>
          <span>{DOMAINS[1]}</span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          variants={fadeUp}
          style={{ textAlign: 'center' }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              color: '#141413',
              marginBottom: '8px',
            }}
          >
            This domain is for sale.
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              fontWeight: 400,
              color: '#78756F',
              lineHeight: 1.5,
            }}
          >
            Contact me directly if you'd like to buy it.
          </p>
        </motion.div>

        {/* ── Contact Pills ── */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Gmail pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <a
              href={`mailto:${CONTACT.email}?subject=Domain%20Inquiry`}
              className="pill"
              aria-label="Send email"
            >
              <GmailIcon />
              <span>{CONTACT.email}</span>
            </a>

            {/* Copy micro-button */}
            <button
              className="copy-btn"
              onClick={handleCopy}
              aria-label="Copy email"
              type="button"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <CheckIcon key="check" />
                ) : (
                  <motion.div
                    key="copy"
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <CopyIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mailto arrow */}
            <a
              href={`mailto:${CONTACT.email}?subject=Domain%20Inquiry`}
              className="copy-btn"
              aria-label="Open email client"
              style={{ textDecoration: 'none' }}
            >
              <ArrowIcon />
            </a>
          </div>

          {/* Telegram pill */}
          <a
            href={CONTACT.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
            aria-label="Open Telegram"
            onMouseEnter={() => setTgHovered(true)}
            onMouseLeave={() => setTgHovered(false)}
          >
            <TelegramIcon hovered={tgHovered} />
            <span>{CONTACT.telegram.handle}</span>
          </a>
        </motion.div>

        {/* ── Copy Toast ── */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className="toast"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ position: 'fixed', bottom: '32px' }}
            >
              Email copied
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
