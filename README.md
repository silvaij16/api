mkdir api(FIRST AT ALL: CREATE A DIRECTORY)

npm init -y(CREATE THE PROJECT)

npm install -s express body-parser sequelize mariadb mysql2(INSTALL THE DEPENDENCES)
npm i -D nodemon sequelize-cli

code .(open the visual code)

CREATE THE server.js FILE

npx sequelize-cli init(IT CREATES THE DIRECTORIES AND FILES: config, models, migrations e seeders)
*RENAME THE FILE "/config/config.json" TO config.js, DON´T FORGET RENAME THE FILE IN "/models/index.js"

module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "Picorestdb",
    "host": "localhost",
    "dialect": "mariadb",
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "picorestdb",
    "host": "localhost",
    "dialect": "mariadb",
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "Picorestdb",
    "host": "127.0.0.1",
    "dialect": "mariadb",
  }
}

USE MARIADB! CREATE THE 
crie o banco, igual no arquivo de configuração


CRIANDO AS MIGRATIONS:(não deixe espaços entre os atributos)
npx sequelize-cli model:generate --name usuario --attributes nome:STRING,email:STRING,passWorld:STRING
npx sequelize-cli model:generate --name setor --attributes descricao:STRING
npx sequelize-cli model:generate --name funcao --attributes descricao:STRING

npx sequelize-cli model:generate --name curso --attributes descricao:STRING,cargaHoraria:STRING,dataInicio:DATE,dataConclusao:DATE
npx sequelize-cli model:generate --name funcaoCurso --attributes funcaoId:INTEGER,cursoId:INTEGER

npx sequelize-cli model:generate --name funcionario --attributes matricula:STRING,cpf:STRING,ctps:STRING,admissao:DATE,demissao:DATE,
sexo:STRING,numero:STRING,logradouro:STRING,bairro:STRING,cidade:STRING,uf:STRING,usuarioId:INTEGER,setorId:INTEGER,funcaoId:INTEGER

npx sequelize-cli model:generate --name funcionarioCurso --attributes comprovante:STRING,cargaHoraria:STRING,dataInicio:DATE,
dataConclusao:DATE,funcionarioId:INTEGER,cursoId:INTEGER


npx sequelize-cli db:migrate(starta as migrations= cria as tabelas no banco)
npx sequelize-cli db:migrate:undo(desfaz a migration mas recente)
npx sequelize-cli db:migrate:undo:all(desfaz todas as migratons)
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js(desfaz uma migration específica)



MODELS ASSOCIATION:



curso.associate = function(models) {
    curso.hasMany(models.funcaoCurso,{

       foreignKey: 'cursoId'
      
     })
     curso.hasMany(models.funcionarioCurso,{

       foreignKey: 'cursoId'
      
     })
  };

funcao.associate = function(models) {
    funcao.hasMany(models.funcionario,{

      foreignKey: 'funcaoId'
      
    })
    funcao.hasMany(models.funcaoCurso,{

      foreignKey: 'funcaoId'
      
    })
  };

funcaoCurso.associate = function(models) {
    funcaoCurso.belongsTo(models.funcao,{

      foreignKey: 'funcaoId'

    })
    funcaoCurso.belongsTo(models.curso,{
    
      foreignKey: 'cursoId'
    })
  };

funcionario.associate = function(models) {
    funcionario.belongsTo(models.usuario,{ 
      foreignKey: 'usuarioId'
    })
    
    funcionario.belongsTo(models.setor,{ 
      foreignKey: 'setorId'
    })

    funcionario.belongsTo(models.funcao,{ 
      foreignKey: 'funcaoId'
    })
    
    funcionario.hasMany(models.funcionarioCurso,{

      foreignKey: 'funcionarioId'
        
    })
  };

  funcionarioCurso.associate = function(models) {
    funcionarioCurso.belongsTo(models.funcionario,{
      foreignKey: 'funcionarioId'

    })
    funcionarioCurso.belongsTo(models.curso,{
      foreignKey: 'cursoId'
        
    })
  };

  setor.associate = function(models) {
    setor.hasMany(models.funcionario,{
  
      foreignKey: 'setorId'
      
    })
  };

  usuario.associate = function(models) {
    usuario.hasOne(models.funcionario,{

      foreignKey: 'usuarioId'
     
    })
  };



ROUTES:



module.exports = function(app){

    //curso
    var cursoController = require('../controllers/cursoController')
        
    app.route('/cursos')
    .get(cursoController.findAll)
    .post(cursoController.create);
    
    app.route('/cursos/:id')
    .get(cursoController.findByPk)
    .put(cursoController.update)
    .delete(cursoController.delete);
    
    
    //funcao
    var funcaoController = require('../controllers/funcaoController')
        
    app.route('/funcoes')
    .get(funcaoController.findAll)
    .post(funcaoController.create);
    
    app.route('/funcoes/:id')
    .get(funcaoController.findByPk)
    .put(funcaoController.update)
    .delete(funcaoController.delete);
    
    //funcaoCurso
    var funcaoCursoController = require('../controllers/funcaoCursoController')
        
    app.route('/funcaoCursos')
    .get(funcaoCursoController.findAll)
    .post(funcaoCursoController.create);
    
    app.route('/funcaoCursos/:id')
    .get(funcaoCursoController.findByPk)
    .put(funcaoCursoController.update)
    .delete(funcaoCursoController.delete);
    
    //funcionario
    var funcionarioController = require('../controllers/funcionarioController')
        
    app.route('/funcionarios')
    .get(funcionarioController.findAll)
    .post(funcionarioController.create);
    
    app.route('/funcionarios/:id')
    .get(funcionarioController.findByPk)
    .put(funcionarioController.update)
    .delete(funcionarioController.delete);
    
    //funcionarioCurso
    var funcionarioCursoController = require('../controllers/funcionarioCursoController')
        
    app.route('/funcionarioCursos')
    .get(funcionarioCursoController.findAll)
    .post(funcionarioCursoController.create);
    
    app.route('/funcionarioCursos/:id')
    .get(funcionarioCursoController.findByPk)
    .put(funcionarioCursoController.update)
    .delete(funcionarioCursoController.delete);
    
    //setor
    var setorController = require('../controllers/setorController')
        
    app.route('/setores')
    .get(setorController.findAll)
    .post(setorController.create);
    
    app.route('/setores/:id')
    .get(setorController.findByPk)
    .put(setorController.update)
    .delete(setorController.delete);
    
    
    //usuário
    var usuarioController = require('../controllers/usuarioController')
        
    app.route('/usuarios')
    .get(usuarioController.findAll)
    .post(usuarioController.create);
    
    app.route('/usuarios/:id')
    .get(usuarioController.findByPk)
    .put(usuarioController.update)
    .delete(usuarioController.delete);
    
    }




INSERTS:




INSERT INTO `cursos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('java','2019-11-13','2019-11-13');
INSERT INTO `cursos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('javascript','2019-11-13','2019-11-13');
INSERT INTO `cursos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('c#','2019-11-13','2019-11-13');
INSERT INTO `cursos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('c++','2019-11-13','2019-11-13');
INSERT INTO `cursos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('web','2019-11-13','2019-11-13');


INSERT INTO `setors` (`descricao`,`createdAt`,`updatedAt`) VALUES ('Diretoria','2019-11-13','2019-11-13');
INSERT INTO `setors` (`descricao`,`createdAt`,`updatedAt`) VALUES ('inovação','2019-11-13','2019-11-13');
INSERT INTO `setors` (`descricao`,`createdAt`,`updatedAt`) VALUES ('desemvolvimento','2019-11-13','2019-11-13');
INSERT INTO `setors` (`descricao`,`createdAt`,`updatedAt`) VALUES ('RH','2019-11-13','2019-11-13');
INSERT INTO `setors` (`descricao`,`createdAt`,`updatedAt`) VALUES ('UX','2019-11-13','2019-11-13');


INSERT INTO `funcaos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('Analista','2019-11-13','2019-11-13');
INSERT INTO `funcaos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('Analista jr','2019-11-13','2019-11-13');
INSERT INTO `funcaos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('Analista senior','2019-11-13','2019-11-13');
INSERT INTO `funcaos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('Analista pleno','2019-11-13','2019-11-13');
INSERT INTO `funcaos` (`descricao`,`createdAt`,`updatedAt`) VALUES ('gerente','2019-11-13','2019-11-13');


INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Israel Jerônimo','kfkfkf@kfkf.com','d4d4dd4','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Ramon Uriel','kfkfkf@kfkf.com','d4d4dd4','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Emanuel','kfkfkf@kfkf.com','d4d4dd4','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('John','kfkfkf@kfkf.com','d4d4dd4','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Mateus','kfkfkf@kfkf.com','d4d4dd4','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Israel Jerônimo2','israel@kfkf.com','1111','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Ramon Uriel2','uriel@kfkf.com','2222','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Emanuel2','emanuel@kfkf.com','3333','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('John2','john@kfkf.com','4444','2019-11-13','2019-11-13');
INSERT INTO `usuarios` (`nome`,`email`,`passWorld`,`createdAt`,`updatedAt`) VALUES ('Mateus2','mateus@kfkf.com','5555','2019-11-13','2019-11-13');


INSERT INTO `funcionarios` (`matricula`,`cpf`,`ctps`,`admissao`,`demissao`,`sexo`,`numero`,`logradouro`,`bairro`,`cidade`,`uf`,`usuarioId`,`setorId`,
`funcaoId`,`createdAt`,`updatedAt`) VALUES ('4d4d','1444525','555554','2019-11-13','2019-11-13','m','124','rua 1','longe','far away','pe',1, 1, 1,'2019-11-13','2019-11-13');
INSERT INTO `funcionarios` (`matricula`,`cpf`,`ctps`,`admissao`,`demissao`,`sexo`,`numero`,`logradouro`,`bairro`,`cidade`,`uf`,`usuarioId`,`setorId`,
`funcaoId`,`createdAt`,`updatedAt`) VALUES ('4d4d','144452','555554','2019-11-13','2019-11-13','m','124','rua 1','longe','far away','pe', 2, 2, 2,'2019-11-13','2019-11-13');
INSERT INTO `funcionarios` (`matricula`,`cpf`,`ctps`,`admissao`,`demissao`,`sexo`,`numero`,`logradouro`,`bairro`,`cidade`,`uf`,`usuarioId`,`setorId`,
`funcaoId`,`createdAt`,`updatedAt`) VALUES ('4d4d','14445','555554','2019-11-13','2019-11-13','m','124','rua 1','longe','far away','pe', 3, 3, 3,'2019-11-13','2019-11-13');
INSERT INTO `funcionarios` (`matricula`,`cpf`,`ctps`,`admissao`,`demissao`,`sexo`,`numero`,`logradouro`,`bairro`,`cidade`,`uf`,`usuarioId`,`setorId`,
`funcaoId`,`createdAt`,`updatedAt`) VALUES ('4d4d','144452554','555554','2019-11-13','2019-11-13','m','124','rua 1','longe','far away','pe', 4, 4, 4,'2019-11-13','2019-11-13');
INSERT INTO `funcionarios` (`matricula`,`cpf`,`ctps`,`admissao`,`demissao`,`sexo`,`numero`,`logradouro`,`bairro`,`cidade`,`uf`,`usuarioId`,`setorId`,
`funcaoId`,`createdAt`,`updatedAt`) VALUES ('4d4d','144452554','555554','2019-11-13','2019-11-13','m','124','rua 1','longe','far away','pe', 5, 5, 5,'2019-11-13','2019-11-13');


INSERT INTO `funcionarioCursos` (`comprovante`,`cargaHoraria`,`dataInicio`,`dataConclusao`,`funcionarioId`,`cursoId`,`createdAt`,`updatedAt`) VALUES ('comprovante93939','36 Horas','2019-11-13','2019-11-13', 1, 1,'2019-11-13','2019-11-13');
INSERT INTO `funcionarioCursos` (`comprovante`,`cargaHoraria`,`dataInicio`,`dataConclusao`,`funcionarioId`,`cursoId`,`createdAt`,`updatedAt`) VALUES ('comprovante93909','36 Horas','2019-11-13','2019-11-13', 2, 2,'2019-11-13','2019-11-13');
INSERT INTO `funcionarioCursos` (`comprovante`,`cargaHoraria`,`dataInicio`,`dataConclusao`,`funcionarioId`,`cursoId`,`createdAt`,`updatedAt`) VALUES ('comprovante93939','36 Horas','2019-11-13','2019-11-13', 3, 3,'2019-11-13','2019-11-13');
INSERT INTO `funcionarioCursos` (`comprovante`,`cargaHoraria`,`dataInicio`,`dataConclusao`,`funcionarioId`,`cursoId`,`createdAt`,`updatedAt`) VALUES ('comprovante93939','36 Horas','2019-11-13','2019-11-13', 4, 4,'2019-11-13','2019-11-13');
INSERT INTO `funcionarioCursos` (`comprovante`,`cargaHoraria`,`dataInicio`,`dataConclusao`,`funcionarioId`,`cursoId`,`createdAt`,`updatedAt`) VALUES ('comprovante93939','36 Horas','2019-11-13','2019-11-13', 5, 5,'2019-11-13','2019-11-13');



https://sequelize.org/master/manual/migrations.html#creating-first-model--and-migration-
https://medium.com/@rogeriothe_48115/relacionamentos-com-sequelize-guia-final-2b3baf21b2a1
https://blog.rocketseat.com.br/nodejs-express-sequelize/
https://stackoverflow.com/questions/21949554/how-do-sequelize-getter-and-setters-work




CONTROLLERS




CURSO



let db = require("../models")

module.exports = {

    findAll:async (req,res)=>{
        try{
            let curso = await db.curso.findAll({})
            res.json(curso)
        }
        catch(error){
            sendStatus(400)
        }
    },
    create: async(req,res)=>{

        try{
            let curso = await db.curso.create(req.body)
            res.json(curso)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.curso.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.curso.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    findByPk: async(req,res)=>{
        try{
            let result = await db.curso.findByPk(req.params.id)
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




FUNCAO




let db = require("../models")

module.exports = {

    findAll:async (req,res)=>{
        try{
            let funcao = await db.funcao.findAll({})
            res.json(funcao)
        }
        catch(error){
            sendStatus(400)
        }
    },
    create: async(req,res)=>{

        try{
            let funcao = await db.funcao.create(req.body)
            res.json(funcao)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.funcao.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.funcao.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    findByPk: async(req,res)=>{
        try{
            let result = await db.funcao.findByPk(req.params.id)
            res.json(result)

        }catch(error){
            res.sendStatus(400)

        }
    }

}


FUNCAOCURSO



let db = require("../models")

module.exports = {

    findAll:async (req,res)=>{
        try{
            let funcaoCurso = await db.funcaoCurso.findAll({})
            res.json(funcaoCurso)
        }
        catch(error){
            sendStatus(400)
        }
    },
    create: async(req,res)=>{

        try{
            let funcaoCurso = await db.funcaoCurso.create(req.body)
            res.json(funcaoCurso)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.funcaoCurso.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.funcaoCurso.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    findByPk: async(req,res)=>{
        try{
            let result = await db.funcaoCurso.findByPk(req.params.id)
            res.json(result)

        }catch(error){
            res.sendStatus(400)

        }
    }

}



FUNCIONARIO



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



FUNCIONARIOCURSO



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



}



SETOR




let db = require("../models")

module.exports = {

    findAll:async (req,res)=>{
        try{
            let setor = await db.setor.findAll({})
            res.json(setor)
        }
        catch(error){
            sendStatus(400)
        }
    },
    create: async(req,res)=>{

        try{
            let setor = await db.setor.create(req.body)
            res.json(setor)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.setor.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.setor.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    findByPk: async(req,res)=>{
        try{
            let result = await db.setor.findByPk(req.params.id)
            res.json(result)

        }catch(error){
            res.sendStatus(400)

        }
    }

}




USUARIO



let db = require("../models")

module.exports = {

    findAll:async (req,res)=>{
        try{
            let usuario = await db.usuario.findAll({})
            res.json(usuario)
        }
        catch(error){
            res.sendStatus(400)
        }
    },
    create: async(req,res)=>{

        try{
            let usuario = await db.usuario.create(req.body)
            res.json(usuario)

        }catch(error){
            res.sendStatus(400)
        }

    },
    update: async(req,res)=>{
        try{
            let result = await db.usuario.update(req.body,{where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    delete: async(req,res)=>{
        try{
            let result = await db.usuario.destroy({where: {id: req.params.id}})
            res.sendStatus(204)

        }catch(error){
            res.sendStatus(400)

        }
    },
    findByPk: async(req,res)=>{
        try{
            let result = await db.usuario.findByPk(req.params.id)
            res.json(result)

        }catch(error){
            res.sendStatus(400)

        }
    }

}




MIGRATIONS: PRIMARYKEY REFERENCES



FUNCAO-CURSO



'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcaoCursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      funcaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "funcaos",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      cursoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "cursos",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funcaoCursos');
  }
};




FUNCIONARIO



'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matricula: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      ctps: {
        type: Sequelize.STRING
      },
      admissao: {
        type: Sequelize.DATE
      },
      demissao: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      logradouro: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      uf: {
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "usuarios",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      setorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "setors",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      funcaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "funcaos",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funcionarios');
  }
};




FUNCIONARIO-CURSO




'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionarioCursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comprovante: {
        type: Sequelize.STRING
      },
      cargaHoraria: {
        type: Sequelize.STRING
      },
      dataInicio: {
        type: Sequelize.DATE
      },
      dataConclusao: {
        type: Sequelize.DATE
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "funcionarios",
          key: "id"
        }
      },
      cursoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "cursos",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funcionarioCursos');
  }
};
https://sequelize.org/master/manual/migrations.html#creating-first-model--and-migration-
https://medium.com/@rogeriothe_48115/relacionamentos-com-sequelize-guia-final-2b3baf21b2a1
https://blog.rocketseat.com.br/nodejs-express-sequelize/
https://stackoverflow.com/questions/21949554/how-do-sequelize-getter-and-setters-work
