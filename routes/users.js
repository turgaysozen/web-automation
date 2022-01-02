const router = require('express').Router()
const start = require('../automation')
const scrape = require('../scrape')

// add a post
router.post('/', async (req, res) => {
    const user = req.body
    await start(user)
})

router.post('/get-info', async (req, res) => {
    const profile_url = req.body.url
    const userInfo = await scrape(profile_url)
    res.status(200).json(userInfo)
})

module.exports = router