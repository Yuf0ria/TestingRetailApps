const { Builder, By } = require('selenium-webdriver')
let assert = require('assert')

async function cartTesting () {
  let driver = await new Builder().forBrowser('chrome').build()

  try {
    await driver.get('http:/localhost/')
    await driver.manage().window().maximize()
  } finally {
    //
  }
}
