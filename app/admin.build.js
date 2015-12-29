//noinspection BadExpressionStatementJS
({
    baseUrl: "js",
    mainConfigFile: "js/admin.app.js",
    name: 'almond',
    include: ['admin.main'],
    insertRequire: ['admin.main'],
    out: 'js/admin.app.min.js',
	paths: {
		googleapi: "empty:"
	},
    wrap: true,
    preserveLicenseComments: false,
	optimize: "none",
    fileExclusionRegExp: /^(r|build)\.js$/
})