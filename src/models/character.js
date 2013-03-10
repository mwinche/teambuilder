define(['underscore', 'backbone'], function(_, Backbone){
	var CharacterModel = Backbone.Model.extend({
		initialize:function(){
			this.set('feClasses', new Backbone.Collection());
		},

		addFEClass:function(feClass){
			this.get('feClasses').add(feClass);
		},

		getFEClasses:function(parent1, parent2){
			return _.union(
				this.get('feClasses').map(function(item){return item.get('name');}),
				parent1 ? parent1.getInheritedFEClasses(this) : [],
				parent2 ? parent2.getInheritedFEClasses(this) : []);
		},

		setOptionalParent:function(parent){
			if(!parent){
				this.unset('optionalParent');
			}
			else if(_.contains(this.get('parentOptions'), parent.get('name'))){
				this.set('optionalParent', parent.get('name'));
			}
			//Special case for Morgan/Avatar
			else if(_.contains(this.get('parentOptions'), '*')){
				if(parent.get('gender') === this.get('gender')){
					this.set('optionalParent', parent.get('name'));
				}
			}
		},

		getInheritedFEClasses:function(child){
			return this.getFEClasses();
		}
	});

	return CharacterModel;
});
