//noinspection BadExpressionStatementJS
({
    baseUrl: "js",
    mainConfigFile: "js/app.js",
    name: 'almond',
    include: ['main'],
    insertRequire: ['main'],
    out: 'js/main.min.js',
    wrap: true,
    fileExclusionRegExp: /^(r|build)\.js$/
})