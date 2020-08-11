const path = require("path");
const ejs = require("ejs");
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

//nodemailer transport
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sarahlmedits@gmail.com",
    pass: "sarahlm123",
  },
});

//landing page
app.get("/", (req, res) => {
  res.render("index");
});
//get-started
app.get("/get-started", (req, res) => {
  res.render("get-started");
});
//post form data
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send("error");
    } else {
      //console.log(JSON.stringify(req.body));
      //console.log(req.file.originalname);
      let fileName = "";
      if (req.file) {
        fileName = req.file.originalname;
      }
      let fName = req.body.firstName;
      let lName = req.body.lastName;
      let email = req.body.email;
      let submissionMethod = req.body.submissionMethod;
      //let file = req.body.fileName;
      let deadline = req.body.option;
      let link = req.body.googleDocLink;
      let wordCount = req.body.wordCount;
      let finalCost = req.body.finalCost;
      let extraNotes = req.body.extraNotes;

      let emailSubject = "New customer!";
      let emailString = `NAME: ${fName} ${lName} \nEMAIL: ${email} \n\nWORDCOUNT: ${wordCount} \nCOST: ${finalCost} \n\nEXTRA NOTES: ${extraNotes} \n\nDEADLINE: ${deadline}`;

      res.render("payment", {
        name: fName,
        email: email,
        submissionMethod: submissionMethod,
        fileName: fileName,
        googleDocLink: link,
        wordCount: wordCount,
        baselineCost: req.body.baselineCost,
        extraCost: req.body.extraCost,
        finalCost: finalCost,
        extraNotes: extraNotes,
      });

      //file upload
      if (req.file) {
        let mailOptions = {
          from: "sarahlmedits@gmail.com",
          to: "sarahlmedits@gmail.com",
          subject: emailSubject,
          text: emailString,
          attachments: [
            {
              filename: req.file.originalname,
              content: new Buffer(req.file.buffer),
            },
          ],
        };
        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            return console.log(err);
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });
      }
      //no file upload
      else {
        let mailOptions = {
          from: "sarahlmedits@gmail.com",
          to: "sarahlmedits@gmail.com",
          subject: emailSubject,
          text: emailString + `\nLINK: ${link}`,
        };
        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            return console.log(err);
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });
      }
      //send client confirmation email
      let mailOptions = {
        from: "sarahlmedits@gmail.com",
        to: req.body.email,
        subject: "Thank you!",
        text: `Thank you for sending us your work! We'll email you back shortly with our edits. \n\nEDIT: ${link}${fileName} \nDEADLINE: ${deadline} \nWORD COUNT: ${wordCount} \nADDITIONAL NOTES: ${extraNotes}`,
      };
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("Message 2 sent: %s", info.messageId);
        }
      });
    }
  });
});

const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
