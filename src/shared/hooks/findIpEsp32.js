// src/hooks/useEsp32Discovery.js
import { useEffect } from 'react'
import axios from '@/lib/axios'

export function useEsp32Discovery() {
  useEffect(() => {
    const cached = localStorage.getItem('esp32_ip')
    if (cached) {
      console.log("⚡ IP cacheada:", cached)
      return
    }

    axios.get('/esp32-ip')
      .then(res => {
        if (res.data?.ip) {
          console.log("✅ ESP32 detectado:", res.data.ip)
          localStorage.setItem('esp32_ip', res.data.ip)
        }
      })
      .catch(err => {
        console.warn("❌ Error detectando el ESP32", err.message)
      })
  }, [])
}