//noinspection BadExpressionStatementJS
({
    baseUrl: "../",
    mainConfigFile: "require.js",
    name: 'build/scripts/almond',
    include: ['index'],
    insertRequire: ['index'],
    out: '../index.min.js',
    wrap: true,
	optimize: "none",
    preserveLicenseComments: false,
    fileExclusionRegExp: /^(r|build)\.js$/
})