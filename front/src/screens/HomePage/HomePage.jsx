import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='containerHM'>
      <div className='cardHM'>
        <div className='cardInfo'>
          <h4>CREADOR DE PRODUCTOS</h4>
          <h1>Crea tu Producto en esta pagina!</h1>
          <h3>Con este Creador de Productos, solo se necesitan unos minutos para crear el Producto que vos quieras! Podes verlos y editarlos cuando quieras.</h3>
          <Link to='/login'><button className='btn-HM'>Crea ahora</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage