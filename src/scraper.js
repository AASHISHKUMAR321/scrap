const puppeteer = require('puppeteer')


async function scrapeChannel(url, input) {


    const browser = await puppeteer.launch({ headless: false })

    const page = await browser.newPage();
    await page.goto(url);



    let titles = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".BjJfJf"),
            (element) => element.textContent
        )
    );

    const hrefs = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".EDblX"),
            (element) =>
            element.firstElementChild.firstElementChild.firstElementChild.href
        )
    );

    browser.close();
    input = input.trim();
    input = input.split(" ");


    input = input.map(e => e.toLowerCase())
    titles = titles.map(e => e.toLocaleLowerCase())


    const checker = (title) => {
        let doesTitleContain = input.some((tech) => {
            let truthy = title.includes(tech);
            return truthy;
        });
        if (doesTitleContain) return true;
    }

    titles = titles.filter((title) => checker(title));

    return { titles, hrefs }

}

module.exports = {
    scrapeChannel
}