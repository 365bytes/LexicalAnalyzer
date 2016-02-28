/**
  OptSystem Lexical Analyzer
  @author Devpy & 365Bytes Team
  @version 0.0.1 [Beta]
**/
var express = require('express');
var router = express.Router();
var coreConfig = require('../config');
var G = require('../functions');


router.get('/', G.isLogOut, function(req, res, next) {

  res.end('not found!');
});

// --> Do POST request
router.post('/', G.isLogOut, function(req, res, next){

	var action = ( undefined != req.body.act ? req.body.act : 'loadContents');

  if( action == 'loadContents' ){

    var ret = { status: 1, msg: 'ok', lexemas: '', results: ''};
    var fileContent = req.body.fileContent;
    var fileType = req.body.ftype;

    var fileContentDecoded = new Buffer(fileContent, 'base64');
    fileContentDecoded = fileContentDecoded.toString();

    if( undefined != fileContent ){

      ret.status = 1;
      ret.msg = fileContent;

      var resultados;

      //Load Lexemas -->
      if( fileType == 'application/javascript'){

        resultados = {
          'palabras_reservadas': 0,
          'identificadores': 0,
          'numeros': 0,
          'operadores_relacionales': 0,
          'operadores_logicos': 0,
          'operadores_aritmeticos': 0,
          'operadores_asignacion': 0,
          'incrementos': 0,
          'decrementos': 0,
          'simbolos': 0,
          'cadenas': 0,
          'comentarios': 0,

        };

      }else if( fileType == 'text/x-python'){

        resultados = {
          'palabras_reservadas': 0,
          'identificadores': 0,
          'numeros': 0,
          'operadores_relacionales': 0,
          'operadores_logicos': 0,
          'operadores_aritmeticos': 0,
          'operadores_asignacion': 0,
          'incrementos': 0,
          'decrementos': 0,
          'simbolos': 0,
          'cadenas': 0,
          'librerias': 0,
          'comentarios': 0,

        };

      }

      //var tokenizer = new lexing.Tokenizer(rules);

      

      var msgText = '';

      var lineCounter = 0;

      var tt;

      if( fileType == 'application/javascript'){

        if( tt = fileContentDecoded.match(G.jsRegex.comments) ){

          if( tt[0] != '' ){

            var temp = tt.length;

            if( temp > 1 ){

              for( var x = 0; x < temp; x++ ){
                var count = (tt[x].match(/\n/g) || []).length;

              var cc = '';

              for( var ii = 0; ii < count; ii++ ){
                cc += '\n';
              }

                resultados.comentarios += 1;
                fileContentDecoded  =fileContentDecoded.replace(tt[x], cc);
                  msgText = msgText + '<li class="list-group-item">Comentario multilinea: <strong>'+ tt[x] + '</strong> encontrado.</li>';
              }

            }else{

              var count = (tt[0].match(/\n/g) || []).length;

              var cc = '';

              for( var ii = 0; ii < count; ii++ ){
                cc += '\n';
              }

              resultados.comentarios += 1;
              msgText = msgText + '<li class="list-group-item"> Comentario multilinea: <strong>'+ tt[0] + '</strong> encontrado.</li>';

              fileContentDecoded = fileContentDecoded.replace(tt[0], cc);
            }

          }
          

        }

        if( tt = fileContentDecoded.match(G.jsRegex.single_comments) ){

          if( tt[0] != '' ){

            var temp = tt.length;

            if( temp > 1 ){

              for( var x = 0; x < temp; x++ ){
                var count = (tt[x].match(/\n/g) || []).length;

              var cc = '';

              for( var ii = 0; ii < count; ii++ ){
                cc += '\n';
              }
                resultados.comentarios += 1;
                fileContentDecoded  =fileContentDecoded.replace(tt[x], cc);
                  msgText = msgText + '<li class="list-group-item">Comentario simple: <strong>'+ tt[x] + '</strong> encontrado.</li>';
              }

            }else{

              var count = (tt[0].match(/\n/g) || []).length;

              var cc = '';

              for( var ii = 0; ii < count; ii++ ){
                cc += '\n';
              }

              resultados.comentarios += 1;
              msgText = msgText + '<li class="list-group-item"> Comentario simple: <strong>'+ tt[0] + '</strong> encontrado.</li>';

              fileContentDecoded = fileContentDecoded.replace(tt[0], cc);
            }

          }
          

        }

      }else if( fileType == 'text/x-python'){

        if( tt = fileContentDecoded.match(G.pythonRegex.comments) ){

          if( tt[0] != '' ){

            var temp = tt.length;

            if( temp > 1 ){

              for( var x = 0; x < temp; x++ ){
                var count = (tt[x].match(/\n/g) || []).length;

                var cc = '';

                for( var ii = 0; ii < count; ii++ ){
                  cc += '\n';
                }

                resultados.comentarios += 1;
                fileContentDecoded  =fileContentDecoded.replace(tt[x], cc);
                  msgText = msgText + '<li class="list-group-item">Comentario: <strong>'+ tt[x] + '</strong> encontrado.</li>';
              }

            }else{

              var count = (tt[0].match(/\n/g) || []).length;

              var cc = '';

              for( var ii = 0; ii < count; ii++ ){
                cc += '\n';
              }

              resultados.comentarios += 1;
              msgText = msgText + '<li class="list-group-item"> Comentario: <strong>'+ tt[0] + '</strong> encontrado.</li>';

              fileContentDecoded = fileContentDecoded.replace(tt[0], cc);
            }

          }
          

        }

        if( tt = fileContentDecoded.match(G.pythonRegex.single_comments) ){

          if( tt[0] != '' && !tt[0].match(G.pythonRegex.initscript)){

            var temp = tt.length;

            if( temp > 1 ){

              for( var x = 0; x < temp; x++ ){

                
                resultados.comentarios += 1;
                fileContentDecoded  =fileContentDecoded.replace(tt[x], '');
                  msgText = msgText + '<li class="list-group-item">Comentario simple: <strong>'+ tt[x] + '</strong> encontrado.</li>';
              }

            }else{

              var count = (tt[0].match(/\n/g) || []).length;

              var cc = '';

              for( var ii = 0; ii < count; ii++ ){
                cc += '\n';
              }

              resultados.comentarios += 1;
              msgText = msgText + '<li class="list-group-item"> Comentario simple: <strong>'+ tt[0] + '</strong> encontrado.</li>';

              fileContentDecoded = fileContentDecoded.replace(tt[0], cc);
            }

          }
          

        }

      }


      var arrLines = fileContentDecoded.split("\n");

      for( var i = 0; i < arrLines.length; i++ ){

        lineCounter++;

        var line = arrLines[i];
        line = line.trim();

        var result;
        var resultTemp;

        if( fileType == 'application/javascript'){

          // --> Palabras reservadas
          if( result = line.match(G.jsRegex.white) ){}


          if( result = line.match(G.jsRegex.reserved) ){

              if( result[0] != '' ){
                var temp = result.length;
                

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.palabras_reservadas += 1;
                    line = line.replace( result[x], '');

                    msgText = msgText + '<li class="list-group-item">Palabra reservada: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{

                  resultados.palabras_reservadas += 1;

                  line = line.replace( result[0], '');

                   msgText = msgText + '<li class="list-group-item"> Palabra reservada: <strong>'+ result[0] + '</strong> encontrada en la l&iacute;nea #' + lineCounter + '</li>';

                }

              }

             
            }


          if( result = line.match(G.jsRegex.strings) ){
              if( result[0] != '' ){
                
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    line = line.replace( result[x], '');
                    resultados.cadenas += 1;
                    msgText = msgText + '<li class="list-group-item">Cadena: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{

                  resultados.cadenas += 1;
                  line = line.replace( result[0], '');

                  msgText = msgText + '<li class="list-group-item">Cadena: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
            
                }
                
                
              }
            }

           if( result = line.match(G.jsRegex.idents) ){
              if( result[0] != '' ){
                //&& !result[0].match(G.pythonRegex.rs)
                 var temp = result.length;

                 if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.identificadores += 1;

                    line = line.replace( result[x], '');

                    msgText = msgText + '<li class="list-group-item">Identificador: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{
                  resultados.identificadores += 1;
  
                  line = line.replace( result[0], '');
                  msgText = msgText + '<li class="list-group-item">Identificador: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
            
                }

                
              }
            }

          if( result = line.match(G.jsRegex.symbols) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                     resultados.simbolos += 1;
                    msgText = msgText + '<li class="list-group-item">S&iacute;mbolo: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                   resultados.simbolos += 1;
                  msgText = msgText + '<li class="list-group-item">S&iacute;mbolo: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }
              
          //Numeros -->
          if( result = line.match(G.jsRegex.numbers) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.numeros += 1;
                    msgText = msgText + '<li class="list-group-item">N&uacute;mero: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.numeros += 1;
                  msgText = msgText + '<li class="list-group-item">N&uacute;mero: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }


          
          if( result = line.match(G.jsRegex.increment) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.incrementos += 1;
                    line = line.replace( result[x],'');
                    msgText = msgText + '<li class="list-group-item">Incremento: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.incrementos += 1;
                  line = line.replace( result[0],'');
                  msgText = msgText + '<li class="list-group-item">Incremento: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }

            if( result = line.match(G.jsRegex.decrement) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.decrementos += 1;
                    line = line.replace( result[x],'');
                    msgText = msgText + '<li class="list-group-item">Decremento: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.decrementos += 1;
                  line = line.replace( result[0],'');
                  msgText = msgText + '<li class="list-group-item">Decremento: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }


          //var matches = [];


          // if( result = line.match(G.jsRegex.symbols) ){

           
          //   var temp = result.length;

          //   if( result[0] != '' ){
          //     resultados.simbolos += 1;
          //   }

          //   if( temp > 1 ){
          //     for( var x = 0; x < temp; x++ ){
          //       msgText = msgText + '<li class="list-group-item">S&iacute;mbolo: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
          //     }
          //   }else{
          //     msgText = msgText + '<li class="list-group-item">S&iacute;mbolo: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
              
          //   }
          // }

          if( result = line.match(G.jsRegex.rel_operators) ){

              if( result[0] != '' ){
    
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    line = line.replace(result[x], '');
                    resultados.operadores_relacionales += 1;
                    msgText = msgText + '<li class="list-group-item">Operador relacional: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.operadores_relacionales += 1;
                  line = line.replace(result[0], '');
                  msgText = msgText + '<li class="list-group-item">Operador relacional: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }
              
            }

           if( result = line.match(G.jsRegex.assign_operators) ){

              if( result[0] != '' ){
                
                
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    line = line.replace(result[x], '');
                    resultados.operadores_asignacion += 1;
                    msgText = msgText + '<li class="list-group-item">Operador de asignaci&oacute;n: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.operadores_asignacion += 1;
                  line = line.replace(result[0], '');
                  msgText = msgText + '<li class="list-group-item">Operador de asignaci&oacute;n: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }
              
            }

          if( result = line.match(G.jsRegex.math_operators) ){

                if( result[0] != '' ){
                  
                  var temp = result.length;
                  if( temp > 1 ){
                    for( var x = 0; x < temp; x++ ){
                      resultados.operadores_aritmeticos += 1;
                      msgText = msgText + '<li class="list-group-item">Operador aritm&eacute;tico: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                    }
                  }else{
                    resultados.operadores_aritmeticos += 1;
                    msgText = msgText + '<li class="list-group-item">Operador aritm&eacute;tico: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                    
                  }
                }
                
            }


          
          if( result = line.match(G.jsRegex.logic_operators) ){

              if( result[0] != '' ){
                

                
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.operadores_logicos += 1;
                    msgText = msgText + '<li class="list-group-item">Operador l&oacute;gico: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{

                  resultados.operadores_logicos += 1;
                  msgText = msgText + '<li class="list-group-item">Operador l&oacute;gico: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }

              }
            }
          
        }
        else if( fileType == 'text/x-python' ){

          if( result = line.match(G.pythonRegex.initscript) ){

            if( result[1] != '' ){
              resultados.palabras_reservadas += 1;
            }

            msgText = msgText + '<li class="list-group-item"> Inicio de Script: <strong>'+ result[0] + '</strong> encontrada en la l&iacute;nea #' + lineCounter + '</li>';

          }else{


            if( result = line.match(G.pythonRegex.reserved) ){

              if( result[0] != '' ){
                var temp = result.length;
                

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.palabras_reservadas += 1;
                    line = line.replace( result[x], '');

                    msgText = msgText + '<li class="list-group-item">Palabra reservada: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{

                  resultados.palabras_reservadas += 1;

                  line = line.replace( result[0], '');

                   msgText = msgText + '<li class="list-group-item"> Palabra reservada: <strong>'+ result[0] + '</strong> encontrada en la l&iacute;nea #' + lineCounter + '</li>';

                }

              }

             
            }

            if( result = line.match(G.pythonRegex.libs) ){

              if( result[0] != '' ){
                var temp = result.length;
                

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.librerias += 1;
                    line = line.replace( result[x], '');

                    msgText = msgText + '<li class="list-group-item">Libreria: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{

                  resultados.librerias += 1;

                  line = line.replace( result[0], '');

                   msgText = msgText + '<li class="list-group-item">Libreria: <strong>'+ result[0] + '</strong> encontrada en la l&iacute;nea #' + lineCounter + '</li>';

                }

              }

             
            }

            

            if( result = line.match(G.pythonRegex.strings) ){
              if( result[0] != '' ){
                
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    line = line.replace( result[x], '');
                    resultados.cadenas += 1;
                    msgText = msgText + '<li class="list-group-item">Cadena: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{

                  resultados.cadenas += 1;
                  line = line.replace( result[0], '');

                  msgText = msgText + '<li class="list-group-item">Cadena: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
            
                }
                
                
              }
            }

            if( result = line.match(G.pythonRegex.identifiers) ){
              if( result[0] != '' ){
                //&& !result[0].match(G.pythonRegex.rs)
                 var temp = result.length;

                 if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.identificadores += 1;

                    line = line.replace( result[x], '');

                    msgText = msgText + '<li class="list-group-item">Identificador: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                   }
                }else{
                  resultados.identificadores += 1;
  
                  line = line.replace( result[0], '');
                  msgText = msgText + '<li class="list-group-item">Identificador: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
            
                }

                
              }
            }

            if( result = line.match(G.pythonRegex.symbols) ){

              var temp = result.length;

              if( result[0] != '' ){
               
              

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                     resultados.simbolos += 1;
                    msgText = msgText + '<li class="list-group-item">S&iacute;mbolo: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                   resultados.simbolos += 1;
                  msgText = msgText + '<li class="list-group-item">S&iacute;mbolo: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }

            if( result = line.match(G.pythonRegex.numbers) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.numeros += 1;
                    msgText = msgText + '<li class="list-group-item">Numero: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.numeros += 1;
                  msgText = msgText + '<li class="list-group-item">Numero: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }

            if( result = line.match(G.pythonRegex.increment) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.incrementos += 1;
                    line = line.replace( result[x],'');
                    msgText = msgText + '<li class="list-group-item">Incremento: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.incrementos += 1;
                  line = line.replace( result[0],'');
                  msgText = msgText + '<li class="list-group-item">Incremento: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }

            if( result = line.match(G.pythonRegex.decrement) ){

              var temp = result.length;

              if( result[0] != '' ){

                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.decrementos += 1;
                    line = line.replace( result[x],'');
                    msgText = msgText + '<li class="list-group-item">Decremento: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.decrementos += 1;
                  line = line.replace( result[0],'');
                  msgText = msgText + '<li class="list-group-item">Decremento: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }

            }

            if( result = line.match(G.pythonRegex.rel_operators) ){

              if( result[0] != '' ){
    
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    line = line.replace(result[x], '');
                    resultados.operadores_relacionales += 1;
                    msgText = msgText + '<li class="list-group-item">Operador relacional: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.operadores_relacionales += 1;
                  line = line.replace(result[0], '');
                  msgText = msgText + '<li class="list-group-item">Operador relacional: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }
              
            }

            if( result = line.match(G.pythonRegex.assign_operators) ){

              if( result[0] != '' ){
                
                
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.operadores_asignacion += 1;
                    line = line.replace(result[x], '');
                    msgText = msgText + '<li class="list-group-item">Operador de asignaci&oacute;n: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{
                  resultados.operadores_asignacion += 1;
                  line = line.replace(result[0], '');
                  msgText = msgText + '<li class="list-group-item">Operador de asignaci&oacute;n: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }
              }
              
            }

            if( result = line.match(G.pythonRegex.math_operators) ){

                if( result[0] != '' ){
                  
                  var temp = result.length;
                  if( temp > 1 ){
                    for( var x = 0; x < temp; x++ ){
                      resultados.operadores_aritmeticos += 1;
                      msgText = msgText + '<li class="list-group-item">Operador aritm&eacute;tico: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                    }
                  }else{
                    resultados.operadores_aritmeticos += 1;
                    msgText = msgText + '<li class="list-group-item">Operador aritm&eacute;tico: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                    
                  }
                }
                
            }

            if( result = line.match(G.pythonRegex.logic_operators) ){

              if( result[0] != '' ){
                

                
                var temp = result.length;
                if( temp > 1 ){
                  for( var x = 0; x < temp; x++ ){
                    resultados.operadores_logicos += 1;
                    msgText = msgText + '<li class="list-group-item">Operador l&oacute;gico: <strong>'+ result[x] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  }
                }else{

                  resultados.operadores_logicos += 1;
                  msgText = msgText + '<li class="list-group-item">Operador l&oacute;gico: <strong>'+ result[0] + '</strong> encontrado en la l&iacute;nea: #' + lineCounter+ '</li>';
                  
                }

              }
            }



          } //endif::notinitscript

          

        }
        else if( fileType == 'application/php' || fileType == 'application/x-php' ){

            //Soon :)

        }

      }


      ret.lexemas = msgText;

      var resultadosHTML = '';

      for( var token in resultados ){
        var swd = token.replace('_', ' ');
        swd = swd.charAt(0).toUpperCase() + swd.slice(1);
        resultadosHTML = resultadosHTML + '<li class="list-group-item">'+ swd +' <span class="badge">'+resultados[token]+'</span></li>';
      }

      ret.results = resultadosHTML;

      res.end( JSON.stringify(ret) );

            

            

    }else{

      ret.status = 0;
      ret.msg = 'Empty content!';

    }
    
    res.end( JSON.stringify(ret) );


  }

});

module.exports = router;