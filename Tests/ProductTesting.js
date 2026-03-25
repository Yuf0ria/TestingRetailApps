const { Builder, By, until } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/index.php?route=common/home&language=en-gb'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}
async function viewProductList () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    let featuredElement = await driver.findElement(
      By.css('#content > h3:nth-child(3)')
    )
    let featureText = await featuredElement.getText()

    assert.strictEqual(featureText, 'Featured', 'Items list')
    console.log('Product List are shown')
  } finally {
    await driver.quit()
  }
}
async function viewProductDetails () {
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

    let itemElement = await driver.findElement(
      By.css('div.col-sm:nth-child(2) > h1:nth-child(1)')
    )
    let itemText = await itemElement.getText()

    assert.strictEqual(itemText, 'MacBook', 'Display Macbook')
    console.log('Macbook has been displayed')
  } finally {
    await driver.quit()
  }
}

async function searchProduct () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    await driver.findElement(By.css('.form-control')).sendKeys('iPhone')
    await driver.findElement(By.css('button.btn:nth-child(2)'), 3000).click()

    await driver.wait(until.urlContains('search'), 5000)
    let searchElement = await driver.findElement(
      By.xpath('/html/body/div/main/div[2]/div/div/h1'),
      10000
    )
    let searchText = await searchElement.getText()

    assert.strictEqual(searchText, 'Search - iPhone', 'iPhone searched')
    console.log('Searched iPhone')
  } finally {
    await driver.quit()
  }
}

async function runAll () {
  await viewProductList()
  await viewProductDetails()
  await searchProduct()
}

runAll()
