import React from 'react'

import { Gasto } from './Gasto'

export const ListadoGastos = ({filtro, gastosFiltrados, gastos, setGastoEditar, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>

        {
          filtro ? (
            <>
              <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos es esta categoría'}</h2>
              {gastosFiltrados.map( (gasto) => (
              <Gasto 
                key={gasto.id} 
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
              ))}
            </>
          ) : (

            <>
              <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
              {gastos.map( (gasto) => (
                <Gasto 
                  key={gasto.id} 
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          )
        }

    </div>
  )
}
