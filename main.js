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

require(['bootstrap/fe-data', 'src/views/characterView', 'src/views/charactersView', 'src/views/itemsView', 'jquery'],
	function(feData, CharacterView, CharactersView, ItemsView, $){
	var collViews = {
			initial : new CharactersView({collection:feData.characters.initial}),
			children : new CharactersView({collection:feData.characters.children}),
			dlc : new CharactersView({collection:feData.characters.dlc}),
			feClasses : new ItemsView({collection:feData.feclasses}),
			skills : new ItemsView({collection:feData.skills})
		};

	$('#initial').append(collViews.initial.el);
	$('#children').append(collViews.children.el);
	$('#dlc').append(collViews.dlc.el);
	$('#feClasses').append(collViews.feClasses.el);
	$('#skills').append(collViews.skills.el);

	return feData;
});
