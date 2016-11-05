module.exports = JSNES_PPU_Tile
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
var JSNES_PPU = require('./JSNES_PPU.js')
var JSNES_Utils = require('./JSNES_Utils.js')()
var JSNES_ROM = require('./JSNES_ROM.js')
 
function JSNES_PPU_Tile() {
    if (!(this instanceof JSNES_PPU_Tile)) return new JSNES_PPU.Tile()
this.setBuffer = function(scanline){
        for (this.y=0;this.y<8;this.y++) {
            this.setScanline(this.y,scanline[this.y],scanline[this.y+8]);
        }
    }
this.setScanline = function(sline, b1, b2){
        this.initialized = true;
        this.tIndex = sline<<3;
        for (this.x = 0; this.x < 8; this.x++) {
            this.pix[this.tIndex + this.x] = ((b1 >> (7 - this.x)) & 1) +
                    (((b2 >> (7 - this.x)) & 1) << 1);
            if(this.pix[this.tIndex+this.x] === 0) {
                this.opaque[sline] = false;
            }
        }
    }
this.render = function(buffer, srcx1, srcy1, srcx2, srcy2, dx, dy, palAdd, palette, flipHorizontal, flipVertical, pri, priTable) {

        if (dx<-7 || dx>=256 || dy<-7 || dy>=240) {
            return;
        }

        this.w=srcx2-srcx1;
        this.h=srcy2-srcy1;

        if (dx<0) {
            srcx1-=dx;
        }
        if (dx+srcx2>=256) {
            srcx2=256-dx;
        }

        if (dy<0) {
            srcy1-=dy;
        }
        if (dy+srcy2>=240) {
            srcy2=240-dy;
        }

        if (!flipHorizontal && !flipVertical) {

            this.fbIndex = (dy<<8)+dx;
            this.tIndex = 0;
            for (this.y=0;this.y<8;this.y++) {
                for (this.x=0;this.x<8;this.x++) {
                    if (this.x>=srcx1 && this.x<srcx2 && this.y>=srcy1 && this.y<srcy2) {
                        this.palIndex = this.pix[this.tIndex];
                        this.tpri = priTable[this.fbIndex];
                        if (this.palIndex!==0 && pri<=(this.tpri&0xFF)) {
                            //console.log("Rendering upright tile to buffer");
                            buffer[this.fbIndex] = palette[this.palIndex+palAdd];
                            this.tpri = (this.tpri&0xF00)|pri;
                            priTable[this.fbIndex] =this.tpri;
                        }
                    }
                    this.fbIndex++;
                    this.tIndex++;
                }
                this.fbIndex-=8;
                this.fbIndex+=256;
            }

        }else if (flipHorizontal && !flipVertical) {

            this.fbIndex = (dy<<8)+dx;
            this.tIndex = 7;
            for (this.y=0;this.y<8;this.y++) {
                for (this.x=0;this.x<8;this.x++) {
                    if (this.x>=srcx1 && this.x<srcx2 && this.y>=srcy1 && this.y<srcy2) {
                        this.palIndex = this.pix[this.tIndex];
                        this.tpri = priTable[this.fbIndex];
                        if (this.palIndex!==0 && pri<=(this.tpri&0xFF)) {
                            buffer[this.fbIndex] = palette[this.palIndex+palAdd];
                            this.tpri = (this.tpri&0xF00)|pri;
                            priTable[this.fbIndex] =this.tpri;
                        }
                    }
                    this.fbIndex++;
                    this.tIndex--;
                }
                this.fbIndex-=8;
                this.fbIndex+=256;
                this.tIndex+=16;
            }

        }
        else if(flipVertical && !flipHorizontal) {

            this.fbIndex = (dy<<8)+dx;
            this.tIndex = 56;
            for (this.y=0;this.y<8;this.y++) {
                for (this.x=0;this.x<8;this.x++) {
                    if (this.x>=srcx1 && this.x<srcx2 && this.y>=srcy1 && this.y<srcy2) {
                        this.palIndex = this.pix[this.tIndex];
                        this.tpri = priTable[this.fbIndex];
                        if (this.palIndex!==0 && pri<=(this.tpri&0xFF)) {
                            buffer[this.fbIndex] = palette[this.palIndex+palAdd];
                            this.tpri = (this.tpri&0xF00)|pri;
                            priTable[this.fbIndex] =this.tpri;
                        }
                    }
                    this.fbIndex++;
                    this.tIndex++;
                }
                this.fbIndex-=8;
                this.fbIndex+=256;
                this.tIndex-=16;
            }

        }
        else {
            this.fbIndex = (dy<<8)+dx;
            this.tIndex = 63;
            for (this.y=0;this.y<8;this.y++) {
                for (this.x=0;this.x<8;this.x++) {
                    if (this.x>=srcx1 && this.x<srcx2 && this.y>=srcy1 && this.y<srcy2) {
                        this.palIndex = this.pix[this.tIndex];
                        this.tpri = priTable[this.fbIndex];
                        if (this.palIndex!==0 && pri<=(this.tpri&0xFF)) {
                            buffer[this.fbIndex] = palette[this.palIndex+palAdd];
                            this.tpri = (this.tpri&0xF00)|pri;
                            priTable[this.fbIndex] =this.tpri;
                        }
                    }
                    this.fbIndex++;
                    this.tIndex--;
                }
                this.fbIndex-=8;
                this.fbIndex+=256;
            }

        }

    }
this.isTransparent = function(x, y){
        return (this.pix[(y << 3) + x] === 0);
    }
this.toJSON = function() {
        return {
            'opaque': this.opaque,
            'pix': this.pix
        };
    }
this.fromJSON = function(s) {
        this.opaque = s.opaque;
        this.pix = s.pix;
    }
    // Tile data:
    this.pix = new Array(64);

    this.fbIndex = null;
    this.tIndex = null;
    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;
    this.incX = null;
    this.incY = null;
    this.palIndex = null;
    this.tpri = null;
    this.c = null;
    this.initialized = false;
    this.opaque = new Array(8);
};