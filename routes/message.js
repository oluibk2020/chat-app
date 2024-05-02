const express = require('express');
const router = express.Router()

router.get("/", (req, res) => {
   return res.send("<h1>hello world</h1>") 
})

module.exports = router