const { Builder, By } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/index.php?route=common/home&language=en-gb'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}
async function productTesting () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)
  } finally {
    //
  }
}

productTesting()
