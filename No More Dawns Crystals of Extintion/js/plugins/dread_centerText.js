 /*:
 * @plugindesc Centers message text.
 * @author Dreadwing93
 *
 * @param switch
 * @text Center Text Switch
 * @type Switch
 * @default 1
 *
 * @param allow_negative
 * @text Allow Negative Offset
 * @type boolean
 * @default true
 * @desc When a line is longer than the available space.
 *
 * @help
 * When the switch is turned on, text will be centered.
 * 
 * Note: semi-incompatible with Yanfly's automatic wordwrapping
 *       from Message Core. When using centered text, word breaks
 *       should be inserted manually.
 *
 *
 */

(function() {

	var parameters = PluginManager.parameters('dread_centerText');
	var CENTER_TEXT_SWITCH = Number(parameters["switch"]);
	var ALLOW_NEGATIVE_OFFSET = parameters["allow_negative"]==="true";

	var override_startMessage=Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
	    override_startMessage.apply(this,arguments);
	    centerText.call(this);
	};
	var override_process_newline=Window_Message.prototype.processNewLine;
	Window_Message.prototype.processNewLine = function(textState) {
	    override_process_newline.apply(this,arguments);
	    centerText.call(this);
	};
	function centerText(){
		if(!$gameSwitches.value(CENTER_TEXT_SWITCH)){ return; }
		var x = this._textState.x;
		var text = this._textState.text.slice(this._textState.index,Infinity).split('\n')[0];
		var width = this.textWidth(text);
		if (!ALLOW_NEGATIVE_OFFSET && x+width > this.contents.width){ return; }
		this._textState.x = (this.contents.width - x - width)/2 + x;
	}

})();