const { Builder, By, until } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/index.php?route=common/home&language=en-gb'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}
async function addToCart () {
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
    await driver.findElement(By.id('button-cart'), 5000).click()

    let alert = await driver.wait(until.elementLocated(By.css('.alert')), 5000)
    let addText = await alert.getText()
    let addExpected = 'Success: You have added MacBook to your shopping cart!'

    assert.strictEqual(addText, addExpected, 'Added item to cart!')
    console.log('Added item to cart!')
  } finally {
    await driver.quit()
  }
}

async function updateQuantity () {
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
      } catch (e) {}
      return false
    }, 5000)

    let cartText = await driver
      .findElement(By.xpath('/html/body/div/header/div/div/div[3]/div/button'))
      .getText()
    console.log('Cart Text:', cartText)

    assert.ok(cartText.includes('2 item(s)'), 'Cart did not update')
    console.log('2 items in cart!')
  } finally {
    await driver.quit()
  }
}

async function removeItem () {
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
    await driver.findElement(By.id('button-cart')).click()

    await driver.wait(async () => {
      let text = await driver
        .findElement(
          By.xpath('/html/body/div/header/div/div/div[3]/div/button')
        )
        .getText()
      return text.includes('1 item(s)')
    }, 5000)

    await driver
      .findElement(By.xpath('/html/body/div/header/div/div/div[3]/div/button'))
      .click()

    let remove = await driver.findElement(
      By.xpath(
        '/html/body/div/header/div/div/div[3]/div/ul/li/table/tbody/tr/td[5]/form/button'
      )
    )
    remove.click()

    await driver.wait(async () => {
      let text = await driver
        .findElement(
          By.xpath('/html/body/div/header/div/div/div[3]/div/button')
        )
        .getText()
      return text.includes('0 item(s)')
    }, 5000)

    let removeAlert = await driver.wait(
      until.elementLocated(By.css('.alert')),
      5000
    )
    let removeText = await removeAlert.getText()
    let removeExpected =
      'Success: You have removed an item from your shopping cart!'
    assert.strictEqual(removeText, removeExpected, 'Item not removed!')
    console.log('Removed item from cart!')
  } finally {
    await driver.quit()
  }
}

async function validateTotalPrice () {
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
        By.xpath('/html/body/div/header/div/div/div[3]/div/ul/li/div/p/a[1]'),
        5000
      )
      .click()
    let subTotal = await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[1]/table/tfoot/tr[1]/td[2]'
        ),
        5000
      )
      .getText()
    let ecoTax = await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[1]/table/tfoot/tr[2]/td[2]'
        ),
        5000
      )
      .getText()
    let vat = await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[1]/table/tfoot/tr[3]/td[2]'
        ),
        5000
      )
      .getText()

    let sum =
      parseInt(subTotal.replace(/[$,]/g, '')) +
      parseInt(ecoTax.replace(/[$,]/g, '')) +
      parseInt(vat.replace(/[$,]/g, ''))
    console.log('Sum: ', sum)

    let total = await driver.findElement(
      By.xpath(
        '/html/body/div/main/div[2]/div/div/div/div[1]/table/tfoot/tr[4]/td[2]'
      )
    )
    let sumText = await total.getText()
    await assert.strictEqual(sumText, '$1,204.00', 'Item not validated!')
    console.log('Validated Total Price!')
  } finally {
    await driver.quit()
  }
}

async function runAll () {
  await addToCart()
  await updateQuantity()
  await removeItem()
  await validateTotalPrice()
}
runAll()
