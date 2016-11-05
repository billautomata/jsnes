module.exports = JSNES_Utils
var JSNES_CPU_OpData = require('./JSNES_CPU_OpData.js')
var JSNES_CPU = require('./JSNES_CPU.js')
var JSNES_Keyboard = require('./JSNES_Keyboard.js')
var JSNES_PAPU_ChannelDM = require('./JSNES_PAPU_ChannelDM.js')
var JSNES_PAPU_ChannelNoise = require('./JSNES_PAPU_ChannelNoise.js')
var JSNES_PAPU_ChannelTriangle = require('./JSNES_PAPU_ChannelTriangle.js')
var JSNES_PAPU_ChannelSquare = require('./JSNES_PAPU_ChannelSquare.js')
var JSNES_PAPU = require('./JSNES_PAPU.js')
var JSNES_PPU_NameTable = require('./JSNES_PPU_NameTable.js')
var JSNES_PPU_PaletteTable = require('./JSNES_PPU_PaletteTable.js')
var JSNES_PPU_Tile = require('./JSNES_PPU_Tile.js')
var JSNES_PPU = require('./JSNES_PPU.js')
var JSNES_ROM = require('./JSNES_ROM.js')
 
function JSNES_Utils(){
    if (!(this instanceof JSNES_Utils)) return new JSNES_Utils()
this.copyArrayElements = function(src, srcPos, dest, destPos, length) {
        for (var i = 0; i < length; ++i) {
            dest[destPos + i] = src[srcPos + i];
        }
    }
this.copyArray = function(src) {
        var dest = new Array(src.length);
        for (var i = 0; i < src.length; i++) {
            dest[i] = src[i];
        }
        return dest;
    }
this.fromJSON = function(obj, state) {
        for (var i = 0; i < obj.JSON_PROPERTIES.length; i++) {
            obj[obj.JSON_PROPERTIES[i]] = state[obj.JSON_PROPERTIES[i]];
        }
    }
this.toJSON = function(obj) {
        var state = {};
        for (var i = 0; i < obj.JSON_PROPERTIES.length; i++) {
            state[obj.JSON_PROPERTIES[i]] = obj[obj.JSON_PROPERTIES[i]];
        }
        return state;
    }
this.isIE = function() {
        return (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent));
    }
};