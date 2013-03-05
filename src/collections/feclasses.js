require(['lib/backbone-min.js', 'src/models/feclass'], function(Backbone, FEClass){
	return new Backbone.Collection.extend({
		model: FEClass
	});
});
