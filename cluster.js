const { Cluster } = require('puppeteer-cluster');
const puppeteer = require('puppeteer');
const faker = require('faker');

const url = "https://live.testpress.in/b/kar-pad-muz";

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 100,
        puppeteerOptions: {args: ['--no-sandbox'], headless:false}
    });

    await cluster.task(async ({ page }) => {
        console.log("Starting test")
        const name = faker.name.findName();
        await page.goto(url);
        await page.waitForSelector('#\_b_kar-pad-muz_join_name')
        console.log("Successfully logged as ", name)
        await page.$eval('#\_b_kar-pad-muz_join_name', (el, value) => el.value = value, name);
        await page.click('.col-lg-6 > form > .input-group > .input-group-append > .btn')
        console.log(`${name} Successfully joined in conference`)
        await page.waitFor(200000)
        console.log(`${name} left the conference`)
    });

    for (var i=0;i <40; i ++) {
        cluster.queue();
    }
    // many more pages

    await cluster.idle();
    await cluster.close();
})();