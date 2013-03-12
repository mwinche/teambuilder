define(['underscore', 'backbone', 'src/collections/characters'], function(_, Backbone, Characters){
	return Backbone.Model.extend({
		initialize:function(){
			this.set('from', []);
			this.set('to', []);
			this.set('characters', new Characters());
		},

		addCharacter:function(character){
			this.get('characters').add(character);
		}
	});
});
