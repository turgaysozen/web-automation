const puppeteer = require('puppeteer')

const launchBrowser = async (headless) => {
    // launch browser as full screen
    const browser = await puppeteer.launch({
        headless: headless,
        args: ['--window-size=1920,1080'],
        defaultViewport: null
    })
    return browser
}

module.exports = launchBrowser