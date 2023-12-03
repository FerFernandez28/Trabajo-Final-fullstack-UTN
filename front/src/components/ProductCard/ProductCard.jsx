import React from 'react'
import './ProductCard.css'
import { useProducts } from '../../context/ProductsContext'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  
  const {deleteProduct} = useProducts()

  return (
    <div className='productCardContainer'>
        <div className='product-name'>
          <h1>"{product.name}"</h1>
        </div>         
        <div className='productInfo'>
          <h2>
            Price: <span className="price">${product.price}</span>
          </h2>
          <h3>
            Stock: <span className='stock'>{product.stock}</span>
          </h3>
          <p>Description: <span className='descrip'>{product.description}</span></p>
          <p>{new Date(product.date).toLocaleDateString()}</p>
        </div>
        <div className='btns'>
              <button className='btn-delete' onClick={()=>{
                deleteProduct(product._id)
              }}><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
              <Link className='link-edit' to={`/products/${product._id}`}>Edit</Link>
          </div>
    </div>
  )
}

export default ProductCard