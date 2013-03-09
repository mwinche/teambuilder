define(['backbone', 'src/models/feclass'], function(Backbone, FEClass){
	return Backbone.Collection.extend({
		model: FEClass
	});
});
