module.exports = JSNES_PAPU_ChannelDM
var JSNES_CPU_OpData = require('./JSNES_CPU_OpData.js')
var JSNES_CPU = require('./JSNES_CPU.js')
var JSNES_Keyboard = require('./JSNES_Keyboard.js')
var JSNES_PAPU_ChannelNoise = require('./JSNES_PAPU_ChannelNoise.js')
var JSNES_PAPU_ChannelTriangle = require('./JSNES_PAPU_ChannelTriangle.js')
var JSNES_PAPU_ChannelSquare = require('./JSNES_PAPU_ChannelSquare.js')
var JSNES_PAPU = require('./JSNES_PAPU.js')
var JSNES_PPU_NameTable = require('./JSNES_PPU_NameTable.js')
var JSNES_PPU_PaletteTable = require('./JSNES_PPU_PaletteTable.js')
var JSNES_PPU_Tile = require('./JSNES_PPU_Tile.js')
var JSNES_PPU = require('./JSNES_PPU.js')
var JSNES_Utils = require('./JSNES_Utils.js')()
var JSNES_ROM = require('./JSNES_ROM.js')
 
function JSNES_PAPU_ChannelDM(papu) {
  if (!(this instanceof JSNES_PAPU_ChannelDM)) return new JSNES_PAPU.ChannelDM(papu)
this.clockDmc = function() {

        // Only alter DAC value if the sample buffer has data:
        if(this.hasSample) {

            if ((this.data & 1) === 0) {

                // Decrement delta:
                if(this.deltaCounter>0) {
                    this.deltaCounter--;
                }
            }
            else {
                // Increment delta:
                if (this.deltaCounter < 63) {
                    this.deltaCounter++;
                }
            }

            // Update sample value:
            this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0;

            // Update shift register:
            this.data >>= 1;

        }

        this.dmaCounter--;
        if (this.dmaCounter <= 0) {

            // No more sample bits.
            this.hasSample = false;
            this.endOfSample();
            this.dmaCounter = 8;

        }

        if (this.irqGenerated) {
            this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL);
        }

    }
this.endOfSample = function() {
        if (this.playLengthCounter === 0 && this.playMode === this.MODE_LOOP) {

            // Start from beginning of sample:
            this.playAddress = this.playStartAddress;
            this.playLengthCounter = this.playLength;

        }

        if (this.playLengthCounter > 0) {

            // Fetch next sample:
            this.nextSample();

            if (this.playLengthCounter === 0) {

                // Last byte of sample fetched, generate IRQ:
                if (this.playMode === this.MODE_IRQ) {

                    // Generate IRQ:
                    this.irqGenerated = true;

                }

            }

        }

    }
this.nextSample = function() {
        // Fetch byte:
        this.data = this.papu.nes.mmap.load(this.playAddress);
        this.papu.nes.cpu.haltCycles(4);

        this.playLengthCounter--;
        this.playAddress++;
        if (this.playAddress > 0xFFFF) {
            this.playAddress = 0x8000;
        }

        this.hasSample = true;
    }
this.writeReg = function(address, value) {
        if (address === 0x4010) {

            // Play mode, DMA Frequency
            if ((value >> 6) === 0) {
                this.playMode = this.MODE_NORMAL;
            }
            else if (((value >> 6) & 1) === 1) {
                this.playMode = this.MODE_LOOP;
            }
            else if ((value >> 6) === 2) {
                this.playMode = this.MODE_IRQ;
            }

            if ((value & 0x80) === 0) {
                this.irqGenerated = false;
            }

            this.dmaFrequency = this.papu.getDmcFrequency(value & 0xF);

        }
        else if (address === 0x4011) {

            // Delta counter load register:
            this.deltaCounter = (value >> 1) & 63;
            this.dacLsb = value & 1;
            this.sample = ((this.deltaCounter << 1) + this.dacLsb); // update sample value

        }
        else if (address === 0x4012) {

            // DMA address load register
            this.playStartAddress = (value << 6) | 0x0C000;
            this.playAddress = this.playStartAddress;
            this.reg4012 = value;

        }
        else if (address === 0x4013) {

            // Length of play code
            this.playLength = (value << 4) + 1;
            this.playLengthCounter = this.playLength;
            this.reg4013 = value;

        }
        else if (address === 0x4015) {

            // DMC/IRQ Status
            if (((value >> 4) & 1) === 0) {
                // Disable:
                this.playLengthCounter = 0;
            }
            else {
                // Restart:
                this.playAddress = this.playStartAddress;
                this.playLengthCounter = this.playLength;
            }
            this.irqGenerated = false;
        }
    }
this.setEnabled = function(value) {
        if ((!this.isEnabled) && value) {
            this.playLengthCounter = this.playLength;
        }
        this.isEnabled = value;
    }
this.getLengthStatus = function(){
        return ((this.playLengthCounter === 0 || !this.isEnabled) ? 0 : 1);
    }
this.getIrqStatus = function(){
        return (this.irqGenerated ? 1 : 0);
    }
this.reset = function(){
        this.isEnabled = false;
        this.irqGenerated = false;
        this.playMode = this.MODE_NORMAL;
        this.dmaFrequency = 0;
        this.dmaCounter = 0;
        this.deltaCounter = 0;
        this.playStartAddress = 0;
        this.playAddress = 0;
        this.playLength = 0;
        this.playLengthCounter = 0;
        this.sample = 0;
        this.dacLsb = 0;
        this.shiftCounter = 0;
        this.reg4012 = 0;
        this.reg4013 = 0;
        this.data = 0;
    }
    this.papu = papu;

    this.MODE_NORMAL = 0;
    this.MODE_LOOP = 1;
    this.MODE_IRQ = 2;

    this.isEnabled = null;
    this.hasSample = null;
    this.irqGenerated = false;

    this.playMode = null;
    this.dmaFrequency = null;
    this.dmaCounter = null;
    this.deltaCounter = null;
    this.playStartAddress = null;
    this.playAddress = null;
    this.playLength = null;
    this.playLengthCounter = null;
    this.shiftCounter = null;
    this.reg4012 = null;
    this.reg4013 = null;
    this.sample = null;
    this.dacLsb = null;
    this.data = null;

    this.reset();
};