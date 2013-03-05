require(['lib/backbone-min.js', 'src/models/character'], function(Backbone, Character){
	return new Backbone.Collection.extend({
		model: Character
	});
});
