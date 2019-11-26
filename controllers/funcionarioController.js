let db = require("../models")

module.exports = {

    findAll: async (req,res)=>{
        try{
            let funcionario = await db.funcionario.sequelize.query('SELECT u.nome, s.descricao AS setor, f.descricao AS funcao,'
            + ' fr.matricula, fc.comprovante, c.descricao AS curso FROM usuarios AS u INNER JOIN funcionarios '
            + ' AS fr ON u.id = fr.usuarioId INNER JOIN setors AS s ON s.id = fr.setorId INNER JOIN funcaos AS f '
            + ' ON f.id = fr.funcaoId INNER JOIN funcionarioCursos AS fc ON fr.id = fc.funcionarioId INNER JOIN '
            + ' cursos AS c ON c.id = fc.cursoId ',
            { type: db.funcionario.sequelize.QueryTypes.SELECT }
            )
            res.json(funcionario)
        }
        catch(error){
            console.log(error)
            res.sendStatus(400)
        }
    },
  

    findByPk: async (req,res)=>{
        try{
            let funcionario = await db.funcionario.sequelize.query('SELECT u.nome, s.descricao AS setor, f.descricao AS funcao,'
            + ' fr.matricula, fc.comprovante, c.descricao AS curso FROM usuarios AS u INNER JOIN funcionarios '
            + ' AS fr ON u.id = fr.usuarioId INNER JOIN setors AS s ON s.id = fr.setorId INNER JOIN funcaos AS f '
            + ' ON f.id = fr.funcaoId INNER JOIN funcionarioCursos AS fc ON fr.id = fc.funcionarioId INNER JOIN '
            + ' cursos AS c ON c.id = fc.cursoId WHERE fr.id = :funcionarioId ',
            { replacements: { funcionarioId: req.params.id  }, type: db.funcionario.sequelize.QueryTypes.SELECT }
            )
            res.json(funcionario)
        }
        catch(error){
            console.log(error)
            res.sendStatus(400)
        }
    },


    create: async(req,res)=>{

        try{
            let funcionario = await db.funcionario.create(
                {
                    "matricula": req.body.matricula,
                    "cpf":req.body.cpf,
                    "ctps":req.body.ctps,
                    "admissao":req.body.admissao,
                    "demissao":req.body.demissao,
                    "sexo":req.body.sexo,
                    "numero":req.body.numero,
                    "logradouro":req.body.logradouro,
                    "bairro":req.body.bairro,
                    "cidade":req.body.cidade,
                    "uf":req.body.uf,
                    "usuarioId":req.body.usuarioId,
                    "setorId":req.body.setorId,
                    "funcaoId":req.body.funcaoId
                }
                )
            res.json(funcionario)

        }catch(error){
            res.sendStatus(400)
        }

    },
    
    update: async(req,res)=>{
        try{
            let result = await db.funcionario.update(
                {
                    "matricula": req.body.matricula,
                    "cpf":req.body.cpf,
                    "ctps":req.body.ctps
                },
                {where: {id: req.params.id}})
            //let result = await db.funcionario.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.funcionario.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    


       
    // findByPk: async(req,res)=>{ //funciona
    //     try{
    //         let result = await db.funcionario.findByPk(req.params.id,{attributes:['id','matricula','cpf','ctps','admissao','demissao','sexo','numero','logradouro','bairro','cidade','uf'],
    //         include: 
    //         [
    //            {model: db.usuario,
    //             attributes:['id','nome','email','passWorld'], 
    //             include: 
    //             [
    //                 {model: db.funcionario,
    //                  attributes:['matricula'],
    //                  include: 
    //             [
    //                 {model: db.funcionarioCurso,
    //                     attributes:['comprovante'],
    //                     include: 
    //                     [
    //                         {model: db.curso,
    //                          attributes:['descricao'],
                                 
    //                         }    
    //                     ]
    //                 }
    //             ]
    //                 }
    //             ]
    //         },{
    //             model: db.setor,
    //             attributes:['id','descricao']
    //         },{
    //             model: db.funcao,
    //             attributes:['id','descricao']
    //           }

    //         ]
            
    //         })
    //         res.json(result)

    //     }catch(error){
    //         res.sendStatus(400)

    //     }
    // }
    
    
       
//     sequelize.query('SELECT * FROM users WHERE name LIKE :search_name ',
//     { replacements: { search_name: 'ben%'  }, type: sequelize.QueryTypes.SELECT }
//   ).then(projects => {
//     console.log(projects)
//   }



}


