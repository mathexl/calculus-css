/*

Take in format like:

\operator^{upper}_{lower} content

And convert to:

<div operator>
    <div upperbound>
        upper
    </div>
    <div lowerbound>
        lower
    </div>
    <div of>
        content
    </div>
</div>
*/


// This is some very basic parsing. We should be doing smarter stuff than this,
// but it's just a proof of concept for now.

str = "\\int^{1}_{0} i dx"
operators = {
    'int': 'integral'
}

symbols = {
    'pi': '<hr pi>'
}

syntaxes = {
    integral: {
        re: /\\int\^\{(.*)\}_\{(.*)\} (.*)/,
        template: "<div integral><div upperbound>{}</div><div lowerbound>{}</div><div of>{}</div></div>"
    }
}

function interpolate(str, args) {
    var regex = /\{\}/;
    var _r=function(p,c){return p.replace(regex,c);}
    return args.reduce(_r, str);
}

compile = function(str) {
    for (var key in syntaxes) {
        var match = str.match(syntaxes[key].re);
        if (match.length > 0) {
            return interpolate(syntaxes[key].template, match.slice(1))
        }
    }
}
