define(['backbone', 'src/models/feclass'], function(Backbone, FEClass){
	return Backbone.Collection.extend({
		model: FEClass,
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
