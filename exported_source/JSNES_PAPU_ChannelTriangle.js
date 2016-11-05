module.exports = JSNES_PAPU_ChannelTriangle
var JSNES_CPU_OpData = require('./JSNES_CPU_OpData.js')
var JSNES_CPU = require('./JSNES_CPU.js')
var JSNES_Keyboard = require('./JSNES_Keyboard.js')
var JSNES_PAPU_ChannelDM = require('./JSNES_PAPU_ChannelDM.js')
var JSNES_PAPU_ChannelNoise = require('./JSNES_PAPU_ChannelNoise.js')
var JSNES_PAPU_ChannelSquare = require('./JSNES_PAPU_ChannelSquare.js')
var JSNES_PAPU = require('./JSNES_PAPU.js')
var JSNES_PPU_NameTable = require('./JSNES_PPU_NameTable.js')
var JSNES_PPU_PaletteTable = require('./JSNES_PPU_PaletteTable.js')
var JSNES_PPU_Tile = require('./JSNES_PPU_Tile.js')
var JSNES_PPU = require('./JSNES_PPU.js')
var JSNES_Utils = require('./JSNES_Utils.js')()
var JSNES_ROM = require('./JSNES_ROM.js')
 
function JSNES_PAPU_ChannelTriangle(papu) {
    if (!(this instanceof JSNES_PAPU_ChannelTriangle)) return new JSNES_PAPU.ChannelTriangle(papu)
this.reset = function(){
        this.progTimerCount = 0;
        this.progTimerMax = 0;
        this.triangleCounter = 0;
        this.isEnabled = false;
        this.sampleCondition = false;
        this.lengthCounter = 0;
        this.lengthCounterEnable = false;
        this.linearCounter = 0;
        this.lcLoadValue = 0;
        this.lcHalt = true;
        this.lcControl = false;
        this.tmp = 0;
        this.sampleValue = 0xF;
    }
this.clockLengthCounter = function(){
        if (this.lengthCounterEnable && this.lengthCounter>0) {
            this.lengthCounter--;
            if (this.lengthCounter===0) {
                this.updateSampleCondition();
            }
        }
    }
this.clockLinearCounter = function(){
        if (this.lcHalt){
            // Load:
            this.linearCounter = this.lcLoadValue;
            this.updateSampleCondition();
        }
        else if (this.linearCounter > 0) {
            // Decrement:
            this.linearCounter--;
            this.updateSampleCondition();
        }
        if (!this.lcControl) {
            // Clear halt flag:
            this.lcHalt = false;
        }
    }
this.getLengthStatus = function(){
        return ((this.lengthCounter === 0 || !this.isEnabled)?0:1);
    }
this.readReg = function(address){
        return 0;
    }
this.writeReg = function(address, value){
        if (address === 0x4008) {
            // New values for linear counter:
            this.lcControl  = (value&0x80)!==0;
            this.lcLoadValue =  value&0x7F;

            // Length counter enable:
            this.lengthCounterEnable = !this.lcControl;
        }
        else if (address === 0x400A) {
            // Programmable timer:
            this.progTimerMax &= 0x700;
            this.progTimerMax |= value;

        }
        else if(address === 0x400B) {
            // Programmable timer, length counter
            this.progTimerMax &= 0xFF;
            this.progTimerMax |= ((value&0x07)<<8);
            this.lengthCounter = this.papu.getLengthMax(value&0xF8);
            this.lcHalt = true;
        }

        this.updateSampleCondition();
    }
this.clockProgrammableTimer = function(nCycles){
        if (this.progTimerMax>0) {
            this.progTimerCount += nCycles;
            while (this.progTimerMax > 0 &&
                    this.progTimerCount >= this.progTimerMax) {
                this.progTimerCount -= this.progTimerMax;
                if (this.isEnabled && this.lengthCounter>0 &&
                        this.linearCounter > 0) {
                    this.clockTriangleGenerator();
                }
            }
        }
    }
this.clockTriangleGenerator = function() {
        this.triangleCounter++;
        this.triangleCounter &= 0x1F;
    }
this.setEnabled = function(value) {
        this.isEnabled = value;
        if(!value) {
            this.lengthCounter = 0;
        }
        this.updateSampleCondition();
    }
this.updateSampleCondition = function() {
        this.sampleCondition = this.isEnabled &&
                this.progTimerMax > 7 &&
                this.linearCounter > 0 &&
                this.lengthCounter > 0;
    }
    this.papu = papu;

    this.isEnabled = null;
    this.sampleCondition = null;
    this.lengthCounterEnable = null;
    this.lcHalt = null;
    this.lcControl = null;

    this.progTimerCount = null;
    this.progTimerMax = null;
    this.triangleCounter = null;
    this.lengthCounter = null;
    this.linearCounter = null;
    this.lcLoadValue = null;
    this.sampleValue = null;
    this.tmp = null;

    this.reset();
};