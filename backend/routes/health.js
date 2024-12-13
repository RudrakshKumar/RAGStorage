const express = require('express');
const router = express.Router();

router.get('/' , 


    async (req,res) => {
        try{
            res.send("Hello World");
        }catch(e){
            res.status(500).send('Some error occured');
        }
    }
)

module.exports = router;