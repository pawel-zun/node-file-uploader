var fs = require('fs');
var formidable = require('formidable');

var fileName = "";

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    fileName = files.upload.name;
    fs.renameSync(files.upload.path, fileName);
    fs.readFile('templates/upload.html', function(err, html) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();      
    });
  });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.sendStyle = function(request, response) {
    fs.readFile('templates/style.css', function(err, cssFile) {
      console.log("Przesyłam klientowi plik ze stylami.");
      response.writeHead(200, {"Content-Type": "text/css"});
      response.end(cssFile);        
    });
}

exports.sendBackground = function(request, response) {
    fs.readFile('templates/hypnotize.png', function(err, bgImg) {
      console.log("Przesyłam klientowi obrazek tła.");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.end(bgImg);        
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    fs.readFile(fileName, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}