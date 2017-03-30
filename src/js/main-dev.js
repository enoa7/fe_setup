import $ from 'jquery';

// import bootstrap
// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

var Bootstrap = require('bootstrap-sass');
Bootstrap.$ = $;
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');

/** Import components */
import Navigation from './component/navigation';

$(function() {
    console.log('Hammer time!');

    new Navigation();
});