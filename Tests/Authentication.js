const { Builder, By } = require('selenium-webdriver')
let assert = require('assert')

async function authentication () {
  let driver = await new Builder().forBrowser('chrome').build()

  try {
    await driver.get(
      'http://localhost/index.php?route=account/login&language=en-gb'
    )
    await driver.manage().window().maximize()

    await driver.findElement(By.id('input-email')).sendKeys('johndoe@email.com')
    await driver.findElement(By.id('input-password')).sendKeys('eA07:?j6*&Kq')

    await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[2]/div/form/div[3]/button'
        )
      )
      .click()

    let element = await driver.findElement(
      By.xpath('//*[contains(text(), "My Account")]')
    )
    let actualText = await element.getText()
    let expectedText = 'My Account'

    assert.strictEqual(actualText, expectedText, 'Text Mismatch!')

    console.log('Assertion passed!')
  } finally {
    await driver.quit()
  }
}
authentication()
