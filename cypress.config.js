const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('after:run', (results) => {
        const mochawesome = require('mochawesome');
      });
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false,
    },
    
  },
});


