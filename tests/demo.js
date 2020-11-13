const { assert } = require("chai")
const { NULL } = require("node-sass")

module.exports = {
  'step one: navigate to google' :  (browser) => { //step one
    browser
      .url('http://localhost:8080/#/dashboard')
      .waitForElementVisible('.sidebar', 1000)
      .waitForElementPresent('xpath',"//body/div[1]/div[2]/div[2]/ul[1]/li[2]/a[1]/p[1]")
      .click('xpath',"//body/div[1]/div[2]/div[2]/ul[1]/li[2]/a[1]/p[1]")
      .waitForElementPresent('xpath',"//span[contains(text(),'RegularTables')]")
      .click('xpath',"//span[contains(text(),'RegularTables')]")
      .waitForElementPresent('xpath',"//body/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]", 1000)
      .waitForElementVisible('xpath',"//body/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/input[1]", 2000)
      .click('xpath',"//body/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]")
      .pause(1000)
      .waitForElementVisible('xpath',"//body/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]")
      .waitForElementPresent('xpath',"//body/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/input[1]", 1000)
      .pause(1000)
      .waitForElementVisible('xpath', "//input[@placeholder='Select Fleet']")
      .pause(1000)
      .click('xpath', "//input[@placeholder='Select Fleet']")
      .pause(1000)
      .waitForElementVisible('xpath',"//span[contains(text(),'cel')]", 2000)
      .pause(4000)
      .click('xpath',"//span[contains(text(),'cel')]")
      .pause(1000)
      .waitForElementVisible('xpath', "//input[@placeholder='Select Ship']")
      .pause(1000)
      .click('xpath', "//input[@placeholder='Select Ship']")
      .pause(1000)
      .waitForElementVisible('xpath',"//span[contains(text(),'eclipse')]", 2000)
      .pause(1000)
      .click('xpath',"//span[contains(text(),'eclipse')]")
      .pause(1000)
      .waitForElementVisible('xpath', "//input[@placeholder='Pick a Date']")
      .pause(1000)
      .click('xpath', "//input[@placeholder='Pick a Date']")
      .pause(1000)
      .waitForElementVisible('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      .pause(1000)
      .click('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      .pause(2000)
      .click('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      .pause(1000)
      .click('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      .pause(1000)
      .click('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      .pause(1000)
      .click('xpath',"//span[contains(text(),'22')]")
      .pause(1000)
      .waitForElementVisible('xpath',"//input[@placeholder='Pick another Date']")
      .pause(2000)
      .click('xpath',"//input[@placeholder='Pick another Date']")
      .pause(4000)
      .setValue('xpath',"//input[@placeholder='Pick another Date']", "2020/07/31")
      .pause(3000)
      .click('xpath',"//body/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]")
      .pause(4000)
      .waitForElementVisible('xpath', "//span[contains(text(),'Search')]")
      .pause(1000)
      .click('xpath',"//span[contains(text(),'Search')]")
      .pause(10000)

       
      
     
      // .waitForElementVisible('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      // .pause(4000)
      // .waitForElementVisible('xpath',"//button[@class=el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left]")
      // .pause(5000)
      // .waitForElementVisible('xpath',"//span[contains(text(),'November')]", 2000)
      // .pause(2000)
      // .click('xpath',"//span[contains(text(),'November')]")
      // .pause(2000)
      // .moveToElement('xpath',"//span[contains(text(),'November')]", 40, 17)
  
    
 
      // .click('xpath',"//div[@class='el-picker-panel__body']")
      // .pause(1000)
      // .click('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      // .pause(1000)
      // .click('xpath',"//button[@class='el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left']")
      // .pause(1000)
      // .click('xpath',"//span[contains(text(),'31')]")
      
    
      
      

  },

  // 'step two: click input' : function (browser) { //step two
  //   browser
  //     .click('input[name=btnK]')
  //     .pause(1000)
  //     .assert.containsText('#main', 'now-ui-icons design_bullet-list-67')
  //     .end(); //to close the browser session after all the steps
  // }
}