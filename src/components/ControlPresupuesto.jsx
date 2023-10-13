import React, {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto-totalDisponible)/presupuesto ) * 100).toFixed(2) //toFixed: devuelva el resultado solo con 2 digitos
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])
    

    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })

    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',

                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}

            >
                
            </CircularProgressbar>
        </div>
        
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={ handleResetApp }>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>
            <p className={` ${ disponible < 0 ? 'negativo' : '' } `}>
                <span>Diponible: </span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPresupuesto(gastado)}
            </p>
        </div>

    </div>
  )
}
