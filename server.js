var http = require("http");
var url=require("url");
var fs=require("fs");
//creating a server
var server = http.createServer(function(request, response) {
  //checking if coming request's method is 'GET' then only will do folloeing steps
  if(request.method=='GET'){
    
    var string= request.url;
    var array=string.split("/");
    console.log("after function call");

    //checking whether required file exists or not.
    fs.exists(array[1], function (exists){
      if(exists){
        //if exists then read the file and send it to browser
        console.log("hi file found");
        var image=fs.readFileSync('C:/Users/Limited/Desktop/Assignment3/'+array[1]);
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write('<html><img src="data:image/jpeg;base64,');
        response.write(new Buffer(image).toString('base64'));
        response.end('" height=550/></html>');
        }
      else{
        //else file NOT exists then showing an error message to user on browser.
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("<><h1>File not found " + array[1] + "</h1>");
        response.end();
      }
    });
  }
  else{
    //else showing an error Method type mismathed
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("<><h1>Method type mismathed " + array[1] + "</h1>");
    response.end();
  }
});
//server will available on port 8080.
server.listen(8080);
console.log("Server is listening");