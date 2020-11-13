/**
 * Pages/pathTest.js
 * 
 * Page object asyasofttech.com.
 */module.exports = {
    url: function () {
        return `http://localhost:8080/#/dashboard`;
      },  elements: {
        border_bottom: {
          selector: '.border-bottom'
        },
        logo_menu: {
          selector: '.site-navbar .container'
        },
        slider: {
          selector: '.site-blocks-cover.aos-animate'
        },
        black_content: {
          selector: '.row.align-items-stretch'
        },
        feautured_projects: {
          selector: '.container-fluid'
        },
        footer: {
          selector: '.site-footer'
        },
      },  commands: [{
        checkMainPageElements: function() {
          return this
            .assert.title('Dashboard')
            .assert.visible('@border_bottom')
            .assert.visible('@logo_menu')
            .assert.visible('@slider')
            .assert.visible('@black_content')
            .assert.visible('@feautured_projects')
            .assert.visible('@footer')
        },
      }]
    };