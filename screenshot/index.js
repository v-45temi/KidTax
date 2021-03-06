const puppeteer = require("puppeteer");

const { promisify } = require('util')
const sleep = promisify(setTimeout)
module.exports = async function (context, req) {
    const url = req.query.url || "https://roditel.eu/Form1.wgx";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await sleep(10000);
    
    await page.click("#VWG_7 > div > div > div > div > span") // <- Log In
    //await page.waitForNavigation({ waitUntil: load })
    //document.querySelector("#VWG_7 > div > div > div > div > span")
    //await page.waitForXPath('/html/body/div/div[1]/div[1]/div/div/div/div[1]/div/div/div/div[4]/div/div/div/div[3]/div/div/div/div/span', 5000);
    //const [setting] = await page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[1]/div/div/div/div[4]/div/div/div/div[3]/div/div/div/div/span');
    //await setting.click();

    //const button = await page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[1]/div/div/div/div[4]/div/div/div/div[3]/div/div/div/div/span');
    //await button.click();
    await sleep(10000);

    //await page.type.$x('/html/body/div/div[1]/div[2]/div[3]/div[5]/div/div/div/div/div[4]/input', 'test@test.com')
    //await page.type('input[name=password]', 'test') #TRG_61document.querySelector("#TRG_61")//*[@id="TRG_61"]

    //await page.type('#TRG_61', 'teodoramilusheva@gmail.com');
    //await page.type('#TRG_62', '1850196420');

    const usernameElement = await page.$x('//input[@type="text"][@tabindex="-1"]');
    await usernameElement[0].click();
    await usernameElement[0].type('teodoramilusheva@gmail.com');

    const passwordElement = await page.$x('//input[@type="password"][@tabindex="-1"]');
    await passwordElement[0].click();
    await passwordElement[0].type('1850196420');

    const enter = await page.$x('/html/body/div/div[1]/div[2]/div[3]/div[5]/div/div/div/div/div[2]/div/div/div');
    await enter[0].click()
    await sleep(10000);
    //const tax = await page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div[8]/table/tbody/tr/td/div/div/div[1]/div/table/tbody/tr/td/div/div/div[9]/div/table/tbody/tr/td/div/div/div[2]/div/div/div/div/div/span');

    //const taxelement = await page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div[8]/table/tbody/tr/td/div/div/div[1]/div/table/tbody/tr/td/div/div/div[9]/div/table/tbody/tr/td/div/div/div[2]/div/div/div/div/div/span')
    //const tax  = await page.$eval(page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div[8]/table/tbody/tr/td/div/div/div[1]/div/table/tbody/tr/td/div/div/div[9]/div/table/tbody/tr/td/div/div/div[2]/div/div/div/div/div/span'), el => el.innerText)
    //get the xpath of the webelement

    const [getXpath] = await page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div[8]/table/tbody/tr/td/div/div/div[1]/div/table/tbody/tr/td/div/div/div[9]/div/table/tbody/tr/td/div/div/div[2]/div/div/div/div/div/span');
    //get the text using innerText from that webelement

    const tax = await page.evaluate(name => name.innerText, getXpath);
    //Log the message on screen

    console.log(tax)
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    //console.log(taxelement)
    //const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();
    //"message": year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " Current tax for your kid is " + tax + "BGN",

    context.res = {
        body: {
            tax
        },
        headers: {
            "content-type": "text/plain"
        }
    };
};