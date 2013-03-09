define(['backbone', 'src/models/character'], function(Backbone, Character){
	return Backbone.Collection.extend({
		model: Character,
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
