import  Jwt  from "jsonwebtoken";
import { config } from './config'
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";

interface User {
    id: number;
    nombre: string;
    password: string;
  }
const Users:User[] = [{"id": 1 , "nombre": "juan" , "password":"123456"}];

const app = express();
app.use(express.json());

function  generar_token (payload: object):string{
    return Jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}   

function verificarToken(token: string): any {
  return Jwt.verify(token, config.jwtSecret);
}

/*function login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const usuario = users.find(u => u.email === email);
    
    if (!usuario) return res.status(401).json({ mensaje: 'No existe' });
  
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(403).json({ mensaje: 'Credenciales inválidas' });
  
    const token = generarToken({ id: usuario.id, email: usuario.email });
    res.json({ token });
  };
*/

app.post("/login",(req: Request, res: Response) => {
    const { nombre, password } = req.body;
    const usuario = Users.find(u => u.nombre === nombre);
    if (!usuario){
         res.status(401);
         res.json({mensaje: 'No existe'});
    }
    else{
        const valido =  bcrypt.compareSync(password, usuario.password);

        if(valido){
             res.json(generar_token({id:usuario.id, nombre:usuario.nombre}));
        }
        else{
            res.status(403);
            res.json({mensaje: 'Credencial inválida'});
        }
    }
})

app.listen(config.port,() =>{
    console.log("Servidor corriendo...")
});