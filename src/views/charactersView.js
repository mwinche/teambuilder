define(['backbone', 'underscore', 'text!templates/characters.html', 'src/views/characterView'],
	function(Backbone, _, template, CharacterView){
	//var compiled = _.template(template);

	return Backbone.View.extend({
		className:'characters',
		initialize:function(){
			this.listenTo(this.collection, 'all', this.render);
			this.render();
		},
		render:function(){
			this.$el.html('');

			for(var i = 0, l = this.collection.length; i < l; i++){
				var view = new CharacterView({model:this.collection.at(i)});
				this.$el.append(view.el);
			}
		},
	},{
		//TEMPLATE:compiled
	});
});
