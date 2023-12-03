const {z} = require('zod')

const createProductSchema = z.object({
    name: z.string({
        required_error: 'name is required'
    }),
    price: z.number({
        required_error: 'price is required'
    }),
    stock: z.number({
        required_error: 'stock is required'
    }),
    description: z.string({
        required_error: 'Description must be a string'
    }),
    date: z.string().datetime().optional()
})

module.exports = {createProductSchema}