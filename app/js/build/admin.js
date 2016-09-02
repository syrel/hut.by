//noinspection BadExpressionStatementJS
({
    baseUrl: "../",
    mainConfigFile: "require.js",
    name: 'build/scripts/almond',
    include: ['admin'],
    insertRequire: ['admin'],
    out: '../admin.min.js',
    wrap: true,
	optimize: "none",
    preserveLicenseComments: false,
    fileExclusionRegExp: /^(r|build)\.js$/
})