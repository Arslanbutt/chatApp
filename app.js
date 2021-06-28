const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

let items = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/simpleChatDB",{
  useNewUrlParser: true,
 useUnifiedTopology: true
});

const messageSchema = new mongoose.Schema({
  name : String,
  message : String
});

const Message = mongoose.model('Message',messageSchema);

// const message1 = new Message({
//   name : "book1",
//   message : "Not Known"
// });
//
// message1.save();


app.get('/',function(req,res){
  Message.find({},function(err,messages){
    if(!err){
      messages.forEach(function(message){
        items.push(message);
      })
      res.render("index",{
        newListItem : items
      });
    } else {
      res.send(err);
    }
  });
});


app.post('/',function(req,res){
  console.log("in post method ");
  //res.send("post done");
  let message = req.body.newMessage;
  let name = req.body.newName;
  let message1 = new Message({
    name: name,
    message : message
  });
 message1.save((err) =>{
   if(err){
     res.send(err);
     // sendStatus(500);
   }else{
     items.push(message1);
     res.redirect('/');
     //res.sendStatus(200);
   }
 });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
