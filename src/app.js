import express from 'express';
import ProductManager from './dao/ProductManager.js';

const app = express();

app.listen(3000, () => {
    console.log('Server levantado..')
});

// Para que siempre que se reciba un body en la peticion se pueda leer en todas las rutas en formato json y de un formulario.
app.use(express.json(), express.urlencoded({extended: true}));

// Obtener todos los productos
app.get('/api/products', async (req, res, next) => {
    try {
        const products = await ProductManager.getProducts();
        res.status(202).json(products);
    } catch (error) {
        next(error);
    }
});

// Obtener un producto por el ID
app.get('/api/products/:pid', async (req, res, next) => {
    try {
        const {pid} = req.params;
        const requiredProduct = await ProductManager.getProductById(pid);
        res.status(202).json(requiredProduct)
    } catch (error) {
        next(error);
    }
});

app.post("/api/products", async (req, res, next) => {
    try {
        console.log(req.body);
    } catch (error) {
        next(error);
    }
})

// middleware, entran los next que estan "huerfanos" en las rutas
app.use( async (err, req, res, next) => {
    res.status(404).json({
        error: err.message
    });
})