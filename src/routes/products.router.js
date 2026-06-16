import { Router, json, urlencoded } from 'express';
import ProductManager from '../dao/ProductManager.js';
import { uploader } from '../utils.js';

const router = Router();

// ESTO EN REALIDAD ESTA MAL PUESTO ACA
// Para que siempre que se reciba un body en la peticion se pueda leer en todas las rutas en formato json y de un formulario.
router.use(json(), urlencoded({ extended: true }));

router.get('/', async (req, res, next) => {
    try {
        const products = await ProductManager.getProducts();
        res.status(202).json(products);
    } catch (error) {
        next(error);
    }
});

// Obtener un producto por el ID
router.get('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const requiredProduct = await ProductManager.getProductById(pid);
        res.status(202).json(requiredProduct)
    } catch (error) {
        next(error);
    }
});

// Create
router.post("/",
    uploader.array('thumbnail'),
    async (req, res, next) => {
        try {
            if (req.body.status == 'on') {
                req.body.status = true;
            } else {
                req.body.status = false;
            }
            const thumbnails = req.files.map(file => {
                return file.path
            })
            const newProduct = await ProductManager.createProduct({...req.body, thumbnails});
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    });

// update
router.put('/:pid', async (req, res, next) => {

});

// delete
router.put('/:pid', async (req, res, next) => {

});

export default router;