import $ from 'jquery';

// import bootstrap
// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

var Bootstrap = require('bootstrap-sass');
Bootstrap.$ = $;
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');

/** Import components */
import Jumbotron from './component/jumbotron';

$(function() {
    console.log('Hammer time!');

    let jumbo = new Jumbotron();
    $('body').append(jumbo.render());

});