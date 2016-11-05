module.exports = JSNES_PPU_NameTable
var JSNES_CPU_OpData = require('./JSNES_CPU_OpData.js')
var JSNES_CPU = require('./JSNES_CPU.js')
var JSNES_Keyboard = require('./JSNES_Keyboard.js')
var JSNES_PAPU_ChannelDM = require('./JSNES_PAPU_ChannelDM.js')
var JSNES_PAPU_ChannelNoise = require('./JSNES_PAPU_ChannelNoise.js')
var JSNES_PAPU_ChannelTriangle = require('./JSNES_PAPU_ChannelTriangle.js')
var JSNES_PAPU_ChannelSquare = require('./JSNES_PAPU_ChannelSquare.js')
var JSNES_PAPU = require('./JSNES_PAPU.js')
var JSNES_PPU_PaletteTable = require('./JSNES_PPU_PaletteTable.js')
var JSNES_PPU_Tile = require('./JSNES_PPU_Tile.js')
var JSNES_PPU = require('./JSNES_PPU.js')
var JSNES_Utils = require('./JSNES_Utils.js')()
var JSNES_ROM = require('./JSNES_ROM.js')
 
function JSNES_PPU_NameTable(width, height, name) {
    if (!(this instanceof JSNES_PPU_NameTable)) return new JSNES_PPU.NameTable(width, height, name)
this.getTileIndex = function(x, y){
        return this.tile[y*this.width+x];
    }
this.getAttrib = function(x, y){
        return this.attrib[y*this.width+x];
    }
this.writeAttrib = function(index, value){
        var basex = (index % 8) * 4;
        var basey = Math.floor(index / 8) * 4;
        var add;
        var tx, ty;
        var attindex;

        for (var sqy=0;sqy<2;sqy++) {
            for (var sqx=0;sqx<2;sqx++) {
                add = (value>>(2*(sqy*2+sqx)))&3;
                for (var y=0;y<2;y++) {
                    for (var x=0;x<2;x++) {
                        tx = basex+sqx*2+x;
                        ty = basey+sqy*2+y;
                        attindex = ty*this.width+tx;
                        this.attrib[ty*this.width+tx] = (add<<2)&12;
                    }
                }
            }
        }
    }
this.toJSON = function() {
        return {
            'tile': this.tile,
            'attrib': this.attrib
        };
    }
this.fromJSON = function(s) {
        this.tile = s.tile;
        this.attrib = s.attrib;
    }
    this.width = width;
    this.height = height;
    this.name = name;

    this.tile = new Array(width*height);
    this.attrib = new Array(width*height);
};