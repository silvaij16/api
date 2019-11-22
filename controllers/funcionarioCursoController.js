let db = require("../models")

module.exports = {

    findAll:async (req,res)=>{
        var funcionarioFiltrado = [];
            try{
                let funcionariocurso = await db.funcionarioCurso.findAll({
                    attributes:['id','comprovante','cargaHoraria','dataInicio','dataConclusao'],
                    include: 
                    ([
                      {
                        model: db.funcionario,
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
                                  }
                            ]
                      },{
                          model: db.curso,
                          attributes:['id','descricao']
                        }

                    ])
                 })
                funcionariocurso.forEach(funcionarioCurso => {
                    funcionarioFiltrado.push({
                        id: funcionarioCurso.id,
                        nome: funcionarioCurso.funcionario.usuario.nome,
                        setor: funcionarioCurso.funcionario.setor.descricao,
                        funcao: funcionarioCurso.funcionario.funcao.descricao,
                        curso: funcionarioCurso.curso.descricao,
                        comprovante: funcionarioCurso.comprovante
                    });
                })
    
                res.json(funcionarioFiltrado);
            }
            catch(error){
                res.sendStatus(400)
            }
    },

    create: async(req,res)=>{

        try{
            let funcionarioCurso = await db.funcionarioCurso.create(req.body)
            res.json(funcionarioCurso)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.funcionarioCurso.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.funcionarioCurso.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },

    findByPk: async(req,res)=>{
        var funcionarioFiltrado = [];
            try{
                let funcionariocurso = await db.funcionarioCurso.findByPk(req.params.id,{attributes:['id','comprovante','cargaHoraria','dataInicio','dataConclusao'],
                    include: 
                    ([
                      {
                        model: db.funcionario,
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
                                  }

                            ]

                      },{
                          model: db.curso,
                          attributes:['id','descricao']
                        }

                    ])
                 })
                 
                 funcionarioFiltrado.push({
                 id: funcionariocurso.id,
                 nome: funcionariocurso.funcionario.usuario.nome,
                 setor: funcionariocurso.funcionario.setor.descricao,
                 funcao: funcionariocurso.funcionario.funcao.descricao,
                 curso: funcionariocurso.curso.descricao,
                 comprovante: funcionariocurso.comprovante
                });

    
                res.json(funcionarioFiltrado)
            }
            catch(error){
                res.sendStatus(400)
            }
    }




    // findByPk: async(req,res)=>{
    //     try{
    //         let result = await db.funcionarioCurso.findByPk(req.params.id)
    //         res.json(result)

    //     }catch(error){
    //         res.sendStatus(400)

    //     }
    // }

}

/*SELECT nome FROM usuarios 
INNER JOIN funcionarios 
ON usuarios.Id = funcionarios.usuarioId 
INNER JOIN funcionarioCursos 
ON funcionarios.Id = funcionarioCursos.funcionarioId 
INNER JOIN cursos 
ON funcionarioCursos.cursoId  = cursos.id 
WHERE cursoId = 1 */


//https://stackoverflow.com/questions/20460270/how-to-make-join-queries-using-sequelize-on-node-js


