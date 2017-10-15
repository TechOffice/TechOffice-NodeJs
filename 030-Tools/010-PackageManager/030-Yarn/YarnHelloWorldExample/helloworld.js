import { JSDOM } from 'jsdom';
import jQuery from 'jQuery'

var document = new JSDOM(`<!DOCTYPE html><html><body><p>Hello world</p></body></html>`);
var window = document.window;
var $ = jQuery(window);
console.log($("p").html());