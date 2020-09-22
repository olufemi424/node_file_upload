const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

//upload route
app.get("/", (req, res) => {
  res.status(200).json({ data: 'Hello there' });
});

//upload route
app.post("/upload", (req, res) => {
  //check if files is present
  if (req.files === null) {
    return res.status(400).json({ message: "No file upload" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err); 
    }
  });

  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
