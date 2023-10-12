import React, {useEffect, useState} from 'react'

export const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])
    

    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>Gráfica aqui</p>
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>
            <p>
                <span>Diponible: </span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPresupuesto(gastado)}
            </p>
        </div>

    </div>
  )
}
