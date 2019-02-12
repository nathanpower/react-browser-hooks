import { useState, useEffect } from 'react'

//@todo: perhaps polling approach for older browsers as an option
//e.g. favicon polling
export function useOnline() {
  const [online, setOnline] = useState(getOnlineStatus())

  function handleChange() {
    setOnline(getOnlineStatus())
  }

  function getOnlineStatus() {
    return window.navigator && window.navigator.onLine ? true : false
  }

  useEffect(() => {
    window.addEventListener('offline', handleChange, false)
    window.addEventListener('online', handleChange, false)

    return function cleanup() {
      window.removeEventListener('online', handleChange)
      window.removeEventListener('offline', handleChange)
    }
  }, [])

  return {
    online
  }
}
