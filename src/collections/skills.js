define(['backbone', 'src/models/skill'], function(Backbone, Skill){
	return Backbone.Collection.extend({
		model: Skill,
		getByName:function(name){
			var i = this.length;

			while(i--){
				if(this.at(i).get('name') === name){
					return this.at(i);
				}
			}

			return null;
		}
	});
});
