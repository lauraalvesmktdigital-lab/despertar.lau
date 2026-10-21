const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.pdf':'application/pdf','.png':'image/png','.JPG':'image/jpeg'};
http.createServer((req,res)=>{
 const url = new URL(req.url,'http://localhost');
 if (url.pathname === '/cadastro' || url.pathname === '/espera') { res.writeHead(302, {Location: url.pathname === '/cadastro' ? '/public/ritual-chakra-laringeo.pdf' : '/#caminhos'}); return res.end(); }
 const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
 if(!['index.html','style.css','app.js','public/ritual-chakra-laringeo.pdf','public/receitas-que-nutrem.pdf','public/images/receitas-que-nutrem.png','public/images/chakra-laringeo.png','public/images/chakra-expressao.png','public/images/tres-a-dois-t.png','public/images/ritual-receita.png','public/images/youtube-perfil.png','public/images/bau-ferramentas.png','public/images/mar-entardecer.png','public/images/BF1760B5-9683-463B-94B6-FA23C456F9C4.JPG'].includes(file)){res.writeHead(404);return res.end('Não encontrado');}
 fs.readFile(path.join(__dirname,file),(err,data)=>{if(err){res.writeHead(500);return res.end('Erro ao carregar');}const headers = {'Content-Type':types[path.extname(file)], 'Content-Length':data.length}; if (file.endsWith('.pdf')) headers['Content-Disposition'] = 'inline; filename="' + path.basename(file) + '"'; res.writeHead(200,headers);res.end(data);});
}).listen(process.env.PORT || 3000,'0.0.0.0');
