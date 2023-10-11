import React from 'react'

export const ControlPresupuesto = ({presupuesto}) => {

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
                <span>Diponible: </span> {formatearPresupuesto(0)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPresupuesto(0)}
            </p>
        </div>

    </div>
  )
}
