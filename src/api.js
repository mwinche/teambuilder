define(['src/collections/characters'],function(Characters){
	var feData = null,
		api = {},
		characterRules = [],
		skillRules = [],
		feClassRules = [],
		undoStack = [];
		nameMap = function(item){
			return item.get('name');
		},
		undoFunction = function(index, array){
			return array.splice(index, 1)[0];
		},
		getAllClassesForCharacter = function(character){
			var constantParent, optionalParent, characterClasses;

			constantParent = character && feData.getCharacterByName(character.get('constantParent'));
			optionalParent = character && feData.getCharacterByName(character.get('optionalParent'));

			characterClasses = character.getFEClasses(constantParent, optionalParent);
			characterClasses = _.union(characterClasses, feData.getAdvancedFEClasses(characterClasses));

			return characterClasses;
		},
		dataCheck = function(){
			if(!feData){
				throw "You must call setFEData and pass in the data to be used.";
			}
		};

	api.setFEData = function(FEData){
		feData = FEData;
	};

	api.undo = function(){
		if(!undoStack || !undoStack.length){
			return;
		}

		return (undoStack.pop())();
	};

	api.addRule = function(rule){
		dataCheck();
		var character, skill, feClass, child, parent;

		if(rule.parent){
			child = feData.getCharacterByName(rule.child);
			parent = feData.getCharacterByName(rule.parent);

			if(!child){
				console.warn(rule.child, ' could not be found');
			}

			if(!parent){
				console.warn(rule.parent, ' could not be found');
			}

			if(child && parent){
				child.setOptionalParent(parent);
			}

			undoStack.push(function(){
				child.setOptionalParent(null);
				return rule;
			});
		}
		
		if(rule.character){
			character = feData.getCharacterByName(rule.character);

			if(!character){
				console.warn(rule.character, ' could not be found');
			}
			else{
				characterRules.push(rule);
			}

			undoStack.push((function(index){
				return function(){
					return undoFunction(index, characterRules);
				};
			})(characterRules.length - 1));
		}

		if(rule.skill){
			skill = feData.skills.getByName(rule.skill);

			if(!skill){
				console.warn(rule.skill, ' could not be found');
			}
			else{
				skillRules.push(rule);
			}

			undoStack.push((function(index){
				return function(){
					return undoFunction(index, skillRules);
				};
			})(skillRules.length - 1));
		}

		if(rule.feClass){
			feClass = feData.feclasses.getByName(rule.feClass);

			if(!feClass){
				console.warn(rule.feClass, ' could not be found');
			}
			else{
				feClassRules.push(rule);
			}

			undoStack.push((function(index){
				return function(){
					return undoFunction(index, feClassRules);
				};
			})(feClassRules.length - 1));
		}
	};

	api.resetRules = function(){
		dataCheck();
		characterRules = [];
		skillRules = [];
		feClassRules = [];
		undoStack = [];

		feData.characters.children.each(function(item){item.setOptionalParent(null);});
	};

	api.getFEClasses = function(){
		var returnFEClasses = feData.feclasses.map(nameMap),
			i = characterRules.length;

		while(i--){
			returnFEClasses = _.intersection(returnFEClasses, getAllClassesForCharacter(feData.getCharacterByName(characterRules[i].character)));
		}

		return returnFEClasses;
	};

	api.getSkills = function(){
		dataCheck();

	};

	api.getCharacters = function(){
		dataCheck();
		var allCharacters = feData.characters.all,
			returnCharacters = [],
			tempFEClasses = [],
			i, character;

		i = skillRules.length;
		while(i--){
			tempFEClasses.push(
				feData.skills.getByName(skillRules[i].skill).get('feclass').get('name')
			);
		}

		i = feClassRules.length;
		while(i--){
			tempFEClasses.push(feClassRules[i].feClass);
		}

		console.log(tempFEClasses);

		i = allCharacters.length;
		while(i--){
			character = allCharacters.at(i);

			//This means all of the require classes were found on this character
			if(_.difference(tempFEClasses, getAllClassesForCharacter(character)).length === 0){
				returnCharacters.push(character);
			}
		}

		return returnCharacters.map(nameMap);
	};

	return api;
});
