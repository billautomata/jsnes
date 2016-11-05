module.exports = JSNES_PAPU_ChannelSquare
var JSNES_CPU_OpData = require('./JSNES_CPU_OpData.js')
var JSNES_CPU = require('./JSNES_CPU.js')
var JSNES_Keyboard = require('./JSNES_Keyboard.js')
var JSNES_PAPU_ChannelDM = require('./JSNES_PAPU_ChannelDM.js')
var JSNES_PAPU_ChannelNoise = require('./JSNES_PAPU_ChannelNoise.js')
var JSNES_PAPU_ChannelTriangle = require('./JSNES_PAPU_ChannelTriangle.js')
var JSNES_PAPU = require('./JSNES_PAPU.js')
var JSNES_PPU_NameTable = require('./JSNES_PPU_NameTable.js')
var JSNES_PPU_PaletteTable = require('./JSNES_PPU_PaletteTable.js')
var JSNES_PPU_Tile = require('./JSNES_PPU_Tile.js')
var JSNES_PPU = require('./JSNES_PPU.js')
var JSNES_Utils = require('./JSNES_Utils.js')()
var JSNES_ROM = require('./JSNES_ROM.js')
 
function JSNES_PAPU_ChannelSquare(papu, square1) {
    if (!(this instanceof JSNES_PAPU_ChannelSquare)) return new JSNES_PAPU.ChannelSquare(papu, square1)
this.reset = function() {
        this.progTimerCount = 0;
        this.progTimerMax = 0;
        this.lengthCounter = 0;
        this.squareCounter = 0;
        this.sweepCounter = 0;
        this.sweepCounterMax = 0;
        this.sweepMode = 0;
        this.sweepShiftAmount = 0;
        this.envDecayRate = 0;
        this.envDecayCounter = 0;
        this.envVolume = 0;
        this.masterVolume = 0;
        this.dutyMode = 0;
        this.vol = 0;

        this.isEnabled = false;
        this.lengthCounterEnable = false;
        this.sweepActive = false;
        this.sweepCarry = false;
        this.envDecayDisable = false;
        this.envDecayLoopEnable = false;
    }
this.clockLengthCounter = function() {
        if (this.lengthCounterEnable && this.lengthCounter > 0){
            this.lengthCounter--;
            if (this.lengthCounter === 0) {
                this.updateSampleValue();
            }
        }
    }
this.clockEnvDecay = function() {
        if (this.envReset) {
            // Reset envelope:
            this.envReset = false;
            this.envDecayCounter = this.envDecayRate + 1;
            this.envVolume = 0xF;
        }else if ((--this.envDecayCounter) <= 0) {
            // Normal handling:
            this.envDecayCounter = this.envDecayRate + 1;
            if (this.envVolume>0) {
                this.envVolume--;
            }else{
                this.envVolume = this.envDecayLoopEnable ? 0xF : 0;
            }
        }

        this.masterVolume = this.envDecayDisable ? this.envDecayRate : this.envVolume;
        this.updateSampleValue();
    }
this.clockSweep = function() {
        if (--this.sweepCounter<=0) {

            this.sweepCounter = this.sweepCounterMax + 1;
            if (this.sweepActive && this.sweepShiftAmount>0 && this.progTimerMax>7) {

                // Calculate result from shifter:
                this.sweepCarry = false;
                if (this.sweepMode===0) {
                    this.progTimerMax += (this.progTimerMax>>this.sweepShiftAmount);
                    if (this.progTimerMax > 4095) {
                        this.progTimerMax = 4095;
                        this.sweepCarry = true;
                    }
                }else{
                    this.progTimerMax = this.progTimerMax - ((this.progTimerMax>>this.sweepShiftAmount)-(this.sqr1?1:0));
                }
            }
        }

        if (this.updateSweepPeriod) {
            this.updateSweepPeriod = false;
            this.sweepCounter = this.sweepCounterMax + 1;
        }
    }
this.updateSampleValue = function() {
        if (this.isEnabled && this.lengthCounter>0 && this.progTimerMax>7) {

            if (this.sweepMode===0 && (this.progTimerMax + (this.progTimerMax>>this.sweepShiftAmount)) > 4095) {
            //if (this.sweepCarry) {
                this.sampleValue = 0;
            }else{
                this.sampleValue = this.masterVolume*this.dutyLookup[(this.dutyMode<<3)+this.squareCounter];
            }
        }else{
            this.sampleValue = 0;
        }
    }
this.writeReg = function(address, value){
        var addrAdd = (this.sqr1?0:4);
        if (address === 0x4000 + addrAdd) {
            // Volume/Envelope decay:
            this.envDecayDisable = ((value&0x10) !== 0);
            this.envDecayRate = value & 0xF;
            this.envDecayLoopEnable = ((value&0x20) !== 0);
            this.dutyMode = (value>>6)&0x3;
            this.lengthCounterEnable = ((value&0x20)===0);
            this.masterVolume = this.envDecayDisable?this.envDecayRate:this.envVolume;
            this.updateSampleValue();

        }
        else if (address === 0x4001+addrAdd) {
            // Sweep:
            this.sweepActive = ((value&0x80) !== 0);
            this.sweepCounterMax = ((value>>4)&7);
            this.sweepMode = (value>>3)&1;
            this.sweepShiftAmount = value&7;
            this.updateSweepPeriod = true;
        }
        else if (address === 0x4002+addrAdd){
            // Programmable timer:
            this.progTimerMax &= 0x700;
            this.progTimerMax |= value;
        }
        else if (address === 0x4003+addrAdd) {
            // Programmable timer, length counter
            this.progTimerMax &= 0xFF;
            this.progTimerMax |= ((value&0x7)<<8);

            if (this.isEnabled){
                this.lengthCounter = this.papu.getLengthMax(value&0xF8);
            }

            this.envReset  = true;
        }
    }
this.setEnabled = function(value) {
        this.isEnabled = value;
        if (!value) {
            this.lengthCounter = 0;
        }
        this.updateSampleValue();
    }
this.getLengthStatus = function() {
        return ((this.lengthCounter === 0 || !this.isEnabled) ? 0 : 1);
    }
    this.papu = papu;

    this.dutyLookup = [
         0, 1, 0, 0, 0, 0, 0, 0,
         0, 1, 1, 0, 0, 0, 0, 0,
         0, 1, 1, 1, 1, 0, 0, 0,
         1, 0, 0, 1, 1, 1, 1, 1
    ];
    this.impLookup = [
         1,-1, 0, 0, 0, 0, 0, 0,
         1, 0,-1, 0, 0, 0, 0, 0,
         1, 0, 0, 0,-1, 0, 0, 0,
        -1, 0, 1, 0, 0, 0, 0, 0
    ];

    this.sqr1 = square1;
    this.isEnabled = null;
    this.lengthCounterEnable = null;
    this.sweepActive = null;
    this.envDecayDisable = null;
    this.envDecayLoopEnable = null;
    this.envReset = null;
    this.sweepCarry = null;
    this.updateSweepPeriod = null;

    this.progTimerCount = null;
    this.progTimerMax = null;
    this.lengthCounter = null;
    this.squareCounter = null;
    this.sweepCounter = null;
    this.sweepCounterMax = null;
    this.sweepMode = null;
    this.sweepShiftAmount = null;
    this.envDecayRate = null;
    this.envDecayCounter = null;
    this.envVolume = null;
    this.masterVolume = null;
    this.dutyMode = null;
    this.sweepResult = null;
    this.sampleValue = null;
    this.vol = null;

    this.reset();
};