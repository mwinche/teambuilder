require.config({
	paths:{
		'underscore':'lib/underscore-min',
		'backbone':'lib/backbone-min',
		'jquery':'lib/jquery-1.9.1.min'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", 'jquery'],
			exports: "Backbone"
		}
	}
});

require(['bootstrap/fe-data'], function(FEData){
	debugger;
;	return FEData;
});
