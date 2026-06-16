import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.routes.js';
import { root } from './utils.js';
import {Server} from 'socket.io';

const app = express();
const PORT = 3000;

// Configuración del servidor para trabajar con Handlebars
app.engine('handlebars', engine({
    helpers: {
        isStock: (stock, min) => stock > min
    },
    partialsDir: root + '/views/partials'
}))
app.set('view engine', 'handlebars');
app.set('views', root + '/views');

// Referencia al server HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

// WEBSOCKET
const socketServer = new Server(httpServer);

app.use(express.static(`${root}/public`));

app.use('/api/products', productsRouter);
app.use('/', viewsRouter)

// middleware, entran los next que estan "huerfanos" en las rutas
app.use( async (err, req, res, next) => {
    res.status(404).json({
        error: err.message
    });
})