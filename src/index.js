const puppeteer = require("puppeteer");
const mkdirp = require("mkdirp");
const path = require("path");
async function delay() {
  await sleep(1000);
  console.log(`Passando 1 Segundo...`);
}

async function sleep(ml) {
  setTimeout(() => {
    return Promise.resolve();
  }, ml);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    //headless: false
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.animesvision.com.br/animes/boku-no-hero-academia-4"
  );
  //await page.waitFor('div[class="jw-top jw-reset"]');

  //await page.keyboard.press(String.fromCharCode(13));

  const hrefs = await page.evaluate(() => {
    const anchors = document.querySelectorAll(".sli-name > a[href]");
    return [].map.call(anchors, a => a.href);
  });

  for (let x = 0; x < hrefs.length; x++) {
    delay();

    await page.goto(hrefs[x]);
    await page.waitFor('div[class="jw-top jw-reset"]');
    await page.keyboard.press(String.fromCharCode(13));

    let video = await page.$eval('video[class="jw-video jw-reset"]', el =>
      el.getAttribute("src")
    );

    console.log(video);
  }
  await browser.close();
})();
