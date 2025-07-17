import { useState } from 'react'
import { Typography, Button, Alert } from '@mui/joy'
import finger from '@/assets/finger.png'
import scanningDone from '@/assets/scanner-done.png'
import scanning from '@/assets/scanning.gif'

const FingerprintEnrollment = ({ userId, onSuccess }) => {
    const [status, setStatus] = useState('idle') // idle | enrolling | success | error
    const [message, setMessage] = useState(null)

    const handleEnroll = async () => {
        setStatus('enrolling')
        setMessage(null)

        const esp32Ip = localStorage.getItem('esp32_ip')
        if (!esp32Ip) {
            setStatus('error')
            setMessage('❌ No se ha detectado la IP del ESP32')
            return
        }

        try {
            const response = await fetch(`http://${esp32Ip}/enroll?user_id=${userId}`)
            const text = await response.text()

            if (response.ok) {
                setStatus('success')
                setMessage('✅ Huella registrada correctamente')
            } else {
                setStatus('error')
                setMessage('❌ Error registrando huella: ' + text)
            }
        } catch (err) {
            console.error(err)
            setStatus('error')
            setMessage('❌ Error de conexión con el ESP32')
        }
    }

    return (
        <div className="space-y-4 mt-6">
            <Typography level="h3" sx={{ color: "#2596be" }} >
                {status === 'idle' && 'Capturar huella'}
                {status === 'enrolling' && 'Coloca tu dedo en el sensor.'}
                {status === 'error' && 'Error al registrar huella'}
            </Typography>

            <Typography level="h4" sx={{ color: "#666b6d" }} className="pt-2">
                {status === 'enrolling' && 'Por favor, coloca tu dedo en el sensor...'}
            </Typography>

            {status === 'enrolling' && (
                <>
                    <img src={scanning} alt="Coloca tu dedo" />
                </>
            )}

            {status !== 'enrolling' && status != 'success' && (
                <img src={finger} alt="Coloca tu dedo" />

            )}

            {status == 'success' && (
                <img src={scanningDone} alt="Coloca tu dedo" />

            )}
            {message && <Alert color={status === 'success' ? 'success' : 'danger'}>{message}</Alert>}

            {status == 'success' && (
                <Button onClick={onSuccess} fullWidth sx={{ paddingY: "20px" }} loading={status === 'enrolling'}>
                Salir
            </Button>

            )}
             {status !== 'success' && (
                <Button onClick={handleEnroll} fullWidth sx={{ paddingY: "20px" }} loading={status === 'enrolling'}>
                Iniciar lectura de huella
            </Button>

            )}
        </div>
    )
}

export default FingerprintEnrollment
