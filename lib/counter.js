/* jshint eqnull:true */
var fs = require('fs');

// Thanks jshint! :)
/**
 * Removes JavaScript comments from a string by replacing
 * everything between block comments and everything after
 * single-line comments in a non-greedy way.
 *
 * English version of the regex:
 *   match '/*'
 *   then match zero or more instances of any character (incl. \n)
 *   except for instances of '* /' (without a space, obv.)
 *   then match '* /' (again, without a space)
 *
 * @param {string} str a string with potential JavaScript comments.
 * @returns {string} a string without JavaScript comments.
 */
function removeComments(str) {
    str = str || "";

    str = str.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\//g, "");
    str = str.replace(/\/\/[^\n\r]*/g, ""); // Everything after '//'

    return str;
}

var exports = {
    count: function (file) {
        var tmp,
            input = fs.readFileSync(file).toString()
                // remove new lines
                .replace(/\n/gim, "")
                // normalize whitespace
                .replace(/\s{2,}/gim, " ")
            ;

        input = removeComments(input)
            // remove media queries, preserving their content
            .replace(/(@media[^{]+\{)(.+?)(\}\s*\})/gim, "$2}")
            // remove the contents of the selectors
            .replace(/\{([^{]+)\}/gim, "{}")

            // pretty printing for debugging
            // .replace(/\{\}/gim, "{}\n")
            // .replace(/,/gim, ",\n")
            // .replace(/\n{2,}/gim, "\n")
            ;

        return input.match(/\{/gim).length +
            ((tmp = input.match(/,/gim)) == null ? 0 : tmp.length) -
            ((tmp = input.match(/::-(webkit|moz|o)[^,{]*?/gim)) == null ? 0 : tmp.length);
    }
};

module.exports = exports;
