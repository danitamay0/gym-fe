import axios from '@/lib/axios'
import { useEffect, useState } from "react"


export const getAllPaymentMethods = async () => {
  const response = await axios.get('/payment-methods',)
  return response.data
}

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([])

  const fetchPaymentMethods = async () => {
    try {
      const data = await getAllPaymentMethods()
      console.log({ data });
      
      setPaymentMethods(data)
    } catch (error) {
      console.error("Error fetching payment methods:", error)
    }
  }

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  return { paymentMethods, fetchPaymentMethods }
}