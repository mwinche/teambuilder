define(['underscore', 'backbone'], function(_, Backbone){
	return Backbone.Model.extend({
		initialize:function(){
			this.set('from', []);
			this.set('to', []);
		}
	});
});
