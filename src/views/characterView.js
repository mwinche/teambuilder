define(['underscore', 'jquery', 'src/models/character', 'text!templates/character.html'],
	function(_, $, Character, template){
	
	var compiled = _.template(template);

	return Backbone.View.extend({
		initialize:function(){
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},
		render:function(){
			this.$el.html(compiled(this.model.toJSON()));
		}
	},{
		TEMPLATE:compiled
	});
});
