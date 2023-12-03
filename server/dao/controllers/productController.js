const productRouter = require("../../routers/productRouter")
const Product = require("../models/productModel")

const getProducts = async (userId) => {
    try {
        return await Product.find({
            user: userId
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createProduct = async (product) =>{
    const newProduct = new Product(product)
    try{
        return await newProduct.save()
    }catch(err){
        console.error(err)
        throw err
    }
}

const getProductById = async (pid) => {
    try {
        return await Product.findById(pid);
    } catch (error) {
        throw error;
    }
};


const updateProduct = async (pid, updatedFields) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(pid, updatedFields, { new: true });
        if (updatedProduct) {
            return { ok: true, updatedProduct };
        } else {
            return { error: 'Producto no actualizado' };
        }
    } catch (error) {
        return { error: 'ID no válido' };
    }
};

const deleteProduct = async (pid) =>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(pid)
        if(deletedProduct){
            return {ok: true, deletedProduct}
        }
        else{ 
            return {error: 'Producto no encontrado'}
        }
    }
    catch(err){
        return {error: 'id no valido'}
    }
}

module.exports = {createProduct, getProducts, deleteProduct, getProductById,updateProduct}