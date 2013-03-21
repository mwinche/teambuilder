define(['backbone', 'underscore', 'jquery', 'text!templates/namedItems.html'],
	function(Backbone, _, $, template){
	var compiled = _.template(template);

	return Backbone.View.extend({
		className:'items',
		tagName:'ul',
		events:{
			'click .item':'clickItem'
		},
		initialize:function(){
			this.listenTo(this.collection, 'all', this.render);
			this.render();
			this.$el.addClass('scroll-vertical');
		},
		render:function(){
			this.$el.html(compiled({collection:this.collection.toJSON()}));
		},
		clickItem:function(event){
			$(event.target).toggleClass('bg-selected-item');
			$(event.target).toggleClass('font-selected');
			this.trigger('itemClicked', event.target);
		}
	},{
		TEMPLATE:compiled
	});
});
