Contents:
======================================================================

	1 Introduction
	2 Plugin notetags
	 2.1 Trait codes
	 2.2 Effect codes
	 2.3 Adding new codes
	3 Self and battle switchs/variables system
	4 Tags system
	5 Plugin commands
	6 Plugin script calls
	 6.1 Use of eval system
	7 New array features
	 7.1 Without alter array
	 7.2 Altering array contents
	 7.3 Array from string
	8 Terms of use


1 INTRODUCTION
======================================================================

This is a plugin with a lot of functionality making scripting easier.

There are some recurrent functions inside my plugins so it is made to
englobe all I will need.
It's required for the mayority of my plugins.

Attached to 1.03 version of plugin.


2 PLUGIN NOTETAGS
======================================================================

You can use json inside 'Json master' tag to add new fields or edit
out of field limits. It's more usefull than meta-tags.

Use every line between open and close tags to edit a field, first
field name followed by a two dots symbol, then one space and the code
in json format.

Example:

<JSON MASTER>
gold: 50000000
hands_power: [50,100]
grade: 'F'
</JSON MASTER>


You can add traits with 'Traits master'.
Every line between open and close tags are three numbers separated by
spaces. It is recomended to use the three numbers even if specified trait
uses only two, next inline place can be used for comments.
You can use a name instead of first number (see below for all names).

Example:

<TRAITS MASTER>
elem_rate 1 1.5
21 1 2
31 2 0 -Attack element
</TRAITS MASTER>


You can add trait groups with 'Subtraits master'. These can be used
as subclass traits, random enemy/item/equipment traits, alter states
tiers and so on. It works like traits master but you don't need to
close tag every time you open a new subtrait setup.

Example:

<SUBTRAITS MASTER> -Fire slime
elem_rate 1 1.5
11 2 0.5
31 2 0 -Fire attack element
<SUBTRAITS MASTER> -Cold slime
elem_rate 1 1.5
11 2 2.1
31 3 0 -Cold attack element
</SUBTRAITS MASTER>
 

Note: More than one plugin can use subtraits in same data for different
purposes so you must provide a way to use specific blocks, something
like "<MyAmacingPluginSubtraits first last>" can be usefull.

To access a subtrait setup use 'item.subtraits[i].traits' instead of
'item.traits', where 'i' is the index.
And for trait items use 'item.subtraits[i]' instead of 'item'.


Effects master and Subeffects master tags work like traits/subtraits ones
but are used for effects and effect setups, and need four numbers.
You can use a name instead of first number (see below for all names).

Examples:

<EFFECTS MASTER>
recover_hp 0 0.5 50
gain_tp 0 10 0
</EFFECTS MASTER>

<SUBEFFECTS MASTER>
recover_mp 0 0.5 50
gain_tp 0 5 0
<SUBEFFECTS MASTER>
recover_hp 0 0.5 50
gain_tp 0 10 0
</SUBEFFECTS MASTER>


Note: More than one plugin can use subeffects in same data for different
purposes so you must provide a way to use specific blocks, something
like "<MyAmacingPluginSubeffects first last>" can be usefull.

To access a subeffect setup use 'item.subeffects[i].effects' instead of
'item.effects', where 'i' is the index.
And for effect items use 'item.subeffects[i]' instead of 'item'.


You can add javascript code with 'Jseval master'. These code can be run
when a condition is given or diverse pourposes.
You can give single key, double key or more, and you dont't need
to close tag every time you open a new code.

Example:

<JSEVAL MASTER A>
this.gainTp(15);
<JSEVAL MASTER A B>
if (this == subject) this.gainMp(-10);
v.setValue(10, v.value(10) + 2);
</JSEVAL MASTER>

Some variables are passed and can be used inside code:
  - subject: the subject of the action.
  - item: the object used in the action. Can be an item or a skill.
  - isSkill: check if is an skill.


You can add special tags for different pourposes with this:

<TAGS tag1 tag2>

Tags are divided into two groups based on where are.
  - Base tags are those inherited from actors and enemies (actors,
    classes, enemies and ingame given tags).
  - Other tags are those that can be attached (states, armors
    weapons...).
  - Battle tags are those that can be given in battle, are avaiable
    in battle and reset every battle. These are merged inside
    second group.

2.1 Trait Codes-------------------------------------------------------

Here is the list of all trait names that can be used inside
traits/subtraits master tags.
You can find all trait codes used by default in RPG Maker MV plus
those used by my plugins:

    elem_rate
    debuffrate, ndebuffrate
    state_rate
    state_resist
    skill_rate, itemdamage_rate, weapon_rate
    elem_absorb, elem_curse
    paramplus, paramrate, paramflat, paramxrate
    xparamplus, xparamrate, xparamflat
    sparamplus, sparamrate, sparamflat
    nparamplus, nparamrate, nparamflat, nparamxrate
    pparamplus, pparamrate, pparamflat
    attack_elem
    attack_state
    attack_speed
    attack_times
    attack_weapon
    elem_enhace, skill_enhace, weapon_enhace, itemdamage_enhace
    stypeadd
    stypeseal
    skilladd
    skillseal
    equipweapon
    equiparmor
    equiplock
    equipseal
    slot_type
    action_plus
    special_flag
    collapse_type
    party_ability

2.2 Effect Codes------------------------------------------------------

Here is the list of all effect names that can be used inside
effects/effects master tags with its normal use. Gaps must be filled
with zeroes.
You can find all effect codes used by default in RPG Maker MV plus
those used by my plugins:

    recover_hp     0 hprate fixed
    recover_mp     0 mprate fixed
    gain_tp        0 value 0
    add_state      stateId chance 0	-StateId = 0 will use battler attack states
    remove_state   stateId chance 0
    add_buff       paramId turns 0
    add_debuff     paramId turns 0
    remove_buff    paramId 0 0
    remove_debuff  paramId 0 0
    add_nbuff      paramId turns 0
    add_ndebuff    paramId turns 0
    remove_nbuff   paramId 0
    remove_ndebuff paramId 0
    special        code 0 0        -There is actually only code here 0 = escape
    grow           paramId value 0
    learn_skill    skillId 0 0
    common_event   eventId 0 0
    ngrow          nparamId value 0

2.3 Adding New Codes--------------------------------------------------

It is posible to add more trait and effect names for your plugins with
these sentences:

ICF.MainUtility.traittags.push([name, code, offset]);
ICF.MainUtility.effecttags.push([name, code, offset]);

    name: the name used.

    code: the result code when that name is used.

    offset: an extra offset used if you want to recicle a code instead
      of using a new one. If not used put 0.


3 SELF AND BATTLE SWITCHES/VARIABLES SYSTEM
======================================================================

There is a special selfswitches and selfvariables system alowing to
use switches and variables for events, maps and actors.

Also there are virtual party and enemy switches and variables. Party
ones are party members switches and variables combinations.
Selfswitches and variables have been expanded for enemies and troops and
battleswitches and variables for actors and party.

Enemy self ones works different. There are atached to enemyId instead of
position, so enemies with same id share selfswitches and variables.

Selfvariables system allows to use every value type or numerical
strict values.

Battle ones are reciclable and are reset every battle.


4 TAGS SYSTEM
======================================================================

There is a special tags and battletags system that allows to give
tags to actors, enemies, classes, items and so on.

Tags can be used for multiple pourposes.

5 PLUGIN COMMANDS
======================================================================

selfswitch x true/false
mapswitch x true/false
actorswitch actorid x true/false
enemyswitch enemyid x true/false
battleswitch x true/false
actorbattleswitch actorid x true/false
enemybattleswitch enemyposition x true/false

   - Turns on/off specified selfswitch or mapswitch.
     You can also use an actorswitch.

remoteswitch mapid eventid x true/false

    - Turns on/off specified selfswitch or mapswitch remotely.
      Use eventid 0 for a mapswitch.

selfvariable x value
mapvariable x value
actorvariable actorid x value
enemyvariable enemyid x value
battlevariable x value
actorbattlevariable actorid x value
enemybattlevariable enemyposition x value

    - Changes value of specified selfvariable or mapvariable.
      You can also use an actorvariable.
      You can put increase/multiply/divide/mod prefix.

remotevariable mapid eventid x value

    - Changes value of specified selfvariable or mapvariable remotely.
      Use eventid 0 for a mapvariable.
      You can put increase/multiply/divide/mod prefix.

actortraitadd actorid code id value
partymembertraitadd actorpos code id value
enemytraitadd enemy code id value

    - Adds an ingame trait to specified actor, actor in party or
      in battle enemy.
      Doesn't check for repeated traits (same code and id).

actortrait actorid code id value
partymembertrait actorpos code id value
enemytrait enemy code id value

    - Ensures an ingame trait to specified actor, actor in party or
      in battle enemy. If there isn't it'll be added, if there is at
      least one it'll be replaced and all repeated traits will be
      removed.

actortraitplus actorid code id value
partymembertraitplus actorpos code id value
enemytraitplus enemy code id value

    - Increase existing ingame trait to specified actor, actor in
      party or in battle enemy by a value. If there isn't it'll be
      added, and every repeated trait will be merged togeder by sum.

actortraitrate actorid code id value
partymembertraitrate actorpos code id value
enemytraitrate enemy code id value

    - Multiply existing ingame trait to specified actor, actor in
      party or in battle enemy by a value. If there isn't it'll be
      added, and every repeated trait will be merged togeder by
      multiplication.

removeactortrait actorid code id
removepartymembertrait actorpos code id
removeenemytraitenemy code id

    - Remove all ingame traits with specified code and id to specified
      actor, actor in party or in battle enemy.

clearactortraits actorid
clearpartymembertraits actorpos
clearenemytraits enemy

    - Remove all ingame traits to specified actor, actor in party or
      in battle enemy.

addactortag actorid tag
addpartymembertag actorposition tag
addenemytag enemypos tag

   - Add ingame tags to specified actor, actor in party or in battle
     enemy. You can add all tags you want in a single line.

removeactortag actorid tag
removepartymember actorposition tag
removeenemy enemypos tag

   - Remove ingame tags to specified actor, actor in party or in battle
     enemy. You can place all tags you want to remove in a single line.

clearactortag actorid tag
clearpartymember actorposition tag
clearenemy enemypos tag

   - Remove all ingame tags to specified actor, actor in party or in
     battle enemy.

By changing addactortag to addactorbattletag you can give battletags.
Can be applied to all these tag commands.

6 PLUGIN SCRIPT CALLS
======================================================================

There are some script calls that can be used inside formulas and code
or if you want to use instead of plugin commands:

Managing selfswitchs and variables for events, actors and enemies:

selfswitch(selfswitch);
setselfswitch(selfswitch, value)
selfvariable(selfvariable)
strictselfvariable(selfvariable)
setselfvariable(selfvariable, value)
increaseselfvariable(selfvariable, value)
multiplyselfvariable(selfvariable, value)
divideselfvariable(selfvariable, value)
modselfvariable(selfvariable, value)

battleswitch(selfswitch);
setbattleswitch(selfswitch, value)
battlevariable(selfvariable)
strictbattlevariable(selfvariable)
setbattlevariable(selfvariable, value)
increasebattlevariable(selfvariable, value)
multiplybattlevariable(selfvariable, value)
dividebattlevariable(selfvariable, value)
modbattlevariable(selfvariable, value)


Managing mapswitchs and variables inside events and maps:

mapswitch(mapswitch)
setmapswitch(mapswitch, value)
mapvariable(mapvariable)
strictmapvariable(mapvariable)
setmapvariable(mapvariable, value)
increasemapvariable(mapvariable, value)
multiplymapvariable(mapvariable, value)
dividemapvariable(selfvariable, value)
modmapvariable(selfvariable, value)

Getting party switches and variables combinations:

selfswitch(selfswitch)
      - Check if at least one party member has this switch.

selfvariable(selfvariable)
maxselfvariable(selfvariable)
minselfvariable(selfvariable)
avgselfvariable(selfvariable)
      - Check sum, max, min or average value of all party members
        variable.

-change self to battle for battle switches/variables.


To change switchs and variables remotely:

ICF.MainUtility.CustomSwitch(mapid, evid, switchname, value)
ICF.MainUtility.CustomVariable(mapid, evid, variablename, value)
ICF.MainUtility.IncreaseCustomVariable(mapid, evid, variablename, value)
ICF.MainUtility.MultiplyCustomVariable(mapid, evid, variablename, value)
ICF.MainUtility.DivideCustomVariable(mapid, evid, variablename, value)
ICF.MainUtility.ModCustomVariable(mapid, evid, variablename, value)
      - You can use evid 0 for map ones.
        You can use mapid 0 for actor ones.
        You can use mapid "e" for enemy ones.


To change battle switchs and variables remotely:

ICF.MainUtility.BattleSwitch(code, enemy, switchname, value)
ICF.MainUtility.BattleVariable(code, enemy, variablename, value)
ICF.MainUtility.IncreaseBattleVariable(code, enemy, variablename, value)
ICF.MainUtility.MultiplyBattleVariable(code, enemy, variablename, value)
ICF.MainUtility.DivideBattleVariable(code, enemy, variablename, value)
ICF.MainUtility.ModBattleVariable(code, enemy, variablename, value)
      - Use code and enemy 0 for normal ones.
        Use code 0 for actor ones.
        Use code "e" for enemy ones.


To add/remove ingame traits:

ICF.MainUtility.addTrait(data, mode, code, dataid, value)
      - Data must be an actor or enemy.
        Modes:
        0: Add trait without check if there is one already.
        1: Add trait and removes all repeated (same code and dataid).
        2: Sums value to trait and joins all repeated by sum.
        3: Multiplies value to trait and joins all repeated by
           multiplication.
        If there isn't a trait with specified code and dataid it will
        be added.

ICF.MainUtility.removeTrait(data, code, dataid)
      - Data must be an actor or enemy.
        Removes all ingame traits with specified code and dataid.

You can add/remove traits directy from actor/enemy with these:

actor/enemy addTrait(code, dataid, value)
actor/enemy setTrait(code, dataid, value)
actor/enemy increaseTrait(code, dataid, value)
actor/enemy multiplyTrait(code, dataid, value)
actor/enemy removeTrait(code, dataid)

actor/enemy clearTraits()
      - Removes all ingame traits from actor/enemy.


You can add/remove tags/battletags directy from actor/enemy with these:

actor/enemy addTag(tag)
actor/enemy addTags(tags)
actor/enemy removeTag(tag)
actor/enemy removeTags(tags)
actor/enemy clearTags()
actor/enemy addBattleTag(tag)
actor/enemy addBattleTags(tags)
actor/enemy removeBattleTag(tag)
actor/enemy removeBattleTags(tags)
actor/enemy clearBattleTags()

You can check if an actor/enemy has a tags or count how many tags has
with these:

actor/enemy hasBaseTag(tag)
actor/enemy hasTag(tag)
actor/enemy countBaseTags(tags)
actor/enemy countTags(tags)

And access tags with these other:

actor/enemy baseTags()
actor/enemy battleTags()
actor/enemy allTags()

6.1 Use of eval system------------------------------------------------

To call javascript code attached to a battler use jsevalreactions
funtions. Usefull for plugin programing.

jsevalReactions(subject, item, isSkill, reaction)
      - reaction is a string or a key.
        Example: 'a'

jsevalArrayReactions(subject, item, isSkill, reactions)
      - reactions is an array of strings and/or keys.
        Example: ['a','b',['a','c']]

jsevalBulkReactions(subject, item, isSkill, reactions)
      - reactions is an array of arrays that are used to form keys.
        Example: [['a',[1,2]],['b',[2,3]]]
        Will result ['a',1],['a',2],['b',2] and ['b',3] keys.

      - subject is a battler, is usefull for origin of an action.
      - item is the object used in the action. Can be usually an
        item or a skill.
      - isSkill is used when is check if is an skill needed.


7 NEW ARRAY FEATURES
======================================================================

Array.range()
      - Creates a new array within a range. You can use up to three
        arguments:
        1: from 1 to value (or -1 to value if negative).
        2: from first to second value.
        3: from first to second value with steps.

Array.coincidences()
      - Creates a new array with all non-repeated values that are
        present in all arrays.
        You can use only arrays for arguments but can use all you will
        need.

7.1 Without alter array-----------------------------------------------

cleaned()
      - Returns an array without empty values.

cleanedAll()
      - Same as previous but cleans also arrays inside.

numbers()
      - Returns all numbers from array.


7.2 Altering array contents-------------------------------------------

removeRepeated()
      - Removes all repeated values.

clean()
      - Removes all empty values.

cleanAll()
      - Removes all empty values plus empty values of inside arrays.

extend()
      - Extend array with ranges. If there is a range conector ('to'
        in english, 'a' and 'hasta' in spanish) it will concatenate
        with a range of conector surrounding values.

fixedBlocks(mod)
      - Ensures that length can be divided by adding empty indexes.

leaveNumbers()
      - Removes all non numerical values.

reduceToFit()
      - Reduces lenght of array to fit other arrays length.
        You can use only arrays for arguments but can use all you will
        need.

7.3 Array from string-------------------------------------------------

doubleSplit()
      - Two step split. First by commas and inside arrays by spaces.

doubleSplitNumbers()
      - Same as previous but check for ranges and leave numbers.


8 TERMS OF USE
======================================================================

	* For commercial and non-commercial games.

	* Credit to ICF-Soft.

	* Any plugin that needs this to work must add a clausule to
	  say that ICF-Soft must be included in credits page.

	* Plugin entire header and readme files must be included
	  with plugin.

