import {
  Typography,
  Input,
  Select,
  Option,
  Sheet,
  Button,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { getAllInventory } from '@/features/inventory/query/inventory.api'
import Card from '@mui/joy/Card'
import axios from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import PaymentMethodSelect from '../../../shared/components/PaymentMethodSelect'

const formatCOP = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor)


const NewSellPage = () => {
  const navigate = useNavigate()
  const [inventory, setInventory] = useState([])
  const [items, setItems] = useState([{ producto_id: '', cantidad: 1 }])
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [showErrorPayment, setShowErrorPayment] = useState(false)

  useEffect(() => {
    getAllInventory().then(setInventory)
  }, [])

  const handleItemChange = (index, field, value)=> {
    const newItems = [...items]

    if (field === 'cantidad') {
      const selectedProductId = newItems[index].producto_id
      const inv = inventory.find((i) => i.producto.id === selectedProductId)
      const maxDisponible = inv?.cantidad_disponible ?? Infinity
      const parsed = parseInt(value, 10)

      newItems[index].cantidad = Math.max(
        0,
        Math.min(Number.isNaN(parsed) ? 0 : parsed, maxDisponible)
      )
    } else {
      newItems[index][field] = value
    }

    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { producto_id: '', cantidad: 1 }])
  }

  // ✅ Nuevo: eliminar item
  const removeItem = (index) => {
    if (items.length === 1) {
      // si es el único, resetea la fila
      setItems([{ producto_id: '', cantidad: 1 }])
      return
    }
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const total = items.reduce((acc, item) => {
    const inv = inventory.find((i) => i.producto.id === item.producto_id)
    const precio = inv ? parseFloat(inv.producto.precio_venta) : 0
    return acc + (item.cantidad || 0) * precio
  }, 0)

  const handleSubmit = async () => {
    const filteredItems = items.filter((item) => {
      const inv = inventory.find((i) => i.producto.id === item.producto_id)
      const precio = inv ? parseFloat(inv.producto.precio_venta) : 0
      return item.producto_id && item.cantidad > 0 && precio > 0
    })

    if (!filteredItems.length) {
      alert('Debe seleccionar al menos un producto válido con cantidad y precio mayor a cero.')
      return
    }

    if (!paymentMethod) {
      setShowErrorPayment(true)
      return
    }
    const payload = {
      cliente_id: null,
      metodo_pago_id: paymentMethod,
      items: filteredItems.map((item) => {
        const inv = inventory.find((i) => i.producto.id === item.producto_id)
        return {
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          precio_unitario: parseFloat(inv.producto.precio_venta),
        }
      }),
    }

    try {
      setLoading(true)
      await axios.post('/sales', payload)
      setItems([{ producto_id: '', cantidad: 1 }])
      navigate('/sells')
    } catch (error) {
      console.error(error)
      alert('Error al guardar la venta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <Card sx={{ boxShadow: 'lg' }}>
        <Typography level="h4">Registrar Venta</Typography>

        <Sheet className="p-4 space-y-4 rounded-lg ">
          {/* Cabecera */}
          <div className="grid grid-cols-6 gap-4 font-medium text-sm text-slate-600 pb-2">
            <span>Producto</span>
            <span>Disponible</span>
            <span>Cantidad</span>
            <span>Precio</span>
            <span>Subtotal</span>
            <span className="text-right">Acciones</span>
          </div>

          {items.map((item, index) => {
            const inv = inventory.find((i) => i.producto.id === item.producto_id)
            const disponible = inv?.cantidad_disponible ?? 0
            const precio = inv ? parseFloat(inv.producto.precio_venta) : 0
            const subtotal = (item.cantidad || 0) * precio
            const excedeInventario = item.cantidad > disponible

            return (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 items-center py-2"
              >
                <Select
                  placeholder="Producto"
                  value={item.producto_id}
                  onChange={(_, val) =>
                    handleItemChange(index, 'producto_id', val || '')
                  }
                >
                  {inventory.map((inv) => (
                    <Option key={inv.producto.id} value={inv.producto.id}>
                      {inv.producto.nombre}
                    </Option>
                  ))}
                </Select>

                <Typography>{disponible}</Typography>

                <Input
                  type="number"
                  value={item.cantidad}
                  color={excedeInventario ? 'danger' : 'neutral'}
                  onChange={(e) =>
                    handleItemChange(index, 'cantidad', e.target.value)
                  }
                  slotProps={{ input: { min: 0 } }}
                />

                <Typography>{formatCOP(precio)}</Typography>

                <Typography>{formatCOP(subtotal)}</Typography>

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="soft"
                    color="danger"
                    onClick={() => removeItem(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            )
          })}

          <div className="flex gap-2">
            <Button onClick={addItem} size="sm" variant="outlined">
              + Agregar producto
            </Button>
          </div>

          <div className="flex justify-between items-center pt-4 mt-8 border-t border-gray-400">
            <Typography level="title-lg">Total</Typography>
            <Typography level="title-lg">{formatCOP(total)}</Typography>
          </div>
          <div className="pt-4 mb-4">
             <PaymentMethodSelect onSelected={(methodId) => {
              // Aquí puedes manejar el método de pago seleccionado
              console.log(methodId);
              
              setPaymentMethod(methodId)
            }} /> 

            {
              showErrorPayment && !paymentMethod && <h5 className='text-red-500 mb-4'>Selecciona el metodo de pago</h5>
            }
          </div>
          <div className="pt-2">
           
            <Button  className='mt-4' onClick={handleSubmit} loading={loading}>
              Guardar venta
            </Button>
          </div>
        </Sheet>
      </Card>
    </div>
  )
}

export default NewSellPage
