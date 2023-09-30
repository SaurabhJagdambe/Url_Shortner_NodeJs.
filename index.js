const express = require("express");
const { connectToMongodb } = require("./connect");
const path = require('path')
const app = express();
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticrouter')
const URL = require("./models/url");
const PORT = 1001;

connectToMongodb("mongodb://127.0.0.1:27017/shortUrl").then(() =>
  console.log("Mongo Db connected")
);

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//ejs view engine
app.set('view engine','ejs');
app.set('views',path.resolve('./views')); //path

// app.get('/test',async (req,res)=>{
//     const allUrls= await URL.find({});
//     return res.render('home',{
//         urls: allUrls,
//     })
// })

app.use("/url",urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try{
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      }
    }
  );
    // Check if entry exists before redirecting
    if (entry && entry.redirectURL) {
      res.redirect(entry.redirectURL);
    } else {
      // Handle the case where no matching record was found
      res.status(404).send("URL not found");
    }
  } catch (error) {
    // Handle any errors that occurred during the database query
    console.error(error);
    res.status(500).send("Internal Server Error");
  }


});

app.listen(PORT, () => console.log(`Server Started at PORT, ${PORT}`));
