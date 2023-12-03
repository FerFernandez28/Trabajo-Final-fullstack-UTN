import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './ProductFormPage.css'
import { useProducts } from '../../context/ProductsContext'
import {useNavigate, useParams} from 'react-router-dom'

const ProductFormPage = () => {
  const {register, handleSubmit, setValue} = useForm()
  const {createProduct, getProduct, updateProduct} = useProducts()
  const navigate = useNavigate()
  const {pid} = useParams()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (pid) {
          const product = await getProduct(pid);
          console.log(product);
          setValue('name', product.name);
          setValue('price', product.price);
          setValue('stock', product.stock);
          setValue('description', product.description);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
    loadProduct();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    data.price = parseFloat(data.price);
    data.stock = parseFloat(data.stock);
    try {
      if (pid) {
        await updateProduct(pid, data)
      } else {
        await createProduct(data);        
      }
      navigate('/products')
    } catch (error) {
      console.error('Error creating product:', error.response); 
    }
  });
  

  return (
    <div className='productFormContainer'>
      <form onSubmit={onSubmit} className='form'>
        <div>
          <label htmlFor="name">Name:</label>
          <input type='text' placeholder='Name' {...register("name")} autoFocus />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type='number' placeholder='price' {...register("price")} autoFocus />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input type='number' placeholder='stock' {...register("stock")} autoFocus />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input placeholder='Description' {...register("description")}>
          </input>
        </div>
        <button className='btn-save'>Save</button>
      </form>
    </div>
    
  )
}

export default ProductFormPage