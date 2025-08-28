import React from 'react'
import {
  Select,
  Option,
  FormLabel,
  FormHelperText,
} from '@mui/joy'
import { usePaymentMethods } from '../hooks/paymentMethod'
const PaymentMethodSelect = ({ onSelected }) => {
  const { paymentMethods } = usePaymentMethods()
  return (
    <div>
      <FormLabel>Método de Pago</FormLabel>
      <Select id="payment-method" placeholder="Seleccione un método de pago" onChange={(_, val) => {
        onSelected(val)
      }}>
        {paymentMethods?.map((method) => (
          <Option key={method.id} value={method.id}>
            {method.tipo}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default PaymentMethodSelect