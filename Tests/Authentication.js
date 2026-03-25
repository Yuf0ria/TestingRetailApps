const { Builder, By, until } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/index.php?route=account/login&language=en-gb'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}
async function validLogin () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

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

async function invalidLogin () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    await driver
      .findElement(By.id('input-email'))
      .sendKeys('wrongemail@email.com')
    await driver.findElement(By.id('input-password')).sendKeys('wrongpassword')

    await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[2]/div/form/div[3]/button'
        )
      )
      .click()
    await driver.wait(
      until.elementLocated(By.css('#alert .alert-danger')),
      5000
    )
    let errorElement = await driver.findElement(By.css('#alert .alert-danger'))
    let actualText = await errorElement.getText()
    assert.ok(
      /Warning: No match for E-Mail Address and\/or Password/i.test(actualText)
    )

    console.log('Assertion passed!')
  } finally {
    await driver.quit()
  }
}

async function emptyFieldsLogin () {
  let driver = await createDriver()
  try {
    await driver.get(BASE_URL)

    await driver
      .findElement(
        By.xpath(
          '/html/body/div/main/div[2]/div/div/div/div[2]/div/form/div[3]/button'
        )
      )
      .click()

    await driver.wait(
      until.elementLocated(By.css('#alert .alert-danger')),
      5000
    )
    let errorElement = await driver.findElement(By.css('#alert .alert-danger'))
    let actualText = await errorElement.getText()
    assert.ok(
      actualText.includes(
        'Warning: No match for E-Mail Address and/or Password.'
      )
    )
    console.log('Assertion passed!')
  } finally {
    await driver.quit()
  }
}

async function logout () {
  let driver = await createDriver()
  try {
    await driver.get(BASE_URL)

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
    console.log('Logged in!')

    const logoutLink = await driver.wait(
      until.elementLocated(
        By.css("a.list-group-item[href*='route=account/logout']")
      ),
      5000
    )
    await logoutLink.click()

    let logoutElement = await driver.findElement(
      By.css('#content > h1:nth-child(1)')
    )

    let logoutText = await logoutElement.getText()
    assert.strictEqual(logoutText, 'Account Logout', 'Logout failed!')
    console.log('Logout passed!')
  } finally {
    await driver.quit()
  }
}

async function runAll () {
  await validLogin()
  await invalidLogin()
  await emptyFieldsLogin()
  await logout()
}
runAll()
