const { Cluster } = require('puppeteer-cluster');
const puppeteer = require('puppeteer');
const faker = require('faker');

const url = "https://live.testpress.in/b/kar-pad-muz";

async function run () {
    console.log("Starting test")
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const name = faker.name.findName();
    await page.goto(url);
    await page.waitForSelector('#\_b_kar-pad-muz_join_name')
    console.log("Successfully logged as ", name)
    await page.$eval('#\_b_kar-pad-muz_join_name', (el, value) => el.value = value, name);
    await page.click('.col-lg-6 > form > .input-group > .input-group-append > .btn')
    console.log(`${name} Successfully joined in conference`)
    await page.waitFor(100000)
    console.log(`${name} left the conference`)
    browser.close();
}

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 100,
        monitor: true
    });

    await cluster.task(async ({ page }) => {
        run()
        // Store screenshot, do something else
    });

    for (var i=0;i <40; i ++) {
        cluster.queue();
    }
    // many more pages

    await cluster.idle();
    await cluster.close();
})();