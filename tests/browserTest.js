module.exports = {
    'Demo test dashboard' : function(browser) {
      browser
        .url('http://localhost:8080/#/dashboard')
        .waitForElementVisible('.navbar-brand')
        .waitForElementVisible('.sidebar')
        .waitForElementVisible('.now-ui-icons design_bullet-list-67')
        .useXpath()
        .click("//*[contains(text(), 'el-select-dropdown el-popper)]'")
        // .assert.containsText('nav-link router-link-exact-active active', '/dashboard')
        .end();
        // .assert.visible('input[type=search]')
        // .setValue('input[type=search]', 'nightwatch')
        // .assert.visible('button[type=submit]')
        // .click('button[type=submit]')
        // .assert.containsText('.mainline-results', 'Nightwatch.js')
        // .end();
    }
  };