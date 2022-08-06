var express = require('express');
var path = require('path');
const sql = require('mssql');
var bodyParser = require('body-parser');
var db = require('./config/db');
// let { PythonShell } = require('python-shell');
const fs = require('fs'); 
const {keccak256} = require('ethereumjs-util');
const ethers = require('ethers');

const { BlobServiceClient } = require("@azure/storage-blob");
let FileSaver = require('file-saver');

var app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, './public')));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/lorem', function(req,res){
  res.sendFile(path.join(__dirname, './public/lorem.html'));
});

app.get('/faq', function(req,res){
  res.sendFile(path.join(__dirname, './public/faq.html'));
});
app.get('/comic', function(req,res){
  res.sendFile(path.join(__dirname, './public/comic.html'));
});
app.get('/comic1', function(req,res){
  res.sendFile(path.join(__dirname, './public/comic1.html'));
});
app.get('/comic2', function(req,res){
  res.sendFile(path.join(__dirname, './public/comic2.html'));
});
app.get('/comic3', function(req,res){
  res.sendFile(path.join(__dirname, './public/comic3.html'));
});

app.get('/gallery', function(req,res){
    res.sendFile(path.join(__dirname, './public/gallery.html'));
});

// app.get('/allow', function(req,res){
//   res.sendFile(path.join(__dirname, './public/alsearch.html'));
// });

// app.get('/tiny', function(req,res){
//   res.sendFile(path.join(__dirname, './public/fcfs.html'));
// });

// app.get('/hue', function(req,res){
//   res.sendFile(path.join(__dirname, './public/almint.html'));
// });

// let aldata=fs.readFileSync('file/alsignature.json')
// let aljson = JSON.parse(aldata);
// app.post('/mnt/alsignature',function(req,res){
//     // let alrawdata=fs.readFileSync('file/alsignature.json')
//     // let aljson = JSON.parse(aldata);
//     let address = req.body.address;
//     let aladdress = aljson[address];
//     res.send(aladdress);
// })

// let fcfsalrawdata=fs.readFileSync('file/fcfsalsignature.json')
// let fcfsaljson = JSON.parse(fcfsalrawdata);
// app.post('/mnt/fcfsalsignature',function(req,res){
//   // let alrawdata=fs.readFileSync('file/fcfsalsignature.json')
//   // let aljson = JSON.parse(alrawdata);
//   let address = req.body.address;
//   let aladdress = fcfsaljson[address];
//   res.send(aladdress);
  
// })

// app.post('/mnt/authsignature',async function(req,res){
//   let address = req.body.address;
//   if(address!=""){
//     const privateKey = '0227cc80a230ca8c1ebecaf8cd40045ebc15e7dcd2c472b26babcf16eb77f379';
//     const signer = new ethers.Wallet(privateKey);
//     const userAddress = ethers.utils.getAddress(address);
//     let message = ethers.utils.solidityPack(["uint256", "address"],[1 , userAddress]);
//     let messageHash = ethers.utils.keccak256(message);
//     let messageBytes = ethers.utils.arrayify(messageHash);
//     let signature = await signer.signMessage(messageBytes);
//     res.send(signature);
//   }
// })

// let loremal=fs.readFileSync('file/loremal.json')
// let loremaljson = JSON.parse(loremal);
// app.post('/al',function(req,res){
//   let resultData;
//   let address = req.body.address;
//   resultData = loremaljson.filter(function(d) {
//     // return vm.address.indexOf(d.wallet) != -1
//     return address.toUpperCase() == d.wallet.toUpperCase()
//   })
  
//   if(address.length == 40){
//   sql.connect(db, function (err) {
//     if (err) {
//         console.log(err);
//     }

//     var request = new sql.Request();
//     request.input('address', sql.VarChar(128), address);
//     request.query("INSERT [dbo].[LOREM_AL_CHECK] (Address) VALUES (@address)", function (err, result1) {
//         if (err) {
//             console.log(err);
//             res.send('');
//         }
//         sql.close();
//     }); // request.query
//   }); // sql.conn
//   }
//   res.send(resultData);
// })


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));