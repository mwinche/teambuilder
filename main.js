require.config({
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
	}
});

require(['bootstrap/fe-data', 'src/views/characterView', 'src/views/charactersView'],
	function(feData, CharacterView, CharactersView){
	var collView = new CharactersView({collection:feData.characters.initial});

	$('#characters').append(collView.el);

	return feData;
});
