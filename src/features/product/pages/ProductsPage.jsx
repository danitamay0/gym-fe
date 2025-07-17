import { useState, useEffect } from 'react'
import {
    Typography,
    Input,
    CircularProgress,
    Button,
} from '@mui/joy'
import { useProducts } from '../query/useProducts'
import ProductsTable from '../components/ProductsTable'
import AddProductModal from '../components/AddProductModal'
import EditProductModal from '../components/EditProductModal'

const ProductsPage = () => {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [open, setOpen] = useState(false)

    const { products, loading, error, refetch } = useProducts(debouncedSearch)

    const [editOpen, setEditOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleEdit = (product) => {
        setSelectedProduct(product)
        setEditOpen(true)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search)
        }, 400)
        return () => clearTimeout(timeout)
    }, [search])

    if (loading) return <CircularProgress />
    if (error) return <div>Error al cargar productos</div>

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <Typography level="h4">Productos</Typography>
                <div className="flex gap-3">
                    <Input
                        size="sm"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-72"
                    />
                    <Button onClick={() => setOpen(true)}>+ Agregar</Button>
                </div>
            </div>

            <ProductsTable products={products} onEdit={handleEdit} />

            <AddProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={refetch}
            />

            <EditProductModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                product={selectedProduct}
                onSuccess={refetch}
            />

        </div>
    )
}

export default ProductsPage
