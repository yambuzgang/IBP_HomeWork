var webdriver = require('selenium-webdriver'),
    until = webdriver.until;
var wait = require('wait')
var assert = require('assert')
var url = 'https://shelly-studio.com/'

async function waitForXpath(xpath) {
    let arr = await driver.wait(until.elementLocated(webdriver.By.xpath(xpath)),50000);
}


var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome())
    .build();


async function firstQuestion() {
    console.log("Task 1:");
    await driver.get(url);
    await driver.findElement(webdriver.By.xpath('//*[@id="AccessibleNav"]/li[2]/a'), [0]).click();
    console.log("Open catalog tab successfully")
    await driver.findElement(webdriver.By.xpath('//*[@id="AccessibleNav"]/li[3]/a'), [0]).click();
    console.log("Open bags tab successfully")
    await driver.close();
}

async function secondQuestion() {
    console.log("Task 2:");
    await driver.get(url);
    await waitForXpath('//*[@id="shellys-studio"]/div[5]/div/div/div')
    let lang = await driver.findElement(webdriver.By.xpath('//*[@id="shellys-studio"]/div[5]/div/div/div'),[0]).getText()
    while (lang !== "ILS"){await wait(400);lang = await driver.findElement(webdriver.By.xpath('//*[@id="shellys-studio"]/div[5]/div/div/div'),[0]).getText()}
    await driver.findElement(webdriver.By.xpath('//*[@id="shellys-studio"]/div[5]/div/div/div'),[0]).click()
    await driver.findElement(webdriver.By.xpath('//*[@id="CAD"]/span'),[0]).click()
    console.log("Currency successfully changed to CAD")
    await wait(2000);
    await driver.close()
}


async function ThirdQuestion() {
    console.log("Task 3:");
    await driver.get(url);
    await waitForXpath('//*[@id="AccessibleNav"]/li[5]/a/span/span[1]')
    await driver.findElement(webdriver.By.xpath('//*[@id="AccessibleNav"]/li[5]/a/span/span[1]'),[0]).click()
    await driver.findElement(webdriver.By.xpath('//*[@id="SearchModal"]/form/input'),[0]).sendKeys('Gold Chains Handbag')
    await driver.findElement(webdriver.By.xpath('//*[@id="SearchModal"]/form/span/button'),[0]).click()
    console.log("Searched for the item");

    await waitForXpath('//*[@id="ProductImageWrapper-14526389518503"]/div/img')
    await driver.findElement(webdriver.By.xpath('//*[@id="ProductImageWrapper-14526389518503"]/div/img'),[0]).click()
    console.log("Green color selected");

    await waitForXpath('//*[@id="ProductSelect-option-0"]/label[2]')
    await driver.findElement(webdriver.By.xpath('//*[@id="ProductSelect-option-0"]/label[2]'),[0]).click()
    console.log("The item added to cart");

    await driver.findElement(webdriver.By.xpath('//*[@id="AddToCart--product-template"]/span'),[0]).click()
    console.log("Proceed to checkout");

    await waitForXpath('//*[@id="PageContainer"]/main/div/div/div/form/div[3]/div/div/button[2]')
    await driver.findElement(webdriver.By.xpath('//*[@id="PageContainer"]/main/div/div/div/form/div[3]/div/div/button[2]'),[0]).click()

    await waitForXpath('//*[@id="checkout_email_or_phone"]')
    await driver.findElement(webdriver.By.xpath('//*[@id="checkout_email_or_phone"]'),[0]).sendKeys('test@gmail.com')
    await wait(500)
    await driver.findElement(webdriver.By.xpath('//*[@id="checkout_shipping_address_first_name"]'),[0]).sendKeys('First Name')
    await wait(500)
    await driver.findElement(webdriver.By.xpath('//*[@id="checkout_shipping_address_last_name"]'),[0]).sendKeys('Second Name')
    await wait(500)
    await driver.findElement(webdriver.By.xpath('//*[@id="checkout_shipping_address_address1"]'),[0]).sendKeys('Address')
    await wait(500)
    await driver.findElement(webdriver.By.xpath('//*[@id="checkout_shipping_address_city"]'),[0]).sendKeys('Tel Aviv')
    await wait(500)
    await driver.findElement(webdriver.By.xpath('//*[@id="continue_button"]'),[0]).click()
    console.log("All the mandatory fields filled and sent");

    await wait(3000)
    const contact = await driver.findElement(webdriver.By.xpath('/html/body/div/div/div/main/div[1]/form/div[1]/div[1]/div/div/div[1]/div[1]/div[2]/bdo'),[0]).getText()
    assert.equal('test@gmail.com', contact);
    const shipTo = await driver.findElement(webdriver.By.xpath('/html/body/div/div/div/main/div[1]/form/div[1]/div[1]/div/div/div[2]/div[1]/div[2]/address'),[0]).getText()
    assert.equal('Address, Tel Aviv, Israel', shipTo);
    await driver.close()
    console.log("Contact form is with the right credentials")
    await wait(2000)

}

// firstQuestion()
// secondQuestion()
ThirdQuestion()