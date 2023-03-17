//modulos
const fs = require('fs');//modulo para leer archivos
const http = require('http');//peticiones http
const url = require('url');//parsear las urls



//DEFINICION DE MODULOS
const  replaceHtml = require('./modules/replaceHtml');//modulo costumizado para renderizar el html del usuario

//LECTURA DE LOS HTML
//***************************************/
const html = fs.readFileSync('./views/index.html', 'utf-8')
let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
let usersHtml = fs.readFileSync('./views/users-list.html', 'utf-8');

//CREAR EL SERVIDOR
 const server = http.createServer((request, response) => {
     let {query, pathname: path} = url.parse(request.url, true)

    
     if(path === '/' || path.toLocaleLowerCase() ==='/home'){
         response.writeHead(200, {
             'Content-Type' : 'text/html'
         });
         response.end(html.replace('{{%CONTENT%}}', 'Estas en la pagina Principal'));
     } 
        else if(path.toLocaleLowerCase() === '/users'){
         
             let userHtmlArray = users.map((user) => {
                 return replaceHtml(usersHtml, user);
             })
             console.log(userHtmlArray);
             let usersResponseHtml = html.replace('{{%CONTENT%}}', userHtmlArray.join());
             response.writeHead(200, {'Content-Type': 'text/html' });
             response.end(usersResponseHtml);
         
     } else {
         response.writeHead(404, {
             'Content-Type' : 'text/html'
         });
         response.end(html.replace('{{%CONTENT%}}', 'Error 404: Pagina no encontrada!'));
     }
 });

//INICIA EL SERVIDOR
 server.listen(8000, '127.0.0.1', () => {
     console.log('Servidor iniciado!');
 })