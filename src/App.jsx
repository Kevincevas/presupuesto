import React, { useState, useEffect } from 'react'

import { Header } from './components/Header'
import { ListadoGastos } from './components/ListadoGastos'
import { Modal } from './components/Modal'
import { Filtros } from './components/Filtros'

import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0) //obteniendo el presupuesto del local storage
    ) 
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState( 
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] //JSON.parse: convirtiendo un string a un arreglo 
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  //se ejecuta cuando cambie el filtro
  useEffect(() => {
    if(filtro) {
      //filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)

    }
  }, [filtro])
  

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ){
      setModal(true)  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
      }
  }, [gastoEditar])
  
  
  //se ejecuta una sola vez cuando carga la app
  //llevando automaticamente a la siguiente pagina cuando si hay presupuesto en el local storage
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto' ?? 0))
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  //se ejecuta cuando cambie el presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  //se ejecuta cuando cambien los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])  //convertir un arreglo a string
  }, [gastos])
  
  


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({}) //poniendo un objeto vacio para poder agregar nuevos gastos despues de editar
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  //editar
  const guardarGasto = (gasto) => {
    // console.log(gasto)
    if(gasto.id) {
      //actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //nuevo gasto
      gasto.id = generarId()
      gasto.fecha= Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
      }, 500);
      
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id != id)
    setGastos(gastosActualizados)
  }

  return (
    <div className= {modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      { isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="Icono nuevo gasto" onClick={handleNuevoGasto}/>
          </div>

        </>
      )}

      { modal && <Modal 
                    setModal={setModal} 
                    animarModal={animarModal} 
                    setAnimarModal={setAnimarModal} 
                    guardarGasto={guardarGasto} 
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  />}
      
      
    </div>
  )
}

export default App
