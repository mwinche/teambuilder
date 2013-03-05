require(
	[
		'src/collections/characters',
		'src/models/character',
		'src/collections/feclasses',
		'src/models/feclass',
		'src/collections/skills',
		'src/models/skill'
	],

	function(
			Characters,
			Character,
			FEClasses,
			FEClass,
			Skills,
			Skill
		){
	var feData = {
		characters:{},
		feclasses:{},
		skills:{}
	};

	feData.characters.initial = new Characters();

	return feData;
});
