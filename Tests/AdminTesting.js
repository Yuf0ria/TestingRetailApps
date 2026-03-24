const { Builder, By, until, includes } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/admin'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}
async function addProduct () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    await driver.findElement(By.id('input-username')).sendKeys('admin')
    await driver.findElement(By.id('input-password')).sendKeys('admin')

    await driver
      .findElement(
        By.xpath(
          '/html/body/div[2]/div/div/div/div/div/div[2]/form/div[3]/button'
        )
      )
      .click()

    let closeBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[3]/div/div/div/div[1]/button')
      ),
      5000
    )

    await driver.wait(until.elementIsVisible(closeBtn), 5000)
    await driver.wait(until.elementIsEnabled(closeBtn), 5000)
    await closeBtn.click()

    let catalog = await driver.findElement(
      By.xpath('/html/body/div[2]/nav/ul/li[2]/a')
    )

    await catalog.click()

    let product = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/nav/ul/li[2]/ul/li[2]/a'),
        5000
      )
    )
    await driver.wait(until.elementIsVisible(product), 5000)
    await driver.wait(until.elementIsEnabled(product), 5000)

    await product.click()

    let addBtn = driver.findElement(
      By.xpath('/html/body/div[2]/div/div[1]/div/div/a')
    )
    addBtn.click()
    let name = await driver.wait(
      until.elementLocated(By.id('input-name-1'), 5000)
    )
    let meta = await driver.wait(
      until.elementLocated(By.id('input-meta-title-1'), 5000)
    )

    await driver.wait(until.elementIsVisible(name), 5000)
    await driver.wait(until.elementIsEnabled(name), 5000)
    await driver.wait(until.elementIsVisible(meta), 5000)
    await driver.wait(until.elementIsEnabled(meta), 5000)

    await name.sendKeys('Hard Drive')
    await meta.sendKeys('hard_drive')

    let data = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[2]/div/div[2]/form/ul/li[2]/a')
      ),
      5000
    )
    await driver.wait(until.elementIsVisible(data), 5000)
    await driver.wait(until.elementIsEnabled(data), 5000)
    await data.click()

    let inputData = await driver.wait(
      until.elementLocated(By.id('input-model'), 5000)
    )
    await driver.wait(until.elementIsVisible(inputData), 5000)
    await driver.wait(until.elementIsEnabled(inputData), 5000)

    await inputData.sendKeys('hard_Drive')
    let seo = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[2]/div/div[2]/form/ul/li[10]/a')
      ),
      5000
    )
    await driver.wait(until.elementIsVisible(seo), 5000)
    await driver.wait(until.elementIsEnabled(seo), 5000)
    await seo.click()
    let keyword = await driver.wait(
      until.elementLocated(By.id('input-keyword-0-1'), 5000)
    )
    await driver.wait(until.elementIsVisible(keyword), 5000)
    await driver.wait(until.elementIsEnabled(keyword), 5000)
    await keyword.sendKeys('hardDrive')
    let saveBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[1]/div/div/button')
      ),
      5000
    )
    await driver.wait(until.elementIsVisible(saveBtn), 5000)
    await driver.wait(until.elementIsEnabled(saveBtn), 5000)

    await driver.executeScript('arguments[0].scrollIntoView();', saveBtn)
    await driver.executeScript('arguments[0].click();', saveBtn)

    let alert = await driver.wait(async () => {
      let alerts = await driver.findElements(
        By.css('.alert-success, .alert-danger')
      )
      if (alerts.length > 0) return alerts[0]
      return false
    }, 10000)

    let alertText = await alert.getText()
    console.log('Alert text:', alertText)

    await assert.ok(
      alertText.includes('Success: You have modified products!'),
      'Hard drive not found'
    )
    console.log('Hard Drive inserted!')
  } finally {
    driver.quit()
  }
}
async function editProduct () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    await driver.findElement(By.id('input-username')).sendKeys('admin')
    await driver.findElement(By.id('input-password')).sendKeys('admin')

    await driver
      .findElement(
        By.xpath(
          '/html/body/div[2]/div/div/div/div/div/div[2]/form/div[3]/button'
        )
      )
      .click()

    let closeBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[3]/div/div/div/div[1]/button')
      ),
      5000
    )

    await driver.wait(until.elementIsVisible(closeBtn), 5000)
    await driver.wait(until.elementIsEnabled(closeBtn), 5000)
    await closeBtn.click()

    let catalog = await driver.findElement(
      By.xpath('/html/body/div[2]/nav/ul/li[2]/a')
    )

    await catalog.click()

    let product = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/nav/ul/li[2]/ul/li[2]/a'),
        5000
      )
    )
    await driver.wait(until.elementIsVisible(product), 5000)
    await driver.wait(until.elementIsEnabled(product), 5000)

    await product.click()

    let hardDrive = await driver.wait(
      until.elementLocated(
        By.xpath(
          '/html/body/div[2]/div/div[2]/div/div[2]/div/div[2]/form/div[1]/table/tbody/tr[3]/td[7]/div/a'
        )
      ),
      10000
    )
    await driver.wait(until.elementIsVisible(hardDrive), 10000)
    await driver.wait(until.elementIsEnabled(hardDrive), 10000)
    await hardDrive.click()

    let productNameInput = await driver.wait(
      until.elementLocated(By.id('input-name-1')),
      10000
    )
    assert.ok(productNameInput, 'Product edit page failed to load')
    console.log('Product edit page loaded successfully!')
  } finally {
    driver.quit()
  }
}

async function deleteProduct () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)

    await driver.findElement(By.id('input-username')).sendKeys('admin')
    await driver.findElement(By.id('input-password')).sendKeys('admin')

    await driver
      .findElement(
        By.xpath(
          '/html/body/div[2]/div/div/div/div/div/div[2]/form/div[3]/button'
        )
      )
      .click()

    let closeBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[3]/div/div/div/div[1]/button')
      ),
      5000
    )

    await driver.wait(until.elementIsVisible(closeBtn), 5000)
    await driver.wait(until.elementIsEnabled(closeBtn), 5000)
    await closeBtn.click()

    let catalog = await driver.findElement(
      By.xpath('/html/body/div[2]/nav/ul/li[2]/a')
    )

    await catalog.click()

    let product = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/nav/ul/li[2]/ul/li[2]/a'),
        5000
      )
    )
    await driver.wait(until.elementIsVisible(product), 5000)
    await driver.wait(until.elementIsEnabled(product), 5000)

    await product.click()
    let delItem = await driver.wait(
      until.elementLocated(
        By.xpath(
          '/html/body/div[2]/div/div[2]/div/div[2]/div/div[2]/form/div[1]/table/tbody/tr[3]/td[1]/input'
        )
      ),
      10000
    )
    await driver.wait(until.elementIsVisible(delItem), 10000)
    await driver.wait(until.elementIsEnabled(delItem), 10000)
    await delItem.click()
    let deleteBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[2]/div/div[1]/div/div/button[3]')
      ),
      10000
    )
    await driver.wait(until.elementIsVisible(deleteBtn), 10000)
    await driver.wait(until.elementIsEnabled(deleteBtn), 10000)
    await deleteBtn.click()

    await driver.sleep(2000)

    try {
      let alert = await driver.switchTo().alert()
      console.log('Browser alert found, accepting it')
      await alert.accept()
    } catch (e) {
      console.log('No browser alert, looking for modal dialog...')

      let okBtn = await driver.wait(async () => {
        try {
          let buttons = await driver.findElements(By.css('div.modal button'))
          for (let btn of buttons) {
            let text = await btn.getText()
            let ariaLabel = await btn.getAttribute('aria-label')
            if (
              text.toLowerCase().includes('ok') ||
              ariaLabel?.toLowerCase().includes('ok') ||
              text === 'OK' ||
              ariaLabel === 'OK'
            ) {
              return btn
            }
          }
          let alertButtons = await driver.findElements(
            By.css('button[data-bs-dismiss], .btn-primary, .btn-success')
          )
          if (alertButtons.length > 0) {
            return alertButtons[0]
          }
        } catch (err) {
          console.log('Error finding button:', err.message)
        }
        return null
      }, 10000)

      if (okBtn) {
        await driver.executeScript('arguments[0].scrollIntoView(true);', okBtn)
        await driver.sleep(500)
        await driver.executeScript('arguments[0].click();', okBtn)
        console.log('Dialog button clicked')
      } else {
        throw new Error('OK button not found in confirmation dialog')
      }
    }

    await driver.sleep(2000)

    let deleteAlert = await driver.wait(async () => {
      let alerts = await driver.findElements(
        By.css('.alert-success, .alert-danger')
      )
      if (alerts.length > 0) return alerts[0]
      return false
    }, 10000)

    let alertText = await deleteAlert.getText()
    assert.ok(
      alertText.includes('Success: You have modified products!'),
      'Product deletion failed'
    )
    console.log('Product deleted successfully!')
  } finally {
    driver.quit()
  }
}
async function runAll () {
  await addProduct()
  await editProduct()
  await deleteProduct()
}
runAll()
