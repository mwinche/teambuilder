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

	var children = new Characters(),
		initial = new Characters(),
		dlc = new Characters(),
		feData = {
		characters:{
			children:children,
			initial:initial,
			dlc:dlc
		},
		feclasses:{},
		skills:{}
	};

	initial.add(new Character({name:'Chrom',		gender:'M'}));
	initial.add(new Character({name:'Avatar (M)',	gender:'M'}));
	initial.add(new Character({name:'Avatar (F)',	gender:'F'}));
	initial.add(new Character({name:'Lissa',		gender:'F'}));
	initial.add(new Character({name:'Frederick',	gender:'M'}));
	initial.add(new Character({name:'Sully',		gender:'F'}));
	initial.add(new Character({name:'Virion',		gender:'M'}));
	initial.add(new Character({name:'Stahl',		gender:'M'}));
	initial.add(new Character({name:'Vaike',		gender:'M'}));
	initial.add(new Character({name:'Miriel',		gender:'F'}));
	initial.add(new Character({name:'Sumia',		gender:'F'}));
	initial.add(new Character({name:'Kellam',		gender:'M'}));
	initial.add(new Character({name:'Donnel',		gender:'M'}));
	initial.add(new Character({name:"Lon'qu",		gender:'M'}));
	initial.add(new Character({name:'Ricken',		gender:'M'}));
	initial.add(new Character({name:'Maribelle',	gender:'F'}));
	initial.add(new Character({name:'Gaius',		gender:'M'}));
	initial.add(new Character({name:'Panne',		gender:'F'}));
	initial.add(new Character({name:'Cordelia',		gender:'F'}));
	initial.add(new Character({name:'Gregor',		gender:'M'}));
	initial.add(new Character({name:'Nowi',			gender:'F'}));
	initial.add(new Character({name:'Libra',		gender:'M'}));
	initial.add(new Character({name:'Tharja',		gender:'F'}));
	initial.add(new Character({name:'Anna',			gender:'F'}));
	initial.add(new Character({name:'Olivia',		gender:'F'}));
	initial.add(new Character({name:'Cherche',		gender:'F'}));
	initial.add(new Character({name:'Henry',		gender:'M'}));
	initial.add(new Character({name:"Say'ri",		gender:'F'}));
	initial.add(new Character({name:'Tiki',			gender:'F'}));
	initial.add(new Character({name:'Basilio',		gender:'M'}));
	initial.add(new Character({name:'Flavia',		gender:'F'}));
	initial.add(new Character({name:'Priam',		gender:'M'}));

	children.add(new Character({name:'Lucina',		gender:'F',	constantParent:'Chrom'}));
	children.add(new Character({name:'Owain',		gender:'M',	constantParent:'Lissa'}));
	children.add(new Character({name:'Inigo',		gender:'M',	constantParent:'Olivia'}));
	children.add(new Character({name:'Brady',		gender:'M',	constantParent:'Maribelle'}));
	children.add(new Character({name:'Kjelle',		gender:'F',	constantParent:'Sully'}));
	children.add(new Character({name:'Cynthia',		gender:'F',	constantParent:'Sumia'}));
	children.add(new Character({name:'Severa',		gender:'F',	constantParent:'Cordelia'}));
	children.add(new Character({name:'Gerome',		gender:'M',	constantParent:'Cherche'}));
	children.add(new Character({name:'Morgan (F)',	gender:'F',	constantParent:'Avatar (M)'}));
	children.add(new Character({name:'Morgan (M)',	gender:'M',	constantParent:'Avatar (F)'}));
	children.add(new Character({name:'Yarne',		gender:'M',	constantParent:'Panne'}));
	children.add(new Character({name:'Laurent',		gender:'M',	constantParent:'Miriel'}));
	children.add(new Character({name:'Noire',		gender:'F',	constantParent:'Tharja'}));
	children.add(new Character({name:'Nah',			gender:'F',	constantParent:'Nowi'}));

	dlc.add(new Character({name:'Prince Marth'}));
	dlc.add(new Character({name:'Roy'}));
	dlc.add(new Character({name:'Leif'}));
	dlc.add(new Character({name:'Micaiah'}));
	dlc.add(new Character({name:'Alm'}));
	dlc.add(new Character({name:'Elincia'}));
	dlc.add(new Character({name:'Ephraim'}));
	dlc.add(new Character({name:'Seliph'}));
	dlc.add(new Character({name:'Eirika'}));
	dlc.add(new Character({name:'Celica'}));
	dlc.add(new Character({name:'Lyn'}));
	dlc.add(new Character({name:'Ike'}));
	dlc.add(new Character({name:'Eldigan'}));
	dlc.add(new Character({name:'Est'}));
	dlc.add(new Character({name:'Catria'}));
	dlc.add(new Character({name:'Palla'}));
	dlc.add(new Character({name:'Katarina'}));

	children.getByName('Lucina').set('parentOptions', ['Sully', 'Sumia', 'Maribelle', 'Olivia', 'Avatar (F)']);
	children.getByName('Owain').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Inigo').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Brady').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Kjelle').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Cynthia').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Severa').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Gerome').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Yarne').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Laurent').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Noire').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Nah').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregorr', 'Libra', 'Henry', 'Avatar (M)']);

	children.getByName('Morgan (F)').set('parentOptions', ['*']);
	children.getByName('Morgan (M)').set('parentOptions', ['*']);

	return feData;
});
