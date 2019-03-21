//=============================================================================
// ICF-Soft Plugins - Enemy Troops Extension
// ICFSoft_EnemyTroopExt.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_ETroopEx = true;

var ICF = ICF || {};
ICF.ETroopEx = ICF.ETroopEx || {};

ICF.ETroopEx.Version = 100; // 1.00

//=============================================================================
 /*:
 * @plugindesc v1.00 This plugin allows more conditions to battle events
 * and to concatenate troops.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Developer HaltJS
 * @desc When true it throws an error if an custom page condition
 * javascript doesn't work.   NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * 
 * This is a plugin similar to ICF-Soft Event Extension, made to work with
 * troops. I've decided to separate this because of the diferences between
 * these so I can give different features each one.
 * It uses switches and variables that can be needed inside a battle, like
 * game ones, actor and party ones, battle ones, and enemy and troop ones.
 * 
 * Plus you can add enemies from other troopIds.
 * 
 * ============================================================================
 * How to use
 * ============================================================================
 * 
 * To enable a page you must give it a condition, then add every extra
 * condition to a page with a comment or note, same format as plugin commands:
 * 
 * switch x x x x x x
 * battleswitch x x x x x
 * troopswitch x x
 * partyswitch x x x
 * partybattleswitch x x x
 * 
 *  - Add specified game, battle, troop or party switch to conditions.
 *    You can place all same-type switchs you need in same line.
 * 
 * [prefix]variable x value
 * [prefix]variablehigh x value
 * [prefix]variableless x value
 * [prefix]variablemax x value
 * [prefix]variableequal x value
 * [prefix]variabledif x value
 * 
 *  - Add a variable condition. There are six types: min value, higher than,
 *    lower than, max value, equal and not equal.
 *    Optionaly you can add a prefix to use battle, troop, party and
 *    partybattle variables this way:
 * 
 * battlevariable x value
 * troopvariable x value [min/max/avg]
 * partybattlevariable x value [min/max/avg]
 * 
 *  - Party and troop variables can have an extra parameter. If omited
 *    it will check sum of members specified variables.
 *    -min: check minimun of members specified variables.
 *    -max: check maximun of members specified variables.
 *    -avg: check average value of members specified variables.
 * 
 * Also you can add enemies from another troop id by adding a comment
 * no mather wich page.
 * 
 * concatenate x x x x
 * concatenate x to y
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * Developer HaltJS: This is a development variable usefull to check if there is
 * a wrong javascript event condition.
 * When true will throw an error when it found a wrong javascript in lunatic
 * mode.
 * When false it will be ignored and game continues.
 * 
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 * 
 * It's incompatible with plugins that fully override troop setup.
 * 
 * ============================================================================
 * Known isues
 * ============================================================================
 * 
 * For non-full override troop setup plugins it must be placed before them
 * or otherwise their setup will be ignored.
 * 
 * ============================================================================
 * 
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 * 
 * ============================================================================
*/
//=============================================================================
 /*:es
 * @plugindesc v1.00 Este complemento permite más condiciones en los eventos
 * de batalla y concatenar tropas.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Developer HaltJS
 * @desc Si está activado salta cuando una función personalizada
 * da error.   No - false   Si - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 * 
 * Este plugin es similar a ICF-Soft Event Extension, pero para funcionar
 * con tropas. Los hice separados debido a las diferencias existentes y
 * así puedo poner diferentes características en cada uno.
 * Usa interruptores y variables que puedan usarse en batalla, como los
 * del juego, de personajes y enemigos y sus grupos, y de batalla.
 * 
 * Además puedes agregar enemigos de otros grupos.
 * 
 * ============================================================================
 * Uso
 * ============================================================================
 * 
 * Para habilitar una página basta con darle una condición, y entonces añadir
 * las condiciones mediante comentarios, el mismo formato que los comandos
 * de complemento:
 * 
 * switch x x x x x x
 * battleswitch x x x x x
 * troopswitch x x
 * partyswitch x x x
 * partybattleswitch x x x
 * 
 *  - Añade interruptores del juego, batalla, troopa o del grupo.
 *    Puedes poner todos los necesarios en la misma linea.
 * 
 * [prefix]variable x value
 * [prefix]variablehigh x value
 * [prefix]variableless x value
 * [prefix]variablemax x value
 * [prefix]variableequal x value
 * [prefix]variabledif x value
 * 
 *  - Añade condición de variable variable condition. Hay seis tipos: mínimo,
 *    mayor que, menor que, máximo, igual y diferente.
 *    Opcionalmente puedes añadir un prefijo como battle (de batalla),
 *    troop (de tropa), party (del grupo) y partybattle (de batalla del grupo):
 * 
 * battlevariable x value
 * troopvariable x value [min/max/avg]
 * partybattlevariable x value [min/max/avg]
 * 
 *  - Los de grupos pueden llevar un parámetro extra. Si se omite se usará
 *    la suma de dicha variable por cada miembro.
 *    -min: el mínimo del grupo.
 *    -max: el máximo del grupo.
 *    -avg: la media del grupo.
 * 
 * Además puedes añadir enemigos de otro troopid mediante un comentario
 * sin importar en qué página.
 * 
 * concatenate x x x x
 * concatenate x hasta y
 * 
 * ============================================================================
 * Parámetros
 * ============================================================================
 * 
 * Developer HaltJS: Esta es una variable de uso durante el desarrollo del juego
 * útil cuando quieres comprobar si hay alguna función personalizada incorrecta.
 * Cuando está activado al encontrar un error el juego se para.
 * Cuando está desactivado ignora el error y el juego continúa.
 * 
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 * 
 * No es compatible con plugins que reemplacen por completo el troop setup.
 * 
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 * 
 * Para los plugins que no reemplazan por completo el troop setup, éste debe
 * estar antes o les eliminará sus características.
 * 
 * ============================================================================
 * 
 * Para juegos comerciales y no comerciales.
 * Se debe incluir a ICF-Soft en los créditos.
 * Esta cabecera debe incluirse íntegramente con el plugin.
 * 
 * ============================================================================
*/
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_EnemyTroopExt');
ICF.Param = ICF.Param || {};

ICF.Param.ETroopExHalt = ICF.Parameters['Developer HaltJS'].toLowerCase() === "true";

if (!Imported.ICFSoft_MainUtility) {throw new Error('This plugin requires ICF-Soft Main Utility plugin version 1.01 to work.\nYou can download it at icfsoft.blogspot.com inside plugins section.');}
if (ICF.MainUtility.Version < 101) {throw new Error('This plugin requires ICF-Soft Main Utility plugin version 1.01 to work.\nYou can download it at icfsoft.blogspot.com inside plugins section.');}

//=============================================================================
// DataManager
//=============================================================================

ICF.ETroopEx.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!ICF.ETroopEx.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!ICF.ETroopEx.Procesed) {
	this.processTroopExTags($dataTroops);
	ICF.ETroopEx.Procesed = true;
    }
    return true;
};

DataManager.processTroopExTags = function(group) {
    for (var n = 1; n < group.length; n++) {
	var obj = group[n];
	var pages = obj.pages;

	obj.concatenation = [];

	for (var i = 1; i < pages.length; i++) {
		var page = pages[i];
		page._switchs = [];
		page._battleswitchs = [];
		page._troopswitchs = [];
		page._partyswitchs = [];
		page._partybswitchs = [];
		page._vars = [];
		page._battlevars = [];
		page._troopvars = [];
		page._partyvars = [];
		page._partybvars = [];
		page._customreq = "";
		for (j = 0; j < page.list.length; j += 1) {
			var command = page.list[j];
			if (command.code === 108) {
				ICF.TroopEx.Checking = false;
				ICF.TroopEx.ProcessComment(page, obj, command.parameters[0]);
			} else if (command.code === 408) {
				ICF.TroopEx.ProcessComment(page, obj, command.parameters[0]);
			}
		}

	}


    }
};

//=============================================================================
// TroopEx Utilities
//=============================================================================

ICF.TroopEx.Checking = false;

ICF.TroopEx.CustomSwitch = function(mapid, evid, switchname, value) {
	var _key = [mapid, evid, switchname];
	var _value = (value.toLowerCase() === "true");
	$gameSelfSwitches.setValue(_key, _value);
}

ICF.TroopEx.ProcessComment = function(page, obj, content) {
	var args = content.split(" ");
	if (ICF.TroopEx.Checking) {
		page._customreq = page._customreq + content + '\n';
	} else if (args[0] !== null && args[1] !== null) {
		if (args[0].toLowerCase() == "switch") {
			args.splice(0, 1);
			page._switchs = page._switchs.concat(args);
		} else if (args[0].toLowerCase() == "battleswitch") {
			args.splice(0, 1);
			page._battleswitchss = page._battleswitchs.concat(args);
		} else if (args[0].toLowerCase() == "troopswitch") {
			args.splice(0, 1);
			page._troopswitchs = page._troopswitchs.concat(args);
		} else if (args[0].toLowerCase() == "partyswitch") {
			args.splice(0, 1);
			page._partyswitchs = page._partyswitchs.concat(args);
		} else if (args[0].toLowerCase() == "partybattleswitch") {
			args.splice(0, 1);
			page._partybswitchs = page._partybswitchs.concat(args);
		} else if (args[0].toLowerCase().match(/((?:battle)|(?:troop)|(?:party)|(?:partybattle))?(variable)((?:high)|(?:less)|(?:min)|(?:max)|(?:equal)|(?:dif))?/i)&&(RegExp.$1.length + RegExp.$2.length + RegExp.$3.length == args[0].length)) {
			var code = (RegExp.$3 == "high")? 2 : (RegExp.$3 == "less")? 4 : (RegExp.$3 == "max")? 5 : (RegExp.$3 == "equal")? 0 : (RegExp.$3 == "dif")? 1 : 3;
			if (RegExp.$1 == "battle") page._battlevars.push([code, args[1], args[2]]);
			else if (RegExp.$1 == "troop") page._troopvars.push([code, args[1], args[2], args[3]]);
			else if (RegExp.$1 == "party") page._partyvars.push([code, args[1], args[2], args[3]]);
			else if (RegExp.$1 == "partybattle") page._partybvars.push([code, args[1], args[2], args[3]]);
			else page._vars.push([code, args[1], args[2]]);
		} else if (args[0].toLowerCase() == "customreq:") {
			page._customreq = page._customreq + content.substring(10) + '\n';
			ICF.Events.Checking = true;
		} else if (args[0].toLowerCase() == "concatenate") {
			args.splice(0, 1);
			args.extend().leaveNumbers();
			obj.concatenation = obj.concatenation.concat(args);
		}
	}
}

ICF.TroopEx.CheckVar = function(code, value1, value2) {
	switch (code) {
		case 0:
			return (value1 == value2); break;
		case 1:
			return (value1 !== value2); break;
		case 2:
			return (value1 > value2); break;
		case 3:
			return (value1 >= value2); break;
		case 4:
			return (value1 < value2); break;
		case 5:
			return (value1 <= value2); break;
		default:
			return false;
	}
}

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.fulltroop = function() {
    var fulltroop $dataTroops[this._troopId].members;
    var a = $dataTroops[this._troopId].concatenation;
    for (i = 0; i < a.length; i += 1) {
	fulltroop.concat($dataTroops[a[i]].members);
    }
    return fulltroop;
};

Game_Troop.prototype.setup = function(troopId) {
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
    this.fulltroop().forEach(function(member) {
        if ($dataEnemies[member.enemyId]) {
            var enemyId = member.enemyId;
            var x = member.x;
            var y = member.y;
            var enemy = new Game_Enemy(enemyId, x, y);
            if (member.hidden) {
                enemy.hide();
            }
            this._enemies.push(enemy);
        }
    }, this);
    this.makeUniqueNames();
};

ICF.ETroopEx.meetsConditions = Game_Troop.prototype.meetsConditions{
Game_Troop.prototype.meetsConditions = function(page) {
	if (!ICF.ETroopEx.meetsConditions.call(this, page)) return false;
	for (i = 0; i < page._switchs.length; i += 1) {
		if (!$gameSwitches.value(page._switchs[i])) {
			return false;
		}
	}
	for (i = 0; i < page._battleswitchs.length; i += 1) {
		if (!$gameBattleSwitches.value([0, 0, page._battleswitchs[i]])) {
			return false;
		}
	}
	for (i = 0; i < page._troopswitchs.length; i += 1) {
		if ($gameTroop.battleswitch(page._troopswitchs[i])) !== true) {
			return false;
		}
	}
	for (i = 0; i < page._partyswitchs.length; i += 1) {
		if ($gameParty.selfswitch(page._partyswitchs[i]) !== true) {
			return false;
		}
	}
	for (i = 0; i < page._partybswitchs.length; i += 1) {
		if ($gameParty.battleswitch(page._partybswitchs[i]) !== true) {
			return false;
		}
	}
	for (i = 0; i < page._vars.length; i += 1) {
		if (!ICF.TroopEx.CheckVar(page._vars[i][0], $gameVariables.value(page._vars[i][1]), page._vars[i][2])) {
			return false;
		}
	}
	for (i = 0; i < page._battlevars.length; i += 1) {
		var key = [0, 0, page._battlevars[i][1]];
		if (!ICF.TroopEx.CheckVar(page._battlevars[i][0], $gameBattleVariables.value(key), page._battlevars[i][2])) {
			return false;
		}
	}
	for (i = 0; i < page._partyvars.length; i += 1) {
		var code = -1;
		if (!!page._partyvars[i][3]) {code = ["min", "max", "avg"].indexOf(page._partyvars[i][3].toLowerCase());}
		if (code == 0) {if (!ICF.TroopEx.CheckVar(page._partyvars[i][0], $gameParty.minselfvariable(page._partyvars[i][1]), page._partyvars[i][2])) {
			return false;}
		} else if (code == 1) {if (!ICF.TroopEx.CheckVar(page._partyvars[i][0], $gameParty.maxselfvariable(page._partyvars[i][1]), page._partyvars[i][2])) {
			return false;}
		} else if (code == 2) {if (!ICF.TroopEx.CheckVar(page._partyvars[i][0], $gameParty.avgselfvariable(page._partyvars[i][1]), page._partyvars[i][2])) {
			return false;}
		} else {if (!ICF.TroopEx.CheckVar(page._partyvars[i][0], $gameParty.selfvariable(page._partyvars[i][1]), page._partyvars[i][2])) {
			return false;}
		}
	}
	for (i = 0; i < page._partybvars.length; i += 1) {
		var code = -1;
		if (!!page._partybvars[i][3]) {code = ["min", "max", "avg"].indexOf(page._partybvars[i][3].toLowerCase());}
		if (code == 0) {if (!ICF.TroopEx.CheckVar(page._partybvars[i][0], $gameParty.minbattlevariable(page._partybvars[i][1]), page._partybvars[i][2])) {
			return false;}
		} else if (code == 1) {if (!ICF.TroopEx.CheckVar(page._partybvars[i][0], $gameParty.maxbattlevariable(page._partybvars[i][1]), page._partybvars[i][2])) {
			return false;}
		} else if (code == 2) {if (!ICF.TroopEx.CheckVar(page._partybvars[i][0], $gameParty.avgbattlevariable(page._partybvars[i][1]), page._partybvars[i][2])) {
			return false;}
		} else {if (!ICF.TroopEx.CheckVar(page._partybvars[i][0], $gameParty.battlevariable(page._partybvars[i][1]), page._partybvars[i][2])) {
			return false;}
		}
	}
	for (i = 0; i < page._troopvars.length; i += 1) {
		var code = -1;
		if (!!page._troopvars[i][3]) {code = ["min", "max", "avg"].indexOf(page._troopvars[i][3].toLowerCase());}
		if (code == 0) {if (!ICF.TroopEx.CheckVar(page._troopvars[i][0], $gameTroop.minbattlevariable(page._troopvars[i][1]), page._troopvars[i][2])) {
			return false;}
		} else if (code == 1) {if (!ICF.TroopEx.CheckVar(page._troopvars[i][0], $gameTroop.maxbattlevariable(page._troopvars[i][1]), page._troopvars[i][2])) {
			return false;}
		} else if (code == 2) {if (!ICF.TroopEx.CheckVar(page._troopvars[i][0], $gameTroop.avgbattlevariable(page._troopvars[i][1]), page._troopvars[i][2])) {
			return false;}
		} else {if (!ICF.TroopEx.CheckVar(page._troopvars[i][0], $gameTroop.battlevariable(page._troopvars[i][1]), page._troopvars[i][2])) {
			return false;}
		}
	}

	if (page._customreq.length != "") {
		var result = false;
		try {eval(page._customreq);}
		catch (e) {if(ICF.Param.ETroopExHalt){throw new Error('Error in custom page condition for troop');}}
		return result;
	}

    return true;
}

//=============================================================================
// End of File
//=============================================================================
