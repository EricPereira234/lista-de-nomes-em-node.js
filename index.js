const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conexao = require('./db/db');

const Gravar = require('./Gravar');
const Amigo = require('./Amigo');


// configuração
    //view engine
    app.set('view engine', 'ejs');
    //arquivos staticos
    app.use(express.static('public'));
    //body-parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    // conexão com o msql
    conexao.authenticate().then(function(){
        console.log('conectado ao mysql !');
    });
//---------fim da configuração

//rotas
app.get('/', function(req,res){
   Gravar.findAll({order:[['id','DESC']]}).then(function(contribuintes){
    res.render('home', {contribuintes: contribuintes});
   })
       
});
app.get('/login', function(req, res){
    res.render('login');
});
   //area do administrador
app.post('/verdade', function(req, res){
  const email = req.body.email;
  const senha = req.body.senha;

  const e = '';
  const s = '';
  if(email == e && senha == s){
    res.redirect('/areadeadministracaodosistemadenomesdoprogramaparoquiadecocal@')
  }
  });

 app.get('/areadeadministracaodosistemadenomesdoprogramaparoquiadecocal@',function(req, res){
      Gravar.findAll({order:[['id','DESC']]}).then(function (contribuintes) {
        res.render('painel', {contribuintes: contribuintes});
      })
    
  });
  app.get('/cadastrar', function(req, res){
      res.render('formCadast');
  });
  app.post('/gravando', function(req, res){
      var nome = req.body.nome;
      var data = req.body.data;
      Gravar.create({
          nome: nome,
          mes: data
      }).then(function(){
          res.redirect('/');
      }).catch(function(err){
          console.log('não salvou');
      })

  });

  app.post('/deletar', function(req, res){
   var id = req.body.id;
   if(id !=undefined){
       Gravar.destroy({where: {id: id}}).then(function(){
           res.redirect('/areadeadministracaodosistemadenomesdoprogramaparoquiadecocal@');
       });
   }
  });

  app.get('/formUpdate/:id', (req, res)=>{
    var id = req.params.id;
    Gravar.findByPk(id).then(function(contribuintes){
        if(contribuintes != undefined){
            res.render('formUpdate', {contribuintes: contribuintes});
        }else{
            res.send('nao deu certo')
        }
    });
  });

  app.post('/update', function(req, res){
       var id = req.body.id;
       var nome = req.body.nome;
       var data = req.body.data;
       Gravar.update({nome: nome, mes: data}, {where:{id: id}}).then(function(){
          
           res.redirect('/areadeadministracaodosistemadenomesdoprogramaparoquiadecocal@');
       });
       
  });

  // --------------------- área do amigo bem feitor ----------------------------------
  
  app.get('/amigopadresentraracessarkdjsdfhhglsijjghalkd@', (req ,res)=>{
    Amigo.findAll({order:[['id','DESC']]}).then(function(amigos){ 
    res.render('amigoHome',{amigos: amigos});
    });
  });

  app.get('/amigo/logar', (req, res)=>{
      res.render('amigoLogar');
  });

  app.post('/confere', (req, res)=>{
    var Em = req.body.email2;
    var Sn = req.body.senha2;  
    const em = '';
    const sn = '';

    if(Em == em && Sn == sn){
        res.redirect('/amigopadresentraracessarkdjsdfhhglsijjghalkd@');
    }else{
        
    }
  });

  app.get('/amigo/cadastro', (req, res)=>{
      res.render('formAmigo');
  });

  app.post('/gravandoAmigo', (req, res)=>{
      var Nome = req.body.nome;
      var Endereco = req.body.endereco;
      var Aniversario = req.body.aniversario;
      var Valor = req.body.valor;
      var Liturgia = req.body.liturgia;

      Amigo.create({
        nome: Nome,
        endereco: Endereco,
        aniversario: Aniversario,
        valor: Valor,
        liturgia: Liturgia

    }).then(function(){
        res.redirect('/amigopadresentraracessarkdjsdfhhglsijjghalkd@');
    }).catch(function(err){
        console.log('não salvou');
    })
  });

  app.get('/editar/amigo/:id', (req, res)=>{
    var id = req.params.id;
    Amigo.findByPk(id).then(function(amigos){
    if(amigos != undefined){
      res.render('formUpdateAmigo',{amigos: amigos});
    }else{
        res.send('nao deu certo')
    }
     });

  });
  app.post('/update/amigo', function(req, res){
    var id = req.body.id;
    var Nome = req.body.nome;
    var Endereco = req.body.endereco;
    var Aniversario = req.body.aniversario;
    var Valor = req.body.valor;
    var Liturgia = req.body.liturgia;
    Amigo.update({ nome: Nome,
        endereco: Endereco,
        aniversario: Aniversario,
        valor: Valor,
        liturgia: Liturgia}, {where:{id: id}}).then(function(){
       
        res.redirect('/amigopadresentraracessarkdjsdfhhglsijjghalkd@');
    });
    
});
app.post('/deletar/amigo', function(req, res){
    var id = req.body.id;
    if(id !=undefined){
        Amigo.destroy({where: {id: id}}).then(function(){
            res.redirect('/amigopadresentraracessarkdjsdfhhglsijjghalkd@');
        });
    }
   });

//---fim das rotas

app.listen(8081, function(){
    console.log('servidor node rodando !');
});