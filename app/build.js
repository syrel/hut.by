//noinspection BadExpressionStatementJS
({
    baseUrl: "js",
    mainConfigFile: "js/app.js",
    name: 'almond',
    include: ['main'],
    insertRequire: ['main'],
    out: 'js/app.min.js',
    wrap: true,
    preserveLicenseComments: false,
    fileExclusionRegExp: /^(r|build)\.js$/
})