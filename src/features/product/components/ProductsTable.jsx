import {
    Table,
    Sheet,
    Select,
    Option,
    IconButton,
} from '@mui/joy'
import { useState, useMemo } from 'react'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import EditIcon from '@mui/icons-material/Edit'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

const ProductsTable = ({ products = [], onEdit }) => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const paginatedProducts = useMemo(() => {
        const start = page * pageSize
        const end = start + pageSize
        return products.slice(start, end)
    }, [products, page, pageSize])

    const pageCount = Math.ceil(products.length / pageSize)

    return (
        <Sheet variant="outlined" className="rounded-lg overflow-hidden">
            <Table borderAxis="xBetween" size="md" stickyHeader>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio de venta</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>${parseFloat(product.precio_venta).toFixed(2)}</td>
                            <td>
                                <EditIcon
                                    onClick={() => onEdit(product)}
                                    className="cursor-pointer text-blue-800"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                    <IconButton
                        disabled={page === 0}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <span>
                        Página {page + 1} de {pageCount}
                    </span>
                    <IconButton
                        disabled={page + 1 >= pageCount}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        <ChevronRight />
                    </IconButton>
                </div>

                <div className="flex items-center gap-2">
                    <span>Filas por página</span>
                    <Select
                        value={pageSize}
                        onChange={(_, val) => {
                            setPageSize(val)
                            setPage(0)
                        }}
                    >
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <Option key={size} value={size}>
                                {size}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </Sheet>
    )
}

export default ProductsTable
