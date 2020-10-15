let express = require('express');
let router = express.Router();
const dataInventor = require('./../data/Inventor');
let config = require('../configs/config');
let jwt = require('jsonwebtoken');

let app = express();
app.set('llave', config.llave);

router.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
            console.log('Token invalida')
          return res.json({ mensaje: 'Token inválida' });    
        } else {
            console.log('Token valida!')
          req.decoded = decoded;    
          next();
        }
      });
    } else {
        console.log('Falta token en header')
      res.send({ 
          mensaje: 'Token no provista.' 
      });
    }
 });


/* GET listado de inventores */
router.get('/' ,async function(req, res, next) {
  res.json(await dataInventor.getAllInventors());
});

// GET de un inventor
// /inventors/56
router.get('/:id', async (req,res)=>{
    res.json(await dataInventor.getInventor(req.params.id));
});

// POST alta de un inventor
router.post('/',async  (req,res)=> {
    const inventor = req.body;
    await dataInventor.pushInventor(inventor);
    const inventorPersistido = await dataInventor.getInventor(inventor._id);
    res.json(inventorPersistido);
});

// PUT modificacion de un inventor
router.put('/:id', async (req,res)=>{
    const inventor = req.body;
    inventor._id = req.params.id;
    await dataInventor.updateInventor(inventor);

    res.json(await dataInventor.getInventor(req.params.id));
});

router.delete('/:id', async (req,res)=> {
    await dataInventor.deleteInventor(req.params.id);
    res.send('Inventor eliminado');
});

module.exports = router;