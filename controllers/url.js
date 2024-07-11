const shortid = require('shortid')
const URL = require('../models/url')

async function handlegenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: 'Url is Require' })
    const shortID = shortid(3)
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        vistHistory: [],
    });
    return res.json({ id: shortID })
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({ totalClicks: result.vistHistory.length, analytics: result.vistHistory })

}
async function handleAllUrlAnalytics(req, res) {
    const result = await URL.find()
    return res.json(result)
}


module.exports = {
    handlegenerateNewShortUrl, handleAllUrlAnalytics, handleAnalytics
}