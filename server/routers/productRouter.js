const express = require('express')
const { createProduct, getProducts, deleteProduct, getProductById,  updateProduct } = require('../dao/controllers/productController')
const { authenticateToken } = require('../middleware/validateToken');
const { validateSchema } = require('../middleware/validator.middleware');
const { createProductSchema } = require('../schemas/product.schema');
const productRouter = express.Router()

productRouter.get('/', authenticateToken, async (req, res) => {
    try {
        const products = await getProducts(req.user.id);
        res.json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

productRouter.get('/:pid', authenticateToken, async (req, res) => {
    const { pid } = req.params;
    try {
        let product = await getProductById(pid);
        if (product) {
            res.status(200).json({ ok: true, product });
        } else {
            res.status(404).json({ ok: false, error: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
});

productRouter.post('/', authenticateToken, validateSchema(createProductSchema),async (req, res) => {
    try {
        const { name, price, stock, description } = req.body;
        console.log(req.user);
        const userId = req.user.id;
        const createdProduct = await createProduct({
            name,
            price,
            stock,
            description,
            user: userId
        });

        if (createdProduct) {
            // Utilizar userId después de definirla
            const updatedProductList = await getProducts(userId);
            res.json({ ok: true, products: updatedProductList });
        } else {
            res.status(500).json({ ok: false, error: 'Error al crear el producto' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error en el servidor' });
    }
});


productRouter.delete('/:pid', authenticateToken,async(req, res) =>{
    const {pid} = req.params
    let result = await deleteProduct(pid)
    if(result.ok){
        return res.status(204).json(
            {
                ok: true, 
                products: await getProducts(), 
                deleteProduct: result.deletedProduct
            }
        )
    }
    else{
        return res.status(404).json({ok: false, error: result.error})
    }
})


productRouter.put('/:pid', authenticateToken, async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body; 
    let result = await updateProduct(pid, updatedFields);
    if (result.ok) {
        return res.status(200).json({
            ok: true,
            updatedProduct: result.updatedProduct,
        });
    } else {
        return res.status(404).json({ ok: false, error: result.error });
    }
});
module.exports = productRouter