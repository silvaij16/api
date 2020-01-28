let db = require("../models")

module.exports = {

findAll:async (req,res)=>{
    try{
        let usuario = await db.usuario.findAll({
            attributes: ['email', 'passWorld'],
            where: { 
              email: req.body.email, 
              passWorld: req.body.passWorld
            }
        })

        if(usuario.email == req.body.email && usuario.passWorld == req.body.passWorld){
            res.send("logado com sucesso")
            res.sendStatus(200)
        }else{
            res.send("Usuário não encontrado")
            req.send(req.body.email);
        }


        res.json(usuario)
    }
    catch(error){
        res.sendStatus(400)
    }
}

}