const express = require("express")
 const router = express.Router()

 router.get("/", (req, res) => {
    console.log("got here");
   return res.json("who am i")
 })

module.exports = router