require(['lib/backbone-min.js', 'src/models/skill'], function(Backbone, Skill){
	return new Backbone.Collection.extend({
		model: Skill
	});
});
