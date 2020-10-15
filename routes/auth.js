let express = require('express');
let jwt = require('jsonwebtoken');
let config = require('../configs/config');
let router = express.Router();

let app = express();

// set secret key
app.set('llave', config.llave);

// POST alta de un inventor
router.post('/',async  (req,res)=> {
    const user = req.body;
    if(user.usuario === "asfo" && user.contrasena === "holamundo") {
        const payload = {
            check:  true
        };

        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        });

        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
});


module.exports = router;