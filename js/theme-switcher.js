/**
 * Theme Switcher: switch between different CSS with attribute "data-theme"
 *
 * Dependencies:
 * + jQuery
 *
 * Usage Example:
 * <head>
 *   <link rel="stylesheet" href="css/Theme1.css" data-theme="Theme1" disabled />
 *   <link rel="stylesheet" href="css/Theme2.css" data-theme="Theme2" disabled />
 *   <!-- active/default theme -->
 *   <link rel="stylesheet" href="css/default.css" data-theme="Default" />
 * </head>
 * <body>
 *   <div id="theme-selector">
 *     <span class="label">Themes:</span>
 *     <a data-theme="Default" href="javascript:void(0)" class="active">Default</a>
 *     <a data-theme="Theme1" href="javascript:void(0)">Theme1</a>
 *     <a data-theme="Theme2" href="javascript:void(0)">Theme2</a>
 *   </div>
 * </body>
 *
 * NOTE:
 *   The Firefox browser do NOT support the "disabled" attribute since
 *   it is NOT standard. [2]
 *
 * References:
 * [1] selectize.js
 *     https://selectize.github.io/selectize.js/js/main.js
 * [2] MDN - HTML - <link>
 *     https://developer.mozilla.org/en/docs/Web/HTML/Element/link
 *
 * Aaron LI <aaronly.me@outlook.com>
 * Created: 2016-09-06
 * Updated: 2016-09-07
 */

$(document).ready(function () {
    // Create the "#theme-selector" for the switcher below
    var theme_selector = $('<ul/>').attr('id', 'theme-selector');
    $('link[data-theme]').each(function () {
        var theme = $(this).attr('data-theme');
        var item = $('<li/>').appendTo(theme_selector);
        var alink = $('<a/>')
            .text(theme)
            .attr('data-theme', theme)
            .attr('href', 'javascript:void(0)')
            .appendTo(item);
    });
    $('body').append(theme_selector);

    // Theme Switcher
    var $theme_links = $('#theme-selector a');
    $theme_links.on('click', function () {
        var theme = $(this).attr('data-theme');
        $theme_links.removeClass('active');
        $(this).addClass('active');
        $('link[data-theme]').prop('disabled', true);
        $('link[data-theme="' + theme + '"]').prop('disabled', false);
    });
});
