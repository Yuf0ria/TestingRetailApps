const { Builder, By, until } = require('selenium-webdriver')
let assert = require('assert')

const BASE_URL = 'http://localhost/index.php?route=common/home&language=en-gb'

async function createDriver () {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.manage().window().maximize()
  return driver
}

async function navigateContactUs () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)
    await driver
      .findElement(
        By.xpath('/html/body/div/nav/div/div/div[2]/ul/li[1]/a/span')
      )
      .click()

    let contactElement = await driver.findElement(By.id('content'))
    let contactText = await contactElement.getText()
    let contactExpected = 'Contact Us'

    await assert.ok(contactText.includes(contactExpected), 'Text mismatch!')

    console.log('Navigate to Contact Us!')
  } finally {
    await driver.quit()
  }
}

async function formFill () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)
    await driver
      .findElement(
        By.xpath('/html/body/div/nav/div/div/div[2]/ul/li[1]/a/span')
      )
      .click()

    let name = await driver.wait(
      until.elementLocated(By.id('input-name')),
      5000
    )
    await driver.wait(until.elementIsVisible(name), 5000)
    await driver.wait(until.elementIsEnabled(name), 5000)
    name.sendKeys('John Doe')

    let email = await driver.wait(
      until.elementLocated(By.id('input-email')),
      5000
    )
    await driver.wait(until.elementIsVisible(email), 5000)
    await driver.wait(until.elementIsEnabled(email), 5000)
    email.sendKeys('johndoe@email.com')

    let inquiry = await driver.wait(
      until.elementLocated(By.id('input-enquiry')),
      5000
    )
    await driver.wait(until.elementIsVisible(inquiry), 5000)
    await driver.wait(until.elementIsEnabled(inquiry), 5000)
    inquiry.sendKeys(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur facilisis arcu, ut malesuada ex molestie eu. Integer scelerisque est ipsum, ut pulvinar nisl euismod vitae. Vivamus iaculis sem at diam pretium, ac semper felis cursus. Nunc sit amet convallis leo. Fusce nulla diam, molestie non imperdiet vel, dictum rhoncus purus. Donec egestas porta nulla eu pulvinar. In vulputate venenatis orci, at ultricies mi ultricies sit amet. In ornare vulputate odio, non interdum metus ullamcorper molestie. '
    )

    let submitBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div/main/div[2]/div/div/form/div/button')
      ),
      5000
    )
    await driver.wait(until.elementIsVisible(submitBtn), 5000)
    await driver.wait(until.elementIsEnabled(submitBtn), 5000)
    submitBtn.click()

    let subElement = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div/main/div[2]/div/div/p'),
        5000
      )
    )
    await driver.wait(until.elementIsVisible(subElement), 5000)
    await driver.wait(until.elementIsEnabled(subElement), 5000)

    let subText = await subElement.getText()
    let subExpected =
      'Your enquiry has been successfully sent to the store owner!'

    await assert.ok(subText.includes(subExpected), 'Text Mismatch!')

    console.log('Inquiry has been submitted!')
  } finally {
    await driver.quit()
  }
}

async function invalidForm () {
  let driver = await createDriver()

  try {
    await driver.get(BASE_URL)
    await driver
      .findElement(
        By.xpath('/html/body/div/nav/div/div/div[2]/ul/li[1]/a/span')
      )
      .click()

    let submitBtn = await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div/main/div[2]/div/div/form/div/button')
      ),
      5000
    )
    await driver.wait(until.elementIsVisible(submitBtn), 5000)
    await driver.wait(until.elementIsEnabled(submitBtn), 5000)
    submitBtn.click()

    let errorName = await driver.wait(
      until.elementLocated(By.id('error-name')),
      5000
    )
    await driver.wait(until.elementIsVisible(errorName), 5000)
    await driver.wait(until.elementIsEnabled(errorName), 5000)

    let nameText = await errorName.getText()
    let nameExp = 'Name must be between 3 and 32 characters!'

    assert.ok(nameText.includes(nameExp), 'Name field has text!')
    console.log('No strings in name field!')

    let errorEmail = await driver.wait(
      until.elementLocated(By.id('error-email')),
      5000
    )
    await driver.wait(until.elementIsVisible(errorEmail), 5000)
    await driver.wait(until.elementIsEnabled(errorEmail), 5000)

    let emailText = await errorEmail.getText()
    let emailExp = 'E-Mail Address does not appear to be valid!'
    console.log('No strings in email field!')

    assert.ok(emailText.includes(emailExp), 'Email field has text!')

    let errorEnquiry = await driver.wait(
      until.elementLocated(By.id('error-enquiry')),
      5000
    )

    await driver.wait(until.elementIsVisible(errorEnquiry), 5000)
    await driver.wait(until.elementIsEnabled(errorEnquiry), 5000)

    let enquiryText = await errorEnquiry.getText()
    let enquiryExp = 'Enquiry must be between 10 and 3000 characters!'

    assert.ok(enquiryText.includes(enquiryExp), 'Enquiry field has text!')
    console.log('No strings in enquiry field!')
  } finally {
    await driver.quit()
  }
}

async function runAll () {
  await navigateContactUs()
  await formFill()
  await invalidForm()
}
runAll()
