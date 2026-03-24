const { Builder, By } = require('selenium-webdriver')
let assert = require('assert')

async function authentication () {
  let driver = await new Builder().forBrowser('chrome').build()

  try {
    await driver.get('http:/localhost/')
    await driver.manage().window().maximize()
  } finally {
    //
  }
}
authentication()
