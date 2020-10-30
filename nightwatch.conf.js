const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        host:"localhost",
        server_path: geckodriver.path,
        cli_args: [
          "--log", "debug"
        ],
        port: 4444
      },
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          "args": [
            "headless",
            "no-sandbox",
            "disable-gpu",
            "--no-sandbox"
          ]
        }
      }
    },
    // chrome: {
    //   webdriver: {
    //     server_path: chromedriver.path
    //   },
    //   desiredCapabilities: {
    //     browserName: 'chrome',
    //     javascriptEnabled: true,
    //     acceptSslCerts: true,
    //     chromeOptions: {
    //       args: ['disable-gpu']
    //     }
    //   }
    // },
    firefox: {
      webdriver: {
        server_path: geckodriver.path
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    }
   }
};