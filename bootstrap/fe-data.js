define(
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
		potentialChildren = new Characters(),
		feData = {
			characters:{
				children:children,
				initial:initial,
				dlc:dlc,
				potentialChildren:potentialChildren
			},
			feclasses: new FEClasses(),
			skills: new Skills()
		},
		addPromotion = function(from, to){
			var toArray = feData.feclasses.getByName(from).get('to'),
				fromArray = feData.feclasses.getByName(to).get('from');

			fromArray.push(from);
			toArray.push(to);
		},
		setSkills = function(feClassName, skillNames){
			var i = skillNames.length,
				feClass = feData.feclasses.getByName(feClassName),
				skills = [];

			while(i--){
				var skill = feData.skills.getByName(skillNames[i]);
				skill.set('feclass', feClass);
				skills.push(skill);
			}

			feClass.set('skills', skills);
		},
		getCharacterByName = function(name){
			var character = feData.characters.initial.getByName(name);

			if(!character){
				character = feData.characters.children.getByName(name);
			}

			if(!character){
				character = feData.characters.dlc.getByName(name);
			}

			return character;
		},
		setFEClasses = function(characterName, feClasses){
			var character = getCharacterByName(characterName),
				i = feClasses.length;

			while(i--){
				var feClass = feData.feclasses.getByName(feClasses[i]);
				character.addFEClass(feClass);
				feClass.addCharacter(character);
			}
		},
		overrideInheritedClasses = function(characterName, removeArray, addArray){
			var character = initial.getByName(characterName);

			character.getInheritedFEClasses = function(child){
				var returnArray = this.getFEClasses();

				if(child.get('gender') !== this.get('gender')){
					return _.union(_.difference(returnArray, removeArray), addArray);
				}

				return returnArray;
			}.bind(character);
		};


	//Characters
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
	initial.add(new Character({name:'Gangrel',		gender:'M'}));
	initial.add(new Character({name:'Walhart',		gender:'M'}));
	initial.add(new Character({name:'Emmeryn',		gender:'F'}));
	initial.add(new Character({name:"Yen'fay",		gender:'M'}));
	initial.add(new Character({name:'Aversa',		gender:'F'}));

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

	potentialChildren.add(new Character({name:'Daughter of Vaike',	gender:'F',	optionalParent:'Vaike'}));
	potentialChildren.add(new Character({name:'Daughter of Gaius',	gender:'F',	optionalParent:'Gaius'}));
	potentialChildren.add(new Character({name:'Daughter of Donnel',	gender:'F',	optionalParent:'Donnel'}));
	potentialChildren.add(new Character({name:'Daughter of Gregor',	gender:'F',	optionalParent:'Gregor'}));
	potentialChildren.add(new Character({name:'Daughter of Henry',	gender:'F',	optionalParent:'Henry'}));
	potentialChildren.add(new Character({name:'Son of Lissa',		gender:'M',	optionalParent:'Lissa'}));
	potentialChildren.add(new Character({name:'Son of Miriel',		gender:'M',	optionalParent:'Miriel'}));
	potentialChildren.add(new Character({name:'Son of Maribelle',	gender:'M',	optionalParent:'Maribelle'}));
	potentialChildren.add(new Character({name:'Son of Olivia',		gender:'M',	optionalParent:'Olivia'}));
	potentialChildren.add(new Character({name:'Son of Panne',		gender:'M',	optionalParent:'Panne'}));
	potentialChildren.add(new Character({name:'Son of Cherche',		gender:'M',	optionalParent:'Cherche'}));

	children.getByName('Lucina').set('parentOptions', ['Sully', 'Sumia', 'Maribelle', 'Olivia', 'Avatar (F)']);
	children.getByName('Owain').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Inigo').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Brady').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Kjelle').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Cynthia').set('parentOptions', ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Severa').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Gerome').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Yarne').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Laurent').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Noire').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);
	children.getByName('Nah').set('parentOptions', ['Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Donnel', 'Gregor', 'Libra', 'Henry', 'Avatar (M)']);

	children.getByName('Morgan (F)').set('parentOptions', ['*']);
	children.getByName('Morgan (M)').set('parentOptions', ['*']);


	//Classes
	feData.feclasses.add(new FEClass({name:"Lord"}));
	feData.feclasses.add(new FEClass({name:"Tactician"}));
	feData.feclasses.add(new FEClass({name:"Cavalier"}));
	feData.feclasses.add(new FEClass({name:"Knight"}));
	feData.feclasses.add(new FEClass({name:"Myrmidon"}));
	feData.feclasses.add(new FEClass({name:"Thief"}));
	feData.feclasses.add(new FEClass({name:"Barbarian"}));
	feData.feclasses.add(new FEClass({name:"Fighter"}));
	feData.feclasses.add(new FEClass({name:"Mercenary"}));
	feData.feclasses.add(new FEClass({name:"Archer"}));
	feData.feclasses.add(new FEClass({name:"Pegasus Knight"}));
	feData.feclasses.add(new FEClass({name:"Wyvern Rider"}));
	feData.feclasses.add(new FEClass({name:"Dark Mage"}));
	feData.feclasses.add(new FEClass({name:"Mage"}));
	feData.feclasses.add(new FEClass({name:"Priest"}));
	feData.feclasses.add(new FEClass({name:"Cleric"}));
	feData.feclasses.add(new FEClass({name:"Troubadour"}));
	feData.feclasses.add(new FEClass({name:"Villager"}));
	feData.feclasses.add(new FEClass({name:"Taguel"}));
	feData.feclasses.add(new FEClass({name:"Lodestar"}));
	feData.feclasses.add(new FEClass({name:"Bride"}));
	feData.feclasses.add(new FEClass({name:"Dancer"}));
	feData.feclasses.add(new FEClass({name:"Manakete"}));
	feData.feclasses.add(new FEClass({name:"Dread Fighter"}));
	feData.feclasses.add(new FEClass({name:"Conqueror"}));
	feData.feclasses.add(new FEClass({name:"Great Lord"}));
	feData.feclasses.add(new FEClass({name:"Grandmaster"}));
	feData.feclasses.add(new FEClass({name:"Paladin"}));
	feData.feclasses.add(new FEClass({name:"Great Knight"}));
	feData.feclasses.add(new FEClass({name:"General"}));
	feData.feclasses.add(new FEClass({name:"Swordmaster"}));
	feData.feclasses.add(new FEClass({name:"Assassin"}));
	feData.feclasses.add(new FEClass({name:"Trickster"}));
	feData.feclasses.add(new FEClass({name:"Berserker"}));
	feData.feclasses.add(new FEClass({name:"Warrior"}));
	feData.feclasses.add(new FEClass({name:"Hero"}));
	feData.feclasses.add(new FEClass({name:"Bow Knight"}));
	feData.feclasses.add(new FEClass({name:"Sniper"}));
	feData.feclasses.add(new FEClass({name:"Falcon Knight"}));
	feData.feclasses.add(new FEClass({name:"Dark Flier"}));
	feData.feclasses.add(new FEClass({name:"Wyvern Lord"}));
	feData.feclasses.add(new FEClass({name:"Griffon Rider"}));
	feData.feclasses.add(new FEClass({name:"Sorcerer"}));
	feData.feclasses.add(new FEClass({name:"Dark Knight"}));
	feData.feclasses.add(new FEClass({name:"Sage"}));
	feData.feclasses.add(new FEClass({name:"War Monk"}));
	feData.feclasses.add(new FEClass({name:"War Cleric"}));
	feData.feclasses.add(new FEClass({name:"Valkyrie"}));
	feData.feclasses.add(new FEClass({name:"Overlord"}));

	addPromotion("Lord",			"Great Lord");
	addPromotion("Tactician",		"Grandmaster");
	addPromotion("Cavalier",		"Paladin");
	addPromotion("Cavalier",		"Great Knight");
	addPromotion("Knight",			"Great Knight");
	addPromotion("Knight",			"General");
	addPromotion("Myrmidon",		"Swordmaster");
	addPromotion("Myrmidon",		"Assassin");
	addPromotion("Thief",			"Assassin");
	addPromotion("Thief",			"Trickster");
	addPromotion("Barbarian",		"Berserker");
	addPromotion("Barbarian",		"Warrior");
	addPromotion("Fighter",			"Warrior");
	addPromotion("Fighter",			"Hero");
	addPromotion("Mercenary",		"Hero");
	addPromotion("Mercenary",		"Bow Knight");
	addPromotion("Archer",			"Bow Knight");
	addPromotion("Archer",			"Sniper");
	addPromotion("Pegasus Knight",	"Falcon Knight");
	addPromotion("Pegasus Knight",	"Dark Flier");
	addPromotion("Wyvern Rider",	"Wyvern Lord");
	addPromotion("Wyvern Rider",	"Griffon Rider");
	addPromotion("Dark Mage",		"Sorcerer");
	addPromotion("Dark Mage",		"Dark Knight");
	addPromotion("Mage",			"Dark Knight");
	addPromotion("Mage",			"Sage");
	addPromotion("Priest",			"War Monk");
	addPromotion("Priest",			"Sage");
	addPromotion("Cleric",			"War Cleric");
	addPromotion("Cleric",			"Sage");
	addPromotion("Troubadour",		"War Cleric");
	addPromotion("Troubadour",		"Valkyrie");


	//Skills
	feData.skills.add(new Skill({name:'Dual Strike+',		desc:'Adds 10% to Dual Strike rate'}));
	feData.skills.add(new Skill({name:'Charm',				desc:'Hit rate and Avoid +5 to all allies within a 3 tile radius'}));
	feData.skills.add(new Skill({name:'Aether',				desc:'Attack twice consecutively, with the first strike having a Sol effect and the second strike having a Luna effect'}));
	feData.skills.add(new Skill({name:'Rightful King',		desc:'Adds 10% to Skill activation rates'}));
	feData.skills.add(new Skill({name:'Veteran',			desc:'Experience gain x 1.5 when paired up'}));
	feData.skills.add(new Skill({name:'Solidarity',			desc:'Critical and Critical Avoid +10 to adjacent allies'}));
	feData.skills.add(new Skill({name:'Ignis',				desc:'Adds (Magic)/2 damage when attacking with weapons and (Strength)/2 damage when attacking with magic'}));
	feData.skills.add(new Skill({name:'Rally Spectrum',		desc:'All stats +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Discipline',			desc:'Weapon experience x2'}));
	feData.skills.add(new Skill({name:'Outdoor Fighter',	desc:'Hit rate and Avoid +10 when fighting outdoors'}));
	feData.skills.add(new Skill({name:'Defender',			desc:'All stats +1 when paired up'}));
	feData.skills.add(new Skill({name:'Aegis',				desc:'Halves damage from bows, tomes and dragonstones'}));
	feData.skills.add(new Skill({name:'Luna',				desc:'Ignores half the enemy\'s Defence or Resistance'}));
	feData.skills.add(new Skill({name:'Dual Guard+',		desc:'Adds 10% to the Dual Guard rate'}));
	feData.skills.add(new Skill({name:'Defence +2',			desc:'Defence +2'}));
	feData.skills.add(new Skill({name:'Indoor Fighter',		desc:'Hit rate and Avoid +10 when fighting indoors'}));
	feData.skills.add(new Skill({name:'Rally Defence',		desc:'Defence +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Pavise',				desc:'Halves damage from swords, lances, axes (includes magical variants) and beaststones'}));
	feData.skills.add(new Skill({name:'Avoid +10',			desc:'Avoid +10'}));
	feData.skills.add(new Skill({name:'Vantage',			desc:'When HP under half, always attack first during the enemy\'s Turn'}));
	feData.skills.add(new Skill({name:'Astra',				desc:'Deals 5 consecutive hits with half damage'}));
	feData.skills.add(new Skill({name:'Swordfaire',			desc:'Strength +5 when equipped with a sword (Magic +5 when equipped with the Levin Sword)'}));
	feData.skills.add(new Skill({name:'Armsthrift',			desc:'Attack does not reduce weapon usage'}));
	feData.skills.add(new Skill({name:'Patience',			desc:'Hit rate and Avoid +10 during the enemy\'s Turn'}));
	feData.skills.add(new Skill({name:'Sol',				desc:'Recover HP equal to half the damage dealt to the enemy'}));
	feData.skills.add(new Skill({name:'Axebreaker',			desc:'Hit rate and Avoid +50 when the enemy is equipped with an axe'}));
	feData.skills.add(new Skill({name:'HP +5',				desc:'Maximum HP +5'}));
	feData.skills.add(new Skill({name:'Zeal',				desc:'Critical +5'}));
	feData.skills.add(new Skill({name:'Rally Strength',		desc:'Strength +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Counter',			desc:'Returns damage when attacked by an adjacent enemy'}));
	feData.skills.add(new Skill({name:'Despoil',			desc:'Obtain Bullion (S) from the enemy if the user defeats the enemy'}));
	feData.skills.add(new Skill({name:'Gamble',				desc:'Hit rate -5, Critical +10'}));
	feData.skills.add(new Skill({name:'Wrath',				desc:'Critical +20 when under half HP'}));
	feData.skills.add(new Skill({name:'Axefaire',			desc:'Strength +5 when equipped with an axe (Magic +5 when equipped with the Bolt Axe)'}));
	feData.skills.add(new Skill({name:'Skill +2',			desc:'Skill +2'}));
	feData.skills.add(new Skill({name:'Prescience',			desc:'Hit rate and Avoid +15 during the user\'s Turn'}));
	feData.skills.add(new Skill({name:'Hit Rate +20',		desc:'Hit Rate +20'}));
	feData.skills.add(new Skill({name:'Bowfaire',			desc:'Strength +5 when equipped with a bow'}));
	feData.skills.add(new Skill({name:'Rally Skill',		desc:'Skill +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Bowbreaker',			desc:'Hit rate and Avoid +50 when the enemy is equipped with a bow'}));
	feData.skills.add(new Skill({name:'Locktouch',			desc:'Open doors and chests without the need of keys'}));
	feData.skills.add(new Skill({name:'Movement +1',		desc:'Movement +1'}));
	feData.skills.add(new Skill({name:'Lethality',			desc:'Instantly defeats the enemy'}));
	feData.skills.add(new Skill({name:'Pass',				desc:'User can pass through tiles occupied by enemy units'}));
	feData.skills.add(new Skill({name:'Lucky Seven',		desc:'Hit rate and Avoid +20 up to the 7th Turn'}));
	feData.skills.add(new Skill({name:'Acrobat',			desc:'All traversable terrain costs 1 movement point to cross'}));
	feData.skills.add(new Skill({name:'Speed +2',			desc:'Speed +2'}));
	feData.skills.add(new Skill({name:'Relief',				desc:'Recover 20% HP at the start of the user\'s Turn if no units are within a 3 tile radius'}));
	feData.skills.add(new Skill({name:'Rally Speed',		desc:'Speed +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Lancefaire',			desc:'Strength +5 when equipped with a lance (Magic +5 when equipped with the Shockstick)'}));
	feData.skills.add(new Skill({name:'Rally Movement',		desc:'Movement +1 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Galeforce',			desc:'Allows the user another full action after they defeat an enemy during the user\'s Turn (only once per Turn)'}));
	feData.skills.add(new Skill({name:'Strength +2',		desc:'Strength +2'}));
	feData.skills.add(new Skill({name:'Tantivy',			desc:'Hit rate and Avoid +10 if no allies within a 3 tile radius'}));
	feData.skills.add(new Skill({name:'Quick Burn',			desc:'Hit rate and Avoid +15 at the start of the chapter. Effect decreases with each passing Turn'}));
	feData.skills.add(new Skill({name:'Swordbreaker',		desc:'Hit rate and Avoid +50 when the enemy is equipped with a sword'}));
	feData.skills.add(new Skill({name:'Deliverer',			desc:'Movement +2 when paired up'}));
	feData.skills.add(new Skill({name:'Lancebreaker',		desc:'Hit rate and Avoid +50 when the enemy is equipped with a lance'}));
	feData.skills.add(new Skill({name:'Magic +2',			desc:'Magic +2'}));
	feData.skills.add(new Skill({name:'Focus',				desc:'Critical +10 when no allies within a 3 tile radius'}));
	feData.skills.add(new Skill({name:'Rally Magic',		desc:'Magic +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Tomefaire',			desc:'Magic +5 when equipped with a Tome'}));
	feData.skills.add(new Skill({name:'Hex',				desc:'Avoid -15 to all adjacent enemies'}));
	feData.skills.add(new Skill({name:'Anathema',			desc:'Avoid and Critical Avoid -10 to all enemies within a 3 tile radius'}));
	feData.skills.add(new Skill({name:'Vengeance',			desc:'Deals (user\'s Max HP - Current HP)/2 extra damage'}));
	feData.skills.add(new Skill({name:'Tomebreaker',		desc:'Hit rate and Avoid +50 when the enemy is equipped with a tome'}));
	feData.skills.add(new Skill({name:'Slow Burn',			desc:'Hit rate and Avoid increases by 1 each Turn, up to the 15th Turn'}));
	feData.skills.add(new Skill({name:'Lifetaker',			desc:'User recovers 50% HP after they defeat an enemy during the user\'s Turn'}));
	feData.skills.add(new Skill({name:'Miracle',			desc:'Character survives with 1 HP after receiving an attack that would otherwise KO them (must have over 1 HP)'}));
	feData.skills.add(new Skill({name:'Healtouch',			desc:'Restores an extra 5 HP when healing allies'}));
	feData.skills.add(new Skill({name:'Rally Luck',			desc:'Luck +8 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Renewal',			desc:'Recover 30% HP at the start of the user\'s Turn'}));
	feData.skills.add(new Skill({name:'Resistance +2',		desc:'Resistance +2'}));
	feData.skills.add(new Skill({name:'Demoiselle',			desc:'Avoid and Critical Avoid +10 to all male allies within a 3 tile radius'}));
	feData.skills.add(new Skill({name:'Rally Resistance',	desc:'Resistance +4 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Dual Support+',		desc:'Increases the support bonus effect'}));
	feData.skills.add(new Skill({name:'Aptitude',			desc:'Adds 20% to all growth rates during Level Ups'}));
	feData.skills.add(new Skill({name:'Underdog',			desc:'Hit rate and Avoid +15 when user\'s Level is lower than the enemy (promoted units count as Level +20)'}));
	feData.skills.add(new Skill({name:'Luck +4',			desc:'Luck +4'}));
	feData.skills.add(new Skill({name:'Special Dance',		desc:'Strength, Magic, Defence and Resistance +2 for one Turn for the unit who receives the user\'s Dance'}));
	feData.skills.add(new Skill({name:'Even Rhythm',		desc:'Hit rate and Avoid +10 during even numbered Turns'}));
	feData.skills.add(new Skill({name:'Beastbane',			desc:'Deals effective damage beast units when user is a Taguel'}));
	feData.skills.add(new Skill({name:'Odd Rhythm',			desc:'Hit rate and Avoid +10 during odd numbered Turns'}));
	feData.skills.add(new Skill({name:'Wyrmsbane',			desc:'Deals effective damage to  (dragon) units when user is a Manakete'}));
	feData.skills.add(new Skill({name:'Shadowgift',			desc:'Enables usage of Dark Tomes for Tome wielders (Aversa, Morgan as Aversa\'s daughter, DLC Micaiah and DLC Katarina only)'}));
	feData.skills.add(new Skill({name:'Conquest',			desc:'Negates user\'s beast and armour type weaknesses (Walhart, Morgan as Walhart\'s son, Zephiel and DLC Ephraim only)'}));
	feData.skills.add(new Skill({name:'Resistance +10',		desc:'Resistance +10'}));
	feData.skills.add(new Skill({name:'Aggressor',			desc:'Attack +10 during the user\'s Turn'}));
	feData.skills.add(new Skill({name:'Rally Love',			desc:'All stats +2 and Movement +1 to all allies within a 3 tile radius for one Turn when the Rally command is used'}));
	feData.skills.add(new Skill({name:'Bonds',				desc:'Restores 10 HP to all allies within a 3 tile radius at the beginning of the user\'s Turn'}));
	feData.skills.add(new Skill({name:'All Stats +2',		desc:'Strength, Magic, Skill, Speed, Luck, Defence and Resistance +2 (Learned by using the All Stats +2 item - DLC)'}));
	feData.skills.add(new Skill({name:'Paragon',			desc:'Experience gain x2 (Learned by using the Paragon item - DLC)'}));
	feData.skills.add(new Skill({name:'Iote\'s Shield',		desc:'Negates user\'s  (flying) type weakness (Learned by using the Iote\'s Shield item - DLC)'}));
	feData.skills.add(new Skill({name:'Limit Break',		desc:'Raises the character\'s maximum stats by 10 (Learned by using the Limit Break item - DLC)'}));

	//Associate skill and feclasses
	setSkills("Lord",				["Dual Strike+", "Charm"]);
	setSkills("Great Lord",			["Aether", "Rightful King"]);
	setSkills("Tactician",			["Veteran", "Solidarity"]);
	setSkills("Grandmaster",		["Ignis", "Rally Spectrum"]);
	setSkills("Cavalier",			["Discipline", "Outdoor Fighter"]);
	setSkills("Paladin",			["Defender", "Aegis"]);
	setSkills("Great Knight",		["Luna", "Dual Guard+"]);
	setSkills("Knight",				["Defence +2", "Indoor Fighter"]);
	setSkills("General",			["Rally Defence", "Pavise"]);
	setSkills("Myrmidon",			["Avoid +10", "Vantage"]);
	setSkills("Swordmaster",		["Astra", "Swordfaire"]);
	setSkills("Mercenary",			["Armsthrift", "Patience"]);
	setSkills("Hero",				["Sol", "Axebreaker"]);
	setSkills("Fighter",			["HP +5", "Zeal"]);
	setSkills("Warrior",			["Rally Strength", "Counter"]);
	setSkills("Barbarian",			["Despoil", "Gamble"]);
	setSkills("Berserker",			["Wrath", "Axefaire"]);
	setSkills("Archer",				["Skill +2", "Prescience"]);
	setSkills("Sniper",				["Hit Rate +20", "Bowfaire"]);
	setSkills("Bow Knight",			["Rally Skill", "Bowbreaker"]);
	setSkills("Thief",				["Locktouch", "Movement +1"]);
	setSkills("Assassin",			["Lethality", "Pass"]);
	setSkills("Trickster",			["Lucky Seven", "Acrobat"]);
	setSkills("Pegasus Knight",		["Speed +2", "Relief"]);
	setSkills("Falcon Knight",		["Rally Speed", "Lancefaire"]);
	setSkills("Dark Flier",			["Rally Movement", "Galeforce"]);
	setSkills("Wyvern Rider",		["Strength +2", "Tantivy"]);
	setSkills("Wyvern Lord",		["Quick Burn", "Swordbreaker"]);
	setSkills("Griffon Rider",		["Deliverer", "Lancebreaker"]);
	setSkills("Mage",				["Magic +2", "Focus"]);
	setSkills("Sage",				["Rally Magic", "Tomefaire"]);
	setSkills("Dark Mage",			["Hex", "Anathema"]);
	setSkills("Sorcerer",			["Vengeance", "Tomebreaker"]);
	setSkills("Dark Knight",		["Slow Burn", "Lifetaker"]);
	setSkills("Priest",				["Miracle", "Healtouch"]);
	setSkills("Cleric",				["Miracle", "Healtouch"]);
	setSkills("War Monk",			["Rally Luck", "Renewal"]);
	setSkills("War Cleric",			["Rally Luck", "Renewal"]);
	setSkills("Troubadour",			["Resistance +2", "Demoiselle"]);
	setSkills("Valkyrie",			["Rally Resistance", "Dual Support+"]);
	setSkills("Villager",			["Aptitude", "Underdog"]);
	setSkills("Dancer",				["Luck +4", "Special Dance"]);
	setSkills("Taguel",				["Even Rhythm", "Beastbane"]);
	setSkills("Manakete",			["Odd Rhythm", "Wyrmsbane"]);

	//Associate feclasses and characters
	setFEClasses("Chrom",			["Lord",			"Cavalier",			"Archer"]);
	setFEClasses("Lissa",			["Cleric",			"Pegasus Knight",	"Troubadour"]);
	setFEClasses("Frederick",		["Cavalier",		"Knight",			"Wyvern Rider"]);
	setFEClasses("Sully",			["Cavalier",		"Myrmidon",			"Wyvern Rider"]);
	setFEClasses("Virion",			["Archer",			"Wyvern Rider",		"Mage"]);
	setFEClasses("Stahl",			["Cavalier",		"Archer",			"Myrmidon"]);
	setFEClasses("Vaike",			["Fighter",			"Thief",			"Barbarian"]);
	setFEClasses("Miriel",			["Mage",			"Troubadour",		"Dark Mage"]);
	setFEClasses("Sumia",			["Pegasus Knight",	"Knight",			"Cleric"]);
	setFEClasses("Kellam",			["Knight",			"Thief",			"Priest"]);
	setFEClasses("Donnel",			["Villager",		"Fighter",			"Mercenary"]);
	setFEClasses("Lon'qu",			["Myrmidon",		"Thief",			"Wyvern Rider"]);
	setFEClasses("Ricken",			["Mage",			"Cavalier",			"Archer"]);
	setFEClasses("Maribelle",		["Troubadour",		"Pegasus Knight",	"Mage"]);
	setFEClasses("Panne",			["Taguel",			"Thief",			"Wyvern Rider"]);
	setFEClasses("Gaius",			["Thief",			"Fighter",			"Myrmidon"]);
	setFEClasses("Cordelia",		["Pegasus Knight",	"Mercenary",		"Dark Mage"]);
	setFEClasses("Gregor",			["Mercenary",		"Barbarian",		"Myrmidon"]);
	setFEClasses("Nowi",			["Manakete",		"Mage",				"Wyvern Rider"]);
	setFEClasses("Libra",			["Priest",			"Mage",				"Dark Mage"]);
	setFEClasses("Tharja",			["Dark Mage",		"Knight",			"Archer"]);
	setFEClasses("Anna",			["Thief",			"Archer",			"Mage"]);
	setFEClasses("Olivia",			["Dancer",			"Myrmidon",			"Pegasus Knight"]);
	setFEClasses("Cherche",			["Wyvern Rider",	"Troubadour",		"Cleric"]);
	setFEClasses("Henry",			["Dark Mage",		"Barbarian",		"Thief"]);
	setFEClasses("Say'ri",			["Myrmidon",		"Pegasus Knight",	"Wyvern Rider"]);
	setFEClasses("Tiki",			["Manakete",		"Wyvern Rider",		"Mage"]);
	setFEClasses("Basilio",			["Fighter",			"Barbarian",		"Knight"]);
	setFEClasses("Flavia",			["Mercenary",		"Thief",			"Knight"]);
	setFEClasses("Gangrel",			["Thief",			"Barbarian",		"Dark Mage"]);
	setFEClasses("Walhart",			["Overlord",		"Knight",			"Wyvern Rider"]);
	setFEClasses("Emmeryn",			["Cleric",			"Pegasus Knight",	"Troubadour"]);
	setFEClasses("Yen'fay",			["Myrmidon",		"Wyvern Rider",		"Archer"]);
	setFEClasses("Aversa",			["Pegasus Knight",	"Wyvern Rider",		"Dark Mage"]);
	setFEClasses("Priam",			["Mercenary",		"Myrmidon",			"Fighter"]);

	//Set classes on the avatar
	setFEClasses("Avatar (M)", [
		"Lord",
		"Great Lord",
		"Tactician",
		"Grandmaster",
		"Cavalier",
		"Knight",
		"Paladin",
		"Great Knight",
		"General",
		"Myrmidon",
		"Thief",
		"Swordmaster",
		"Assassin",
		"Trickster",
		"Mercenary",
		"Fighter",
		"Barbarian",
		"Archer",
		"Berserker",
		"Warrior",
		"Hero",
		"Bow Knight",
		"Sniper",
		"Wyvern Rider",
		"Wyvern Lord",
		"Griffon Rider",
		"Dark Mage",
		"Mage",
		"Priest",
		"Sorcerer",
		"Dark Knight",
		"Sage",
		"War Monk"
	]);
	setFEClasses("Avatar (F)", [
		"Lord",
		"Great Lord",
		"Tactician",
		"Grandmaster",
		"Cavalier",
		"Knight",
		"Paladin",
		"Great Knight",
		"General",
		"Myrmidon",
		"Thief",
		"Swordmaster",
		"Assassin",
		"Trickster",
		"Archer",
		"Bow Knight",
		"Sniper",
		"Pegasus Knight",
		"Falcon Knight",
		"Dark Flier",
		"Wyvern Rider",
		"Wyvern Lord",
		"Griffon Rider",
		"Dark Mage",
		"Mage",
		"Cleric",
		"Troubadour",
		"Sorcerer",
		"Dark Knight",
		"Sage",
		"War Cleric",
		"Valkyrie"
	]);

	//Set up FE Class changes when inherited through parents of the opposite gender
	//Format: 				ParentName,		RemoveList,							AddList
	overrideInheritedClasses('Vaike',		['Fighter', 'Barbarian'],			['Knight', 'Mercenary']);
	overrideInheritedClasses('Gaius',		['Fighter'],						['Pegasus Knight']);
	overrideInheritedClasses('Donnel',		['Fighter', 'Villager'],			['Pegasus Knight', 'Troubadour']);
	overrideInheritedClasses('Gregor',		['Barbarian '],						['Troubadour']);
	overrideInheritedClasses('Henry',		['Barbarian '],						['Troubadour']);
	overrideInheritedClasses('Gregor',		['Fighter', 'Villager'],			['Knight', 'Mercenary']);
	overrideInheritedClasses('Lissa',		['Pegasus Knight', 'Troubadour'],	['Myrmidon', 'Barbarian']);
	overrideInheritedClasses('Miriel',		['Troubadour '],					['Barbarian']);
	overrideInheritedClasses('Maribelle',	['Pegasus Knight', 'Troubadour'],	['Cavalier', 'Priest']);
	overrideInheritedClasses('Olivia',		['Dancer', 'Pegasus Knight'],		['Barbarian', 'Mercenary']);
	overrideInheritedClasses('Panne',		['Wyvern Rider'],					['Barbarian']);
	overrideInheritedClasses('Cherche',		['Troubadour '],					['Fighter']);

	feData.getCharacterByName = getCharacterByName;

	return feData;
});
