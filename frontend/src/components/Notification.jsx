import { useState, useEffect, useCallback } from 'react'

let notifyGlobal = null

export function notify(message, type = 'success') {
  if (notifyGlobal) notifyGlobal(message, type)
}

export default function Notification() {
  const [item, setItem] = useState(null)

  const show = useCallback((message, type) => {
    setItem({ message, type })
  }, [])

  useEffect(() => {
    notifyGlobal = show
    return () => { notifyGlobal = null }
  }, [show])

  useEffect(() => {
    if (!item) return
    const timer = setTimeout(() => setItem(null), 3000)
    return () => clearTimeout(timer)
  }, [item])

  if (!item) return null

  return (
    <div className={`notification ${item.type}`}>
      {item.message}
    </div>
  )
}
