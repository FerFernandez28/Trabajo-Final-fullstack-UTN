import React, { useEffect } from 'react'
import { useProducts } from '../../context/ProductsContext'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Product.css'
import { Link } from 'react-router-dom'

const Products = () => {
  const { getProducts, products } = useProducts()

  useEffect(()=>{
    getProducts()
  }, [])

  if(products.lenght == 0) {
    return (<h1>No Products</h1>)
  }

  return (
    <div className='productCards'>
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard product={product} key={product._id} />
        ))
      ) : (
        <div className='noProductsContainer'>
          <h1 className='noProducts'>No products found</h1>
          <h3>Please add-Products</h3>
          <Link to='/add-product'><button className='btn-addProduct'>Add Product</button></Link>
        </div>
      )}
    </div>

  )
}

export default Products