const puppeteer = require("puppeteer");
//require('dotenv').config();
const { promisify } = require('util')
const sleep = promisify(setTimeout)
const KrisUser = process.env.KrisUser 
const KrisPass = process.env.KrisPass 
const MoniUser = process.env.MoniUser 
const MoniPass = process.env.MoniPass 

module.exports = async function (context, req) {
    const url = req.query.url || "https://roditel.eu/Form1.wgx";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await sleep(10000);
    
    await page.click("#VWG_7 > div > div > div > div > span") // <- Log In

    await sleep(10000);

    console.log(KrisUser)
    console.log(MoniUser)
    const usernameElement = await page.$x('//input[@type="text"][@tabindex="-1"]');
    await usernameElement[0].click();
    await usernameElement[0].type(KrisUser);

    const passwordElement = await page.$x('//input[@type="password"][@tabindex="-1"]');
    await passwordElement[0].click();
    await passwordElement[0].type(KrisPass);

    const enter = await page.$x('/html/body/div/div[1]/div[2]/div[3]/div[5]/div/div/div/div/div[2]/div/div/div');
    await enter[0].click()
    await sleep(10000);


    const [getXpath] = await page.$x('/html/body/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div[8]/table/tbody/tr/td/div/div/div[1]/div/table/tbody/tr/td/div/div/div[9]/div/table/tbody/tr/td/div/div/div[2]/div/div/div/div/div/span');
    //get the text using innerText from that webelement

    const tax = await page.evaluate(name => name.innerText, getXpath);
    //Log the message on screen

    console.log(tax)


    //MONI TAX
    const moniurl = req.query.url || "https://roditel.eu/Form1.wgx";
    const monibrowser = await puppeteer.launch();
    const monipage = await monibrowser.newPage();
    await monipage.goto(moniurl);
    await sleep(10000);
    
    await monipage.click("#VWG_7 > div > div > div > div > span") // <- Log In

    await sleep(10000);


    const moniusernameElement = await monipage.$x('//input[@type="text"][@tabindex="-1"]');
    await moniusernameElement[0].click();
    await moniusernameElement[0].type(MoniUser);

    const monipasswordElement = await monipage.$x('//input[@type="password"][@tabindex="-1"]');
    await monipasswordElement[0].click();
    await monipasswordElement[0].type(MoniPass);

    const monienter = await monipage.$x('/html/body/div/div[1]/div[2]/div[3]/div[5]/div/div/div/div/div[2]/div/div/div');
    await monienter[0].click()
    await sleep(10000);


    const [monigetXpath] = await monipage.$x('/html/body/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div[8]/table/tbody/tr/td/div/div/div[1]/div/table/tbody/tr/td/div/div/div[9]/div/table/tbody/tr/td/div/div/div[2]/div/div/div/div/div/span');
    //get the text using innerText from that webelement

    const monitax = await monipage.evaluate(name => name.innerText, monigetXpath);
    //Log the message on screen

    console.log(monitax)


    ///////////

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

    await browser.close();

    context.res = {
        body: {
            "messagekris": year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " Current tax for your kid is " + tax + "BGN",
            "taxvaluekris": tax,
            "messagemoni": year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " Current tax for your kid is " + monitax + "BGN",
            "taxvaluemoni": monitax
        },
        headers: {
            "content-type": "application/json"
        }
    };
};