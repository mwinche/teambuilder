({
	paths:{
		'underscore':'lib/underscore-min',
		'backbone':'lib/backbone',
		'jquery':'lib/jquery-1.9.1.min',
		'text':'lib/text'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", 'jquery'],
			exports: "Backbone"
		}
	},
    name: "main",
    out: "main-built.js",
    baseUrl: "."
})
