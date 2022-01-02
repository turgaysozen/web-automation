const launchBrowser = require('./utils')

const scrape = async (profile_url) => {

    // launch browser with headless mode
    const browser = await launchBrowser(headless = true)

    const page = await browser.newPage()
    await page.goto(profile_url)

    // scrape user name, number of listing and profile photo source

    let [xPathOfName] = await page.$x('//span[@class="ellipses"]');
    let name = await page.evaluate(element => element.textContent, xPathOfName);

    let [xPathOfListing] = await page.$x('//a[@class="router-link-exact-active navigation--horizontal__link--selected  navigation--horizontal__link"]');
    let numberOfListing = await page.evaluate(element => element.textContent, xPathOfListing);

    let [xPathOfProfilePhoto] = await page.$x('//img[@class="closet__header__info__user-image user-image"]');
    let profilPhotoSrc = await page.evaluate(element => element.src, xPathOfProfilePhoto);

    // return user info to the client side
    const userInfo = {
        name: name,
        numberOfListing: numberOfListing,
        profilPhotoSrc: profilPhotoSrc
    }

    return userInfo
}

module.exports = scrape