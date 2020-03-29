const puppeteer = require('puppeteer');
const faker = require('faker');

// const url = process.argv[2];
const roomId = "kar-pad-muz"
const url = `https://live.testpress.in/b/${roomId}`;
if (!url) {
    throw "Please provide URL as a first argument";
}

async function run () {
    console.log("Starting test")
    const browser = await puppeteer.launch({args: ['--no-sandbox'], headless: true});
    const page = await browser.newPage();
    const name = faker.name.findName();
    await page.goto(url);
    await page.waitForSelector(`#\_b_${roomId}_join_name`)
    console.log("Successfully logged as ", name)

    await page.$eval(`#\_b_${roomId}_join_name`, (el, value) => el.value = value, name);
    await page.click('.col-lg-6 > form > .input-group > .input-group-append > .btn')
    console.log(`${name} Successfully joined in conference`)

    await page.waitFor(100000)
    console.log(`${name} left the conference`)
    browser.close();
}
run();
