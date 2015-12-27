//noinspection BadExpressionStatementJS
({
    baseUrl: "js",
    mainConfigFile: "js/index.app.js",
    name: 'almond',
    include: ['index.main'],
    insertRequire: ['index.main'],
    out: 'js/index.app.min.js',
    wrap: true,
    preserveLicenseComments: false,
    fileExclusionRegExp: /^(r|build)\.js$/
})