const launchBrowser = require('./utils')

const start = async (user) => {

    const browser = await launchBrowser(headless = false)

    const page = await browser.newPage()
    await page.goto('https://poshmark.com/signup')

    // iterate over all user information
    for (const [key, value] of Object.entries(user)) {
        if (key === 'gender') {
            // full Xpath of gender dropdownlist
            const gender = await page.$x('/html/body/div[1]/main/div[2]/div/div/div[2]/div[3]/form/div[5]/div/div[1]/div/div')
            await gender[0].click()

            // iterates 'value' times and key press down to select exact country 
            for (let i = 0; i < value; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
        }
        else if (key === 'country') {
            // full Xpath of country dropdownlist
            const country = await page.$x('/html/body/div[1]/main/div[2]/div/div/div[2]/div[3]/form/div[6]/div[1]/div[1]/div/div')
            await country[0].click()
            for (let i = 0; i < value; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.keyboard.press('Enter');
        }
        else if (key === 'userName') {
            await page.type('input[name="userName"]', value);
        }
        else {
            await page.type(`#${key}`, `${value}`)
        }
    }

    // click to Next Button
    await Promise.all([
        await page.click('#content > div > div > div.p--v--5 > div.pm-form > form > div.form__actions.signup__footer > button'),
        page.waitForNavigation()
    ]);

    await browser.close()
}

module.exports = start