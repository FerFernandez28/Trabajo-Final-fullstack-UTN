import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='containerHM'>
      <div className='cardHM'>
        <div className='cardInfo'>
          <h4>PRODUCT CREATOR</h4>
          <h1>Create your product in this page!</h1>
          <h3>With this Product Creator, you'll only need a couple minutes to create any Product you want! You can view and edit them as you wish.</h3>
          <Link to='/login'><button className='btn-HM'>Creat now</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage