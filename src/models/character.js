require(['lib/underscore-min.js', 'lib/backbone-min'], function(_, Backbone){
	var CharacterModel = Backbone.Model.extend({
		initialize:function(){
			this.set('feClasses', new Backbone.Collection());
		},

		addFEClass:function(feClass){
			this.get('feClasses').add(feClass);
		}
	});

	return CharacterModel;
});
