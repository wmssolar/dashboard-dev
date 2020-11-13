let subMenuArr = [];

module.exports = {
  tags: ['general'],  before: (browser) => console.log('Test is starting...'),  after: (browser) => console.log('Test is finished...'),  'Test Case-1: Go to Dashboard, check elements and take screenshots': (client) => {
    const page = client.page.pathTest();
    page.navigate()
      .checkMainPageElements()
      .saveScreenshot('tests/screenshots/dashboard/' + 'main-page.png')
      .end();
  },  'Test Case-2: Check paths for dashboard': (client) => {
    client
      .url('http://localhost:8080/#/dashboard')
      .waitForElementVisible('body');    client.expect.element('.site-navigation').to.be.visible;    client.elements('css selector', '.site-navigation ul li a', function (elements) {
      elements.value.forEach(function(element, i){
        client.elementIdAttribute(Object.values(element)[0], 'href', function(attribute) {
          const subMenu = attribute.value;
          subMenuArr.push(subMenu);
        });
      });Login
    });
  },  'Test Case-3: Go to paths for dashboard and check body': (client) => {
    subMenuArr.map((menuItem) => {
      client
        .url(menuItem)
        .assert.visible('body')
    })
  },
};




















// module.exports = {
//     'Demo test dashboard' : function(browser) {
//       browser
//         .url('http://localhost:8080/#/dashboard')
//         .waitForElementVisible('.navbar-brand')
//         .waitForElementVisible('.sidebar')
//         .end();
//         // .waitForElementVisible('.now-ui-icons design_bullet-list-67')
//         // .useXpath()
//         // .click("//*[contains(text(), 'now-ui-icons design_bullet-list-67)]'")
//         // .assert.containsText('nav-link router-link-exact-active active', '/dashboard')
//         // .assert.visible('input[type=search]')
//         // .setValue('input[type=search]', 'nightwatch')
//         // .assert.visible('button[type=submit]')
//         // .click('button[type=submit]')
//         // .assert.containsText('.mainline-results', 'Nightwatch.js')
//         // .end();
//         browser.elements('css selector', 'div', function(elements) {
//           elements.value.forEach(function(element){
//             browser.elementIdAttribute(element.ELEMENT, 'class', function(attribute) {
//               console.log(attribute.value);
//             });
//           });
//         });
//     }
//   };