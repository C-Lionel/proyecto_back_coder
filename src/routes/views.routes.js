import { Router } from 'express';
import ProductManager from '../dao/ProductManager.js';

const router = Router();

router.get('/', async (req, res, next) => {
    res.render('index');
});

router.get('/products', async (req, res, next) => {
    try {
        const products = await ProductManager.getProducts();
        console.log(products)
        res.render('products', {
            products,
            message: 'Tienda'
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create-product', async (req, res, next) => {
    try {
        res.render('product-form')
    } catch (error) {
        next(error)
    }
});

export default router;