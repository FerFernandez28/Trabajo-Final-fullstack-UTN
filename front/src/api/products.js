import {instance} from './axios'

const getProductsRequest = () => instance.get("/products")

const getProductRequest = (id) => instance.get(`/products/${id}`)

const createProductRequest = (product) => instance.post("/products", product)

const updateProductRequest = (id, product) => instance.put(`/products/${id}`, product)

const deleteProductRequest = (id) => instance.delete(`/products/${id}`)

export {getProductsRequest, getProductRequest, createProductRequest, updateProductRequest, deleteProductRequest}