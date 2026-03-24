const { Builder, By, until, Select, includes } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/index.php?route=common/home&language=en-gb'
const LOGIN_URL =
  'http://localhost/index.php?route=account/login&language=en-gb'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}
async function fillCheckoutForm () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    let viewProduct = await driver
      .findElement(
        By.css(
          'div.mb-3:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)'
        ),
        5000
      )
      .click()
    let quantity = await driver.findElement(By.id('input-quantity'))
    await quantity.clear()
    await quantity.sendKeys(2)
    await driver.findElement(By.id('button-cart'), 5000).click()

    await driver.wait(async () => {
      try {
        let cartElement = await driver.findElement(
          By.xpath('/html/body/div/header/div/div/div[3]/div/button')
        )
        let text = await cartElement.getText()
        return text.includes('2 item(s)')
      } catch (e) {
        return false
      }
    }, 5000)

    await driver
      .findElement(By.xpath('/html/body/div/header/div/div/div[3]/div/button'))
      .click()

    await driver
      .findElement(
        By.xpath('/html/body/div/header/div/div/div[3]/div/ul/li/div/p/a[2]'),
        5000
      )
      .click()

    await driver.findElement(By.id('input-guest')).click()
    await driver.findElement(By.id('input-firstname')).sendKeys('John')
    await driver.findElement(By.id('input-lastname')).sendKeys('Doe')
    await driver.findElement(By.id('input-email')).sendKeys('johndoe@email.com')
    await driver.findElement(By.id('input-shipping-address-1')).sendKeys('123')
    await driver.findElement(By.id('input-shipping-city')).sendKeys('123')
    await driver.findElement(By.id('input-shipping-postcode')).sendKeys('123')

    let countrySelect = await driver.findElement(
      By.id('input-shipping-country')
    )
    let countryDropdown = new Select(countrySelect)
    await countryDropdown.selectByVisibleText('United States')

    let stateDropdown = await driver.wait(
      until.elementLocated(By.id('input-shipping-zone')),
      5000
    )
    await driver.wait(until.elementIsEnabled(stateDropdown), 5000)

    await driver.wait(async () => {
      let options = await stateDropdown.findElements(By.tagName('option'))
      return options.length > 1
    })

    let zoneSelect = new Select(stateDropdown)
    await zoneSelect.selectByVisibleText('Washington')

    let regBtn = await driver.findElement(By.id('button-register'))

    await driver.wait(until.elementIsVisible(regBtn), 5000)
    await driver.wait(until.elementIsEnabled(regBtn), 5000)
    await driver.executeScript('arguments[0].scrollIntoView();', regBtn)
    await driver.executeScript('arguments[0].click();', regBtn)
    let regAlert = await driver.wait(
      until.elementLocated(By.css('.alert')),
      5000
    )
    let regText = await regAlert.getText()
    let regExpected = 'Success: Your guest account information has been saved!'
    assert.strictEqual(regText, regExpected, 'Register not work!')
    console.log('Guest account saved!')
  } finally {
    await driver.quit()
  }
}

async function submitOrder () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)
    let viewProduct = await driver
      .findElement(
        By.css(
          'div.mb-3:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)'
        ),
        5000
      )
      .click()
    let quantity = await driver.findElement(By.id('input-quantity'))
    await quantity.clear()
    await quantity.sendKeys(2)
    await driver.findElement(By.id('button-cart'), 5000).click()

    await driver.wait(async () => {
      try {
        let cartElement = await driver.findElement(
          By.xpath('/html/body/div/header/div/div/div[3]/div/button')
        )
        let text = await cartElement.getText()
        return text.includes('2 item(s)')
      } catch (e) {
        return false
      }
    }, 5000)

    await driver
      .findElement(By.xpath('/html/body/div/header/div/div/div[3]/div/button'))
      .click()

    await driver
      .findElement(
        By.xpath('/html/body/div/header/div/div/div[3]/div/ul/li/div/p/a[2]'),
        5000
      )
      .click()

    await driver.findElement(By.id('input-guest')).click()
    await driver.findElement(By.id('input-firstname')).sendKeys('John')
    await driver.findElement(By.id('input-lastname')).sendKeys('Doe')
    await driver.findElement(By.id('input-email')).sendKeys('johndoe@email.com')
    await driver.findElement(By.id('input-shipping-address-1')).sendKeys('123')
    await driver.findElement(By.id('input-shipping-city')).sendKeys('123')
    await driver.findElement(By.id('input-shipping-postcode')).sendKeys('123')

    let countrySelect = await driver.findElement(
      By.id('input-shipping-country')
    )
    let countryDropdown = new Select(countrySelect)
    await countryDropdown.selectByVisibleText('United States')

    let stateDropdown = await driver.wait(
      until.elementLocated(By.id('input-shipping-zone')),
      5000
    )
    await driver.wait(until.elementIsEnabled(stateDropdown), 5000)

    await driver.wait(async () => {
      let options = await stateDropdown.findElements(By.tagName('option'))
      return options.length > 1
    })

    let zoneSelect = new Select(stateDropdown)
    await zoneSelect.selectByVisibleText('Washington')

    let regBtn = await driver.findElement(By.id('button-register'))

    await driver.wait(until.elementIsVisible(regBtn), 5000)
    await driver.wait(until.elementIsEnabled(regBtn), 5000)
    await driver.executeScript('arguments[0].scrollIntoView();', regBtn)
    await driver.executeScript('arguments[0].click();', regBtn)

    let paymentBtn = await driver
      .findElement(By.id('button-payment-methods'))
      .click()

    let payElement = driver.findElement(By.id('error-payment-method'), 5000)

    await driver.wait(until.elementIsVisible(payElement), 5000)
    const payText = (await payElement.getText()).trim()

    assert.ok(
      payText.includes('No Payment options are available'),
      `No methods: got "${payText}"`
    )
    console.log('Payment method is missing')
  } finally {
    await driver.quit()
  }
}
async function validateOrderConfirmation () {
  let driver = await createDriver()

  try {
    await driver.get(LOGIN_URL)

    await driver.findElement(By.id('input-email')).sendKeys('johndoe@email.com')
    await driver.findElement(By.id('input-password')).sendKeys('eA07:?j6*&Kq')

    await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[2]/div/form/div[3]/button'
        ),
        10000
      )
      .click()

    let myAccount = await driver.wait(
      until.elementLocated(By.xpath('/html/body/div/main/div[2]/div/div/h1')),
      10000
    )
    await driver.wait(until.elementIsVisible(myAccount), 5000)
    await driver.wait(until.elementIsEnabled(myAccount), 5000)

    let acc = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div/nav/div/div/div[2]/ul/li[2]/div/a/span')
      ),
      5000
    )
    await acc.click()
    await driver.wait(until.elementIsVisible(acc), 5000)
    await driver
      .findElement(
        By.xpath('/html/body/div/nav/div/div/div[2]/ul/li[2]/div/ul/li[3]/a'),
        5000
      )
      .click()

    let transElement = await driver.findElement(
      By.xpath('/html/body/div/main/div[2]/div/div/table/tbody/tr/td'),
      5000
    )
    let transText = await transElement.getText()
    let transExpected = 'You do not have any transactions!'

    await assert.ok(
      transText.includes(transExpected),
      'Transaction text mismatch'
    )
    console.log('No transactions!')
  } finally {
    await driver.quit()
  }
}

async function runAll () {
  await fillCheckoutForm()
  await submitOrder()
  await validateOrderConfirmation()
}
runAll()
