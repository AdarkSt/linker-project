const {Router} = require('express')
const router = new Router()
const Link = require('../models/Link')

router.get('/:code', async(req, res) => {
    try{    
        const link = await Link.findOne({code: req.params.code})

        if(link) {
            link.clicks++
            await link.save()
            res.redirect(link.from)
        }

        res.status(404).json({message: "Link is not found"})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router