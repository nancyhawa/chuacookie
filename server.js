// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  layoutsDir: __dirname + "/views"
});
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SENDGRID_SERVER,
    port: process.env.SENDGRID_PORT,
    secure: true, 
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_KEY
    }
});
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render('index');
});

app.get("/gallery", function (request, response) {
  response.render('gallery');
});

app.get("/pricing", function (request, response) {
  response.render('pricing');
});

app.get("/contact", function (request, response) {
  response.render('contact');
});

app.post("/contact", function (request, response) {  
    let mailOptions = {
        from: `"${request.body.name}" <${request.body.from}>`, // sender address
        to: process.env.RECIPIENT, // list of receivers
        subject: request.body.subject, // Subject line
        text: request.body.text, // plain text body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return response.send({error: error})
        }

        return response.send({info: "success"})
    });
  
});

app.post("/quote", function (request, response) {

    let text = `
    Customer Name: ${request.body.name}\n
    Customer Email: ${request.body.from}\n
    Event Date: ${request.body.event_date}\n
    Pickup Date: ${request.body.pickup_date}\n
    Pickup Date: ${request.body.theme}\n
    Approximate Quanity Requested: ${request.body.quantity}\n
    Giftbox Size: ${request.body.giftbox_size || "None"}\n
    Favor Packaging: ${request.body.favor_packaging  || "None"}\n\n\n


    Additional Comments: \n
    ${request.body.additional_comments || "None"}
    `
    let mailOptions = {
        from: `"${request.body.name}" <${request.body.from}>`, // sender address
        to: process.env.RECIPIENT, // list of receivers
        subject: "ChuaCookie Quote Inquiry", // Subject line
        text: text, // plain text body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return response.send({error: error})
        }

        return response.send({info: "success"})
    });
  
});

app.get("/classes", function (request, response) {
  response.render('classes');
});

app.get("/thanks", function (request, response) {
  response.render('thanks');
});

app.get("/faq", function (request, response) {
  response.render('faq');
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
