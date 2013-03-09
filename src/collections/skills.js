define(['backbone', 'src/models/skill'], function(Backbone, Skill){
	return Backbone.Collection.extend({
		model: Skill
	});
});
