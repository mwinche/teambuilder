define(['backbone', 'underscore', 'jquery', 'text!templates/characters.html', 'src/views/characterView'],
	function(Backbone, _, $, template, CharacterView){
	var compiled = _.template(template);

	return Backbone.View.extend({
		className:'characters',
		tagName:'ul',
		events:{
			'click .item':'toggleItem'
		},
		initialize:function(){
			this.listenTo(this.collection, 'all', this.render);
			this.render();
		},
		render:function(){
			this.$el.html(compiled({collection:this.collection.toJSON()}));
		},
		toggleItem:function(event){
			$(event.target).toggleClass('bg-selected-item');
			$(event.target).toggleClass('font-selected');
		}
	},{
		TEMPLATE:compiled
	});
});
