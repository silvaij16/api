let db = require("../models")

module.exports = {

    
    findAll:async (req,res)=>{
        var funcionarioFiltrado = [];
            try{
                let funcionario = await db.funcionario.findAll({
                    attributes:['id','matricula','cpf','ctps','admissao','demissao','sexo','numero','logradouro','bairro','cidade','uf'],
                    include: 
                    [
                        {model: db.usuario,
                        attributes:['id','nome','email','passWorld']  
                    },{
                        model: db.setor,
                        attributes:['id','descricao']
                    },{
                        model: db.funcao,
                        attributes:['id','descricao']
                     },{
                        model: db.funcionariocurso,
                        include: {
                            model: db.curso,
                            attributes:['id','descricao']
                        }
                     }
                    ]
                })
                for (var i = 0; i < funcionario.length; i++) {
                 funcionarioFiltrado.push({
                 id: funcionario[i].id,
                 nome: funcionario[i].usuario.nome,
                 setor: funcionario[i].setor.descricao,
                 funcao: funcionario[i].funcao.descricao,
                 //cursoId: funcionario[i].funcionarioCurso.cursoId,
                 curso: funcionario[i].curso.descricao
                });
    
                }
    
                res.json(funcionarioFiltrado);
            }
            catch(error){
                res.sendStatus(400)
            }
        },
    
    
// findAll:async (req,res)=>{
//     try{
//         let usuario = await db.users.findAll({
//             attributes:['id','name','email','age'],
//             include: [{
//                 model: db.tasks,
//                 attributes:['id','title','descript','createdAt',"userId"]
//             }]
//         })
//         res.json(users)
//     }
    create: async(req,res)=>{

        try{
            let funcionario = await db.funcionario.create(req.body)
            res.json(funcionario)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.funcionario.update(req.body,{where: {id: req.params.id}})
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
    findByPk: async(req,res)=>{
        try{
            let result = await db.funcionario.findByPk(req.params.id)
            res.json(result)

        }catch(error){
            res.sendStatus(400)

        }
    }

}


// findAll:async (req,res)=>{
//     try{
//         let usuario = await db.users.findAll({
//             attributes:['id','name','email','age'],
//             include: [{
//                 model: db.tasks,
//                 attributes:['id','title','descript','createdAt',"userId"]
//             }]
//         })
//         res.json(users)
//     }
//     catch(error){
//         sendStatus(400)
//     }
// },
// include: [
//     {model: db.usuario,
//     attributes:['id','nome','email','passWorld']   
// }],
// include: [{
//     model: db.setor,
//     attributes:['id','descricao']
// }],
// include: [{
//     model: db.funcao,
//     attributes:['id','descricao']
// }]
/*let funcionario = await db.funcionario.findAll({
                attributes:['id','matricula','cpf','ctps','admissao','demissao','sexo','numero','logradouro','bairro','cidade','uf'],
                include: [
                    {model: db.usuario,
                    attributes:['id','nome','email','passWorld'],
                    include: [{
                        model
                    }]
                },{ */