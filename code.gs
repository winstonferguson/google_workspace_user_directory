/**
 * this file executes the doGet function for our web app
 * see https://developers.google.com/apps-script/guides/web
 * and provides some utility functions to help organize things
 */

function doGet() {
  const htmlTemplate = HtmlService.createTemplateFromFile('index');

  return htmlTemplate.evaluate();
}

/**
 * function to include external files in html
 */

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * function to render external files in html
 */

function render(filename, attributes = {}) {
  let template =  HtmlService.createTemplateFromFile(filename);

  for (const k of Object.keys(attributes)) {
    template[k] = attributes[k]
  }

  return template.evaluate().getContent();   
}
