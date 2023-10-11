import React from 'react'

export const Gasto = ({gasto}) => {
  return (
    <div className='gasto sombra'>
        <div className='contenido-gasto'>
            <div className='descripcion-gasto'>
                <p className='categoria'>{gasto.categoria}</p>
                <p className='nombre-gasto'>{gasto.nombre}</p>
                <p className='fecha-gasto'>{gasto.fecha}</p>

            </div>
        </div>
    </div>
  )
}
