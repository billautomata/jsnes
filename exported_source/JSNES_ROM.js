module.exports = JSNES_ROM
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
var JSNES_Utils = require('./JSNES_Utils.js')()
 
// var JSNES = {}
// var JSNES_Mappers = {};

// module.exports = JSNES_Mappers_0

function JSNES_Mappers_0(nes) {
    if (!(this instanceof JSNES_Mappers_0)) return new JSNES_Mappers_0(nes)
    this.nes = nes;

    this.reset = function() {
        this.joy1StrobeState = 0;
        this.joy2StrobeState = 0;
        this.joypadLastWrite = 0;

        this.mousePressed = false;
        this.mouseX = null;
        this.mouseY = null;
    }

    this.write = function(address, value) {
        if (address < 0x2000) {
            // Mirroring of RAM:
            this.nes.cpu.mem[address & 0x7FF] = value;

        }
        else if (address > 0x4017) {
            this.nes.cpu.mem[address] = value;
            if (address >= 0x6000 && address < 0x8000) {
                // Write to SaveRAM. Store in file:
                // TODO: not yet
                //if(this.nes.rom!=null)
                //    this.nes.rom.writeBatteryRam(address,value);
            }
        }
        else if (address > 0x2007 && address < 0x4000) {
            this.regWrite(0x2000 + (address & 0x7), value);
        }
        else {
            this.regWrite(address, value);
        }
    }
    this.writelow = function(address, value) {
        if (address < 0x2000) {
            // Mirroring of RAM:
            this.nes.cpu.mem[address & 0x7FF] = value;
        }
        else if (address > 0x4017) {
            this.nes.cpu.mem[address] = value;
        }
        else if (address > 0x2007 && address < 0x4000) {
            this.regWrite(0x2000 + (address & 0x7), value);
        }
        else {
            this.regWrite(address, value);
        }
    }
    this.load = function(address) {
        // Wrap around:
        address &= 0xFFFF;

        // Check address range:
        if (address > 0x4017) {
            // ROM:
            return this.nes.cpu.mem[address];
        }
        else if (address >= 0x2000) {
            // I/O Ports.
            return this.regLoad(address);
        }
        else {
            // RAM (mirrored)
            return this.nes.cpu.mem[address & 0x7FF];
        }
    }
    this.regLoad = function(address) {
        switch (address >> 12) { // use fourth nibble (0xF000)
            case 0:
                break;

            case 1:
                break;

            case 2:
                // Fall through to case 3
            case 3:
                // PPU Registers
                switch (address & 0x7) {
                    case 0x0:
                        // 0x2000:
                        // PPU Control Register 1.
                        // (the value is stored both
                        // in main memory and in the
                        // PPU as flags):
                        // (not in the real NES)
                        return this.nes.cpu.mem[0x2000];

                    case 0x1:
                        // 0x2001:
                        // PPU Control Register 2.
                        // (the value is stored both
                        // in main memory and in the
                        // PPU as flags):
                        // (not in the real NES)
                        return this.nes.cpu.mem[0x2001];

                    case 0x2:
                        // 0x2002:
                        // PPU Status Register.
                        // The value is stored in
                        // main memory in addition
                        // to as flags in the PPU.
                        // (not in the real NES)
                        return this.nes.ppu.readStatusRegister();

                    case 0x3:
                        return 0;

                    case 0x4:
                        // 0x2004:
                        // Sprite Memory read.
                        return this.nes.ppu.sramLoad();
                    case 0x5:
                        return 0;

                    case 0x6:
                        return 0;

                    case 0x7:
                        // 0x2007:
                        // VRAM read:
                        return this.nes.ppu.vramLoad();
                }
                break;
            case 4:
                // Sound+Joypad registers
                switch (address - 0x4015) {
                    case 0:
                        // 0x4015:
                        // Sound channel enable, DMC Status
                        return this.nes.papu.readReg(address);

                    case 1:
                        // 0x4016:
                        // Joystick 1 + Strobe
                        return this.joy1Read();

                    case 2:
                        // 0x4017:
                        // Joystick 2 + Strobe
                        if (this.mousePressed) {

                            // Check for white pixel nearby:
                            var sx = Math.max(0, this.mouseX - 4);
                            var ex = Math.min(256, this.mouseX + 4);
                            var sy = Math.max(0, this.mouseY - 4);
                            var ey = Math.min(240, this.mouseY + 4);
                            var w = 0;

                            for (var y=sy; y<ey; y++) {
                                for (var x=sx; x<ex; x++) {

                                    if (this.nes.ppu.buffer[(y<<8)+x] == 0xFFFFFF) {
                                        w |= 0x1<<3;
                                        console.debug("Clicked on white!");
                                        break;
                                    }
                                }
                            }

                            w |= (this.mousePressed?(0x1<<4):0);
                            return (this.joy2Read()|w) & 0xFFFF;
                        }
                        else {
                            return this.joy2Read();
                        }

                }
                break;
        }
        return 0;
    }


    this.regWrite = function(address, value) {
            switch (address) {
                case 0x2000:
                    // PPU Control register 1
                    this.nes.cpu.mem[address] = value;
                    this.nes.ppu.updateControlReg1(value);
                    break;

                case 0x2001:
                    // PPU Control register 2
                    this.nes.cpu.mem[address] = value;
                    this.nes.ppu.updateControlReg2(value);
                    break;

                case 0x2003:
                    // Set Sprite RAM address:
                    this.nes.ppu.writeSRAMAddress(value);
                    break;

                case 0x2004:
                    // Write to Sprite RAM:
                    this.nes.ppu.sramWrite(value);
                    break;

                case 0x2005:
                    // Screen Scroll offsets:
                    this.nes.ppu.scrollWrite(value);
                    break;

                case 0x2006:
                    // Set VRAM address:
                    this.nes.ppu.writeVRAMAddress(value);
                    break;

                case 0x2007:
                    // Write to VRAM:
                    this.nes.ppu.vramWrite(value);
                    break;

                case 0x4014:
                    // Sprite Memory DMA Access
                    this.nes.ppu.sramDMA(value);
                    break;

                case 0x4015:
                    // Sound Channel Switch, DMC Status
                    this.nes.papu.writeReg(address, value);
                    break;

                case 0x4016:
                    // Joystick 1 + Strobe
                    if ((value&1) === 0 && (this.joypadLastWrite&1) === 1) {
                        this.joy1StrobeState = 0;
                        this.joy2StrobeState = 0;
                    }
                    this.joypadLastWrite = value;
                    break;

                case 0x4017:
                    // Sound channel frame sequencer:
                    this.nes.papu.writeReg(address, value);
                    break;

                default:
                    // Sound registers
                    ////System.out.println("write to sound reg");
                    if (address >= 0x4000 && address <= 0x4017) {
                        this.nes.papu.writeReg(address,value);
                    }

            }
        }


            this.joy1Read = function() {
                var ret;

                switch (this.joy1StrobeState) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        ret = this.nes.keyboard.state1[this.joy1StrobeState];
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        ret = 0;
                        break;
                    case 19:
                        ret = 1;
                        break;
                    default:
                        ret = 0;
                }

                this.joy1StrobeState++;
                if (this.joy1StrobeState == 24) {
                    this.joy1StrobeState = 0;
                }

                return ret;
            }

            this.joy2Read = function() {
                var ret;

                switch (this.joy2StrobeState) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        ret = this.nes.keyboard.state2[this.joy2StrobeState];
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        ret = 0;
                        break;
                    case 19:
                        ret = 1;
                        break;
                    default:
                        ret = 0;
                }

                this.joy2StrobeState++;
                if (this.joy2StrobeState == 24) {
                    this.joy2StrobeState = 0;
                }

                return ret;
              }

            this.loadROM = function() {
                if (!this.nes.rom.valid || this.nes.rom.romCount < 1) {
                    console.log("NoMapper: Invalid ROM! Unable to load.");
                    return;
                }

                // Load ROM into memory:
                this.loadPRGROM();

                // Load CHR-ROM:
                this.loadCHRROM();

                // Load Battery RAM (if present):
                this.loadBatteryRam();

                // Reset IRQ:
                //nes.getCpu().doResetInterrupt();
                this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
            }

            this.loadPRGROM = function() {
                if (this.nes.rom.romCount > 1) {
                    // Load the two first banks into memory.
                    this.loadRomBank(0, 0x8000);
                    this.loadRomBank(1, 0xC000);
                }
                else {
                    // Load the one bank into both memory locations:
                    this.loadRomBank(0, 0x8000);
                    this.loadRomBank(0, 0xC000);
                }
            }

            this.loadCHRROM = function() {
                ////System.out.println("Loading CHR ROM..");
                if (this.nes.rom.vromCount > 0) {
                    if (this.nes.rom.vromCount == 1) {
                        this.loadVromBank(0,0x0000);
                        this.loadVromBank(0,0x1000);
                    }
                    else {
                        this.loadVromBank(0,0x0000);
                        this.loadVromBank(1,0x1000);
                    }
                }
                else {
                    //System.out.println("There aren't any CHR-ROM banks..");
                }
            }

            this.loadBatteryRam = function() {
                if (this.nes.rom.batteryRam) {
                    var ram = this.nes.rom.batteryRam;
                    if (ram !== null && ram.length == 0x2000) {
                        // Load Battery RAM into memory:
                        JSNES_Utils.copyArrayElements(ram, 0, this.nes.cpu.mem, 0x6000, 0x2000);
                    }
                }
            }

            this.loadRomBank = function(bank, address) {
                // Loads a ROM bank into the specified address.
                bank %= this.nes.rom.romCount;
                //var data = this.nes.rom.rom[bank];
                //cpuMem.write(address,data,data.length);
                JSNES_Utils.copyArrayElements(this.nes.rom.rom[bank], 0, this.nes.cpu.mem, address, 16384);
            }

            this.loadVromBank = function(bank, address) {
                if (this.nes.rom.vromCount === 0) {
                    return;
                }
                this.nes.ppu.triggerRendering();

                JSNES_Utils.copyArrayElements(this.nes.rom.vrom[bank % this.nes.rom.vromCount],
                    0, this.nes.ppu.vramMem, address, 4096);

                var vromTile = this.nes.rom.vromTile[bank % this.nes.rom.vromCount];
                JSNES_Utils.copyArrayElements(vromTile, 0, this.nes.ppu.ptTile,address >> 4, 256);
            }

            this.load32kRomBank = function(bank, address) {
                this.loadRomBank((bank*2) % this.nes.rom.romCount, address);
                this.loadRomBank((bank*2+1) % this.nes.rom.romCount, address+16384);
            }

            this.load8kVromBank = function(bank4kStart, address) {
                if (this.nes.rom.vromCount === 0) {
                    return;
                }
                this.nes.ppu.triggerRendering();

                this.loadVromBank((bank4kStart) % this.nes.rom.vromCount, address);
                this.loadVromBank((bank4kStart + 1) % this.nes.rom.vromCount,
                        address + 4096);
            }

            this.load1kVromBank = function(bank1k, address) {
                if (this.nes.rom.vromCount === 0) {
                    return;
                }
                this.nes.ppu.triggerRendering();

                var bank4k = Math.floor(bank1k / 4) % this.nes.rom.vromCount;
                var bankoffset = (bank1k % 4) * 1024;
                JSNES_Utils.copyArrayElements(this.nes.rom.vrom[bank4k], 0,
                    this.nes.ppu.vramMem, bankoffset, 1024);

                // Update tiles:
                var vromTile = this.nes.rom.vromTile[bank4k];
                var baseIndex = address >> 4;
                for (var i = 0; i < 64; i++) {
                    this.nes.ppu.ptTile[baseIndex+i] = vromTile[((bank1k%4) << 6) + i];
                }
            }

            this.load2kVromBank = function(bank2k, address) {
                if (this.nes.rom.vromCount === 0) {
                    return;
                }
                this.nes.ppu.triggerRendering();

                var bank4k = Math.floor(bank2k / 2) % this.nes.rom.vromCount;
                var bankoffset = (bank2k % 2) * 2048;
                JSNES_Utils.copyArrayElements(this.nes.rom.vrom[bank4k], bankoffset,
                    this.nes.ppu.vramMem, address, 2048);

                // Update tiles:
                var vromTile = this.nes.rom.vromTile[bank4k];
                var baseIndex = address >> 4;
                for (var i = 0; i < 128; i++) {
                    this.nes.ppu.ptTile[baseIndex+i] = vromTile[((bank2k%2) << 7) + i];
                }
            }

            this.load8kRomBank = function(bank8k, address) {
                var bank16k = Math.floor(bank8k / 2) % this.nes.rom.romCount;
                var offset = (bank8k % 2) * 8192;

                //this.nes.cpu.mem.write(address,this.nes.rom.rom[bank16k],offset,8192);
                JSNES_Utils.copyArrayElements(this.nes.rom.rom[bank16k], offset,
                          this.nes.cpu.mem, address, 8192);
            }

            this.clockIrqCounter = function() {
                // Does nothing. This is used by the MMC3 mapper.
            }

            this.latchAccess = function(address) {
                // Does nothing. This is used by MMC2.
            }

            this.toJSON = function() {
                return {
                    'joy1StrobeState': this.joy1StrobeState,
                    'joy2StrobeState': this.joy2StrobeState,
                    'joypadLastWrite': this.joypadLastWrite
                };
            }

            this.fromJSON = function(s) {
                this.joy1StrobeState = s.joy1StrobeState;
                this.joy2StrobeState = s.joy2StrobeState;
                this.joypadLastWrite = s.joypadLastWrite;
            }


};

JSNES_Mappers_1 = function(nes) {
    this.nes = nes;
};

JSNES_Mappers_1.prototype = new JSNES_Mappers_0();

JSNES_Mappers_1.prototype.reset = function() {
    new JSNES_Mappers_0().reset.apply(this);

    // 5-bit buffer:
    this.regBuffer = 0;
    this.regBufferCounter = 0;

    // Register 0:
    this.mirroring = 0;
    this.oneScreenMirroring = 0;
    this.prgSwitchingArea = 1;
    this.prgSwitchingSize = 1;
    this.vromSwitchingSize = 0;

    // Register 1:
    this.romSelectionReg0 = 0;

    // Register 2:
    this.romSelectionReg1 = 0;

    // Register 3:
    this.romBankSelect = 0;
};

JSNES_Mappers_1.prototype.write = function(address, value) {
    // Writes to addresses other than MMC registers are handled by NoMapper.
    if (address < 0x8000) {
        new JSNES_Mappers_0().write.apply(this, arguments);
        return;
    }

    // See what should be done with the written value:
    if ((value & 128) !== 0) {

        // Reset buffering:
        this.regBufferCounter = 0;
        this.regBuffer = 0;

        // Reset register:
        if (this.getRegNumber(address) === 0) {

            this.prgSwitchingArea = 1;
            this.prgSwitchingSize = 1;

        }
    }
    else {

        // Continue buffering:
        //regBuffer = (regBuffer & (0xFF-(1<<regBufferCounter))) | ((value & (1<<regBufferCounter))<<regBufferCounter);
        this.regBuffer = (this.regBuffer & (0xFF - (1 << this.regBufferCounter))) | ((value & 1) << this.regBufferCounter);
        this.regBufferCounter++;

        if (this.regBufferCounter == 5) {
            // Use the buffered value:
            this.setReg(this.getRegNumber(address), this.regBuffer);

            // Reset buffer:
            this.regBuffer = 0;
            this.regBufferCounter = 0;
        }
    }
};

JSNES_Mappers_1.prototype.setReg = function(reg, value) {
    var tmp;

    switch (reg) {
        case 0:
            // Mirroring:
            tmp = value & 3;
            if (tmp !== this.mirroring) {
                // Set mirroring:
                this.mirroring = tmp;
                if ((this.mirroring & 2) === 0) {
                    // SingleScreen mirroring overrides the other setting:
                    this.nes.ppu.setMirroring(
                        this.nes.rom.SINGLESCREEN_MIRRORING);
                }
                // Not overridden by SingleScreen mirroring.
                else if ((this.mirroring & 1) !== 0) {
                    this.nes.ppu.setMirroring(
                        this.nes.rom.HORIZONTAL_MIRRORING
                    );
                }
                else {
                    this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
                }
            }

            // PRG Switching Area;
            this.prgSwitchingArea = (value >> 2) & 1;

            // PRG Switching Size:
            this.prgSwitchingSize = (value >> 3) & 1;

            // VROM Switching Size:
            this.vromSwitchingSize = (value >> 4) & 1;

            break;

        case 1:
            // ROM selection:
            this.romSelectionReg0 = (value >> 4) & 1;

            // Check whether the cart has VROM:
            if (this.nes.rom.vromCount > 0) {

                // Select VROM bank at 0x0000:
                if (this.vromSwitchingSize === 0) {

                    // Swap 8kB VROM:
                    if (this.romSelectionReg0 === 0) {
                        this.load8kVromBank((value & 0xF), 0x0000);
                    }
                    else {
                        this.load8kVromBank(
                            Math.floor(this.nes.rom.vromCount / 2) +
                                (value & 0xF),
                            0x0000
                        );
                    }

                }
                else {
                    // Swap 4kB VROM:
                    if (this.romSelectionReg0 === 0) {
                        this.loadVromBank((value & 0xF), 0x0000);
                    }
                    else {
                        this.loadVromBank(
                            Math.floor(this.nes.rom.vromCount / 2) +
                                (value & 0xF),
                            0x0000
                        );
                    }
                }
            }

            break;

        case 2:
            // ROM selection:
            this.romSelectionReg1 = (value >> 4) & 1;

            // Check whether the cart has VROM:
            if (this.nes.rom.vromCount > 0) {

                // Select VROM bank at 0x1000:
                if (this.vromSwitchingSize === 1) {
                    // Swap 4kB of VROM:
                    if (this.romSelectionReg1 === 0) {
                        this.loadVromBank((value & 0xF), 0x1000);
                    }
                    else {
                        this.loadVromBank(
                            Math.floor(this.nes.rom.vromCount / 2) +
                                (value & 0xF),
                            0x1000
                        );
                    }
                }
            }
            break;

        default:
            // Select ROM bank:
            // -------------------------
            tmp = value & 0xF;
            var bank;
            var baseBank = 0;

            if (this.nes.rom.romCount >= 32) {
                // 1024 kB cart
                if (this.vromSwitchingSize === 0) {
                    if (this.romSelectionReg0 === 1) {
                        baseBank = 16;
                    }
                }
                else {
                    baseBank = (this.romSelectionReg0
                                | (this.romSelectionReg1 << 1)) << 3;
                }
            }
            else if (this.nes.rom.romCount >= 16) {
                // 512 kB cart
                if (this.romSelectionReg0 === 1) {
                    baseBank = 8;
                }
            }

            if (this.prgSwitchingSize === 0) {
                // 32kB
                bank = baseBank + (value & 0xF);
                this.load32kRomBank(bank, 0x8000);
            }
            else {
                // 16kB
                bank = baseBank * 2 + (value & 0xF);
                if (this.prgSwitchingArea === 0) {
                    this.loadRomBank(bank, 0xC000);
                }
                else {
                    this.loadRomBank(bank, 0x8000);
                }
            }
    }
};

// Returns the register number from the address written to:
JSNES_Mappers_1.prototype.getRegNumber = function(address) {
    if (address >= 0x8000 && address <= 0x9FFF) {
        return 0;
    }
    else if (address >= 0xA000 && address <= 0xBFFF) {
        return 1;
    }
    else if (address >= 0xC000 && address <= 0xDFFF) {
        return 2;
    }
    else {
        return 3;
    }
};

JSNES_Mappers_1.prototype.loadROM = function(rom) {
    if (!this.nes.rom.valid) {
        alert("MMC1: Invalid ROM! Unable to load.");
        return;
    }

    // Load PRG-ROM:
    this.loadRomBank(0, 0x8000);                         //   First ROM bank..
    this.loadRomBank(this.nes.rom.romCount - 1, 0xC000); // ..and last ROM bank.

    // Load CHR-ROM:
    this.loadCHRROM();

    // Load Battery RAM (if present):
    this.loadBatteryRam();

    // Do Reset-Interrupt:
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};

JSNES_Mappers_1.prototype.switchLowHighPrgRom = function(oldSetting) {
    // not yet.
};

JSNES_Mappers_1.prototype.switch16to32 = function() {
    // not yet.
};

JSNES_Mappers_1.prototype.switch32to16 = function() {
    // not yet.
};

JSNES_Mappers_1.prototype.toJSON = function() {
    var s = JSNES_Mappers[0].prototype.toJSON.apply(this);
    s.mirroring = this.mirroring;
    s.oneScreenMirroring = this.oneScreenMirroring;
    s.prgSwitchingArea = this.prgSwitchingArea;
    s.prgSwitchingSize = this.prgSwitchingSize;
    s.vromSwitchingSize = this.vromSwitchingSize;
    s.romSelectionReg0 = this.romSelectionReg0;
    s.romSelectionReg1 = this.romSelectionReg1;
    s.romBankSelect = this.romBankSelect;
    s.regBuffer = this.regBuffer;
    s.regBufferCounter = this.regBufferCounter;
    return s;
};

JSNES_Mappers_1.prototype.fromJSON = function(s) {
    JSNES_Mappers[0].prototype.fromJSON.apply(this, s);
    this.mirroring = s.mirroring;
    this.oneScreenMirroring = s.oneScreenMirroring;
    this.prgSwitchingArea = s.prgSwitchingArea;
    this.prgSwitchingSize = s.prgSwitchingSize;
    this.vromSwitchingSize = s.vromSwitchingSize;
    this.romSelectionReg0 = s.romSelectionReg0;
    this.romSelectionReg1 = s.romSelectionReg1;
    this.romBankSelect = s.romBankSelect;
    this.regBuffer = s.regBuffer;
    this.regBufferCounter = s.regBufferCounter;
};
//
JSNES_Mappers_2 = function(nes) {
    this.nes = nes;
};

JSNES_Mappers_2.prototype = new JSNES_Mappers_0();

JSNES_Mappers_2.prototype.write = function(address, value) {
    // Writes to addresses other than MMC registers are handled by NoMapper.
    if (address < 0x8000) {
        new JSNES_Mappers_0().write.apply(this, arguments);
        return;
    }

    else {
        // This is a ROM bank select command.
        // Swap in the given ROM bank at 0x8000:
        this.loadRomBank(value, 0x8000);
    }
};

JSNES_Mappers_2.prototype.loadROM = function(rom) {
    if (!this.nes.rom.valid) {
        alert("UNROM: Invalid ROM! Unable to load.");
        return;
    }

    // Load PRG-ROM:
    this.loadRomBank(0, 0x8000);
    this.loadRomBank(this.nes.rom.romCount - 1, 0xC000);

    // Load CHR-ROM:
    this.loadCHRROM();

    // Do Reset-Interrupt:
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};
//
//
JSNES_Mappers_4 = function(nes) {
    this.nes = nes;

    this.CMD_SEL_2_1K_VROM_0000 = 0;
    this.CMD_SEL_2_1K_VROM_0800 = 1;
    this.CMD_SEL_1K_VROM_1000 = 2;
    this.CMD_SEL_1K_VROM_1400 = 3;
    this.CMD_SEL_1K_VROM_1800 = 4;
    this.CMD_SEL_1K_VROM_1C00 = 5;
    this.CMD_SEL_ROM_PAGE1 = 6;
    this.CMD_SEL_ROM_PAGE2 = 7;

    this.command = null;
    this.prgAddressSelect = null;
    this.chrAddressSelect = null;
    this.pageNumber = null;
    this.irqCounter = null;
    this.irqLatchValue = null;
    this.irqEnable = null;
    this.prgAddressChanged = false;
};

JSNES_Mappers_4.prototype = new JSNES_Mappers_0();

JSNES_Mappers_4.prototype.write = function(address, value) {
    // Writes to addresses other than MMC registers are handled by NoMapper.
    if (address < 0x8000) {
        new JSNES_Mappers_0().write.apply(this, arguments);
        return;
    }

    switch (address) {
        case 0x8000:
            // Command/Address Select register
            this.command = value & 7;
            var tmp = (value >> 6) & 1;
            if (tmp != this.prgAddressSelect) {
                this.prgAddressChanged = true;
            }
            this.prgAddressSelect = tmp;
            this.chrAddressSelect = (value >> 7) & 1;
            break;

        case 0x8001:
            // Page number for command
            this.executeCommand(this.command, value);
            break;

        case 0xA000:
            // Mirroring select
            if ((value & 1) !== 0) {
                this.nes.ppu.setMirroring(
                    this.nes.rom.HORIZONTAL_MIRRORING
                );
            }
            else {
                this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
            }
            break;

        case 0xA001:
            // SaveRAM Toggle
            // TODO
            //nes.getRom().setSaveState((value&1)!=0);
            break;

        case 0xC000:
            // IRQ Counter register
            this.irqCounter = value;
            //nes.ppu.mapperIrqCounter = 0;
            break;

        case 0xC001:
            // IRQ Latch register
            this.irqLatchValue = value;
            break;

        case 0xE000:
            // IRQ Control Reg 0 (disable)
            //irqCounter = irqLatchValue;
            this.irqEnable = 0;
            break;

        case 0xE001:
            // IRQ Control Reg 1 (enable)
            this.irqEnable = 1;
            break;

        default:
            // Not a MMC3 register.
            // The game has probably crashed,
            // since it tries to write to ROM..
            // IGNORE.
    }
};

JSNES_Mappers_4.prototype.executeCommand = function(cmd, arg) {
    switch (cmd) {
        case this.CMD_SEL_2_1K_VROM_0000:
            // Select 2 1KB VROM pages at 0x0000:
            if (this.chrAddressSelect === 0) {
                this.load1kVromBank(arg, 0x0000);
                this.load1kVromBank(arg + 1, 0x0400);
            }
            else {
                this.load1kVromBank(arg, 0x1000);
                this.load1kVromBank(arg + 1, 0x1400);
            }
            break;

        case this.CMD_SEL_2_1K_VROM_0800:
            // Select 2 1KB VROM pages at 0x0800:
            if (this.chrAddressSelect === 0) {
                this.load1kVromBank(arg, 0x0800);
                this.load1kVromBank(arg + 1, 0x0C00);
            }
            else {
                this.load1kVromBank(arg, 0x1800);
                this.load1kVromBank(arg + 1, 0x1C00);
            }
            break;

        case this.CMD_SEL_1K_VROM_1000:
            // Select 1K VROM Page at 0x1000:
            if (this.chrAddressSelect === 0) {
                this.load1kVromBank(arg, 0x1000);
            }
            else {
                this.load1kVromBank(arg, 0x0000);
            }
            break;

        case this.CMD_SEL_1K_VROM_1400:
            // Select 1K VROM Page at 0x1400:
            if (this.chrAddressSelect === 0) {
                this.load1kVromBank(arg, 0x1400);
            }
            else {
                this.load1kVromBank(arg, 0x0400);
            }
            break;

        case this.CMD_SEL_1K_VROM_1800:
            // Select 1K VROM Page at 0x1800:
            if (this.chrAddressSelect === 0) {
                this.load1kVromBank(arg, 0x1800);
            }
            else {
                this.load1kVromBank(arg, 0x0800);
            }
            break;

        case this.CMD_SEL_1K_VROM_1C00:
            // Select 1K VROM Page at 0x1C00:
            if (this.chrAddressSelect === 0) {
                this.load1kVromBank(arg, 0x1C00);
            }else {
                this.load1kVromBank(arg, 0x0C00);
            }
            break;

        case this.CMD_SEL_ROM_PAGE1:
            if (this.prgAddressChanged) {
                // Load the two hardwired banks:
                if (this.prgAddressSelect === 0) {
                    this.load8kRomBank(
                        ((this.nes.rom.romCount - 1) * 2),
                        0xC000
                    );
                }
                else {
                    this.load8kRomBank(
                        ((this.nes.rom.romCount - 1) * 2),
                        0x8000
                    );
                }
                this.prgAddressChanged = false;
            }

            // Select first switchable ROM page:
            if (this.prgAddressSelect === 0) {
                this.load8kRomBank(arg, 0x8000);
            }
            else {
                this.load8kRomBank(arg, 0xC000);
            }
            break;

        case this.CMD_SEL_ROM_PAGE2:
            // Select second switchable ROM page:
            this.load8kRomBank(arg, 0xA000);

            // hardwire appropriate bank:
            if (this.prgAddressChanged) {
                // Load the two hardwired banks:
                if (this.prgAddressSelect === 0) {
                    this.load8kRomBank(
                        ((this.nes.rom.romCount - 1) * 2),
                        0xC000
                    );
                }
                else {
                    this.load8kRomBank(
                        ((this.nes.rom.romCount - 1) * 2),
                        0x8000
                    );
                }
                this.prgAddressChanged = false;
            }
    }
};

JSNES_Mappers_4.prototype.loadROM = function(rom) {
    if (!this.nes.rom.valid) {
        alert("MMC3: Invalid ROM! Unable to load.");
        return;
    }

    // Load hardwired PRG banks (0xC000 and 0xE000):
    this.load8kRomBank(((this.nes.rom.romCount - 1) * 2), 0xC000);
    this.load8kRomBank(((this.nes.rom.romCount - 1) * 2) + 1, 0xE000);

    // Load swappable PRG banks (0x8000 and 0xA000):
    this.load8kRomBank(0, 0x8000);
    this.load8kRomBank(1, 0xA000);

    // Load CHR-ROM:
    this.loadCHRROM();

    // Load Battery RAM (if present):
    this.loadBatteryRam();

    // Do Reset-Interrupt:
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};

JSNES_Mappers_4.prototype.clockIrqCounter = function() {
    if (this.irqEnable == 1) {
        this.irqCounter--;
        if (this.irqCounter < 0) {
            // Trigger IRQ:
            //nes.getCpu().doIrq();
            this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
            this.irqCounter = this.irqLatchValue;
        }
    }
};

JSNES_Mappers_4.prototype.toJSON = function() {
    var s = new JSNES_Mappers_0().toJSON.apply(this);
    s.command = this.command;
    s.prgAddressSelect = this.prgAddressSelect;
    s.chrAddressSelect = this.chrAddressSelect;
    s.pageNumber = this.pageNumber;
    s.irqCounter = this.irqCounter;
    s.irqLatchValue = this.irqLatchValue;
    s.irqEnable = this.irqEnable;
    s.prgAddressChanged = this.prgAddressChanged;
    return s;
};

JSNES_Mappers_4.prototype.fromJSON = function(s) {
    new JSNES_Mappers_0().fromJSON.apply(this, s);
    this.command = s.command;
    this.prgAddressSelect = s.prgAddressSelect;
    this.chrAddressSelect = s.chrAddressSelect;
    this.pageNumber = s.pageNumber;
    this.irqCounter = s.irqCounter;
    this.irqLatchValue = s.irqLatchValue;
    this.irqEnable = s.irqEnable;
    this.prgAddressChanged = s.prgAddressChanged;
};

function JSNES_ROM(nes) {
    if (!(this instanceof JSNES_ROM)) return new JSNES_ROM()
this.VERTICAL_MIRRORING = 0
this.HORIZONTAL_MIRRORING = 1
this.FOURSCREEN_MIRRORING = 2
this.SINGLESCREEN_MIRRORING = 3
this.SINGLESCREEN_MIRRORING2 = 4
this.SINGLESCREEN_MIRRORING3 = 5
this.SINGLESCREEN_MIRRORING4 = 6
this.CHRROM_MIRRORING = 7
this.header = null
this.rom = null
this.vrom = null
this.vromTile = null
this.romCount = null
this.vromCount = null
this.mirroring = null
this.batteryRam = null
this.trainer = null
this.fourScreen = null
this.mapperType = null
this.valid = false
this.load = function(data) {
        var i, j, v;

        if (data.indexOf("NES\x1a") === -1) {

            console.log("Not a valid NES ROM.");
            process.exit(0)
            return;
        }
        this.header = new Array(16);
        for (i = 0; i < 16; i++) {
            this.header[i] = data.charCodeAt(i) & 0xFF;
        }
        this.romCount = this.header[4];
        this.vromCount = this.header[5]*2; // Get the number of 4kB banks, not 8kB
        this.mirroring = ((this.header[6] & 1) !== 0 ? 1 : 0);
        this.batteryRam = (this.header[6] & 2) !== 0;
        this.trainer = (this.header[6] & 4) !== 0;
        this.fourScreen = (this.header[6] & 8) !== 0;
        this.mapperType = (this.header[6] >> 4) | (this.header[7] & 0xF0);
        /* TODO
        if (this.batteryRam)
            this.loadBatteryRam();*/
        // Check whether byte 8-15 are zero's:
        var foundError = false;
        for (i=8; i<16; i++) {
            if (this.header[i] !== 0) {
                foundError = true;
                break;
            }
        }
        if (foundError) {
            this.mapperType &= 0xF; // Ignore byte 7
        }
        // Load PRG-ROM banks:
        this.rom = new Array(this.romCount);
        var offset = 16;
        for (i=0; i < this.romCount; i++) {
            this.rom[i] = new Array(16384);
            for (j=0; j < 16384; j++) {
                if (offset+j >= data.length) {
                    break;
                }
                this.rom[i][j] = data.charCodeAt(offset + j) & 0xFF;
            }
            offset += 16384;
        }
        // Load CHR-ROM banks:
        this.vrom = new Array(this.vromCount);
        for (i=0; i < this.vromCount; i++) {
            this.vrom[i] = new Array(4096);
            for (j=0; j < 4096; j++) {
                if (offset+j >= data.length){
                    break;
                }
                this.vrom[i][j] = data.charCodeAt(offset + j) & 0xFF;
            }
            offset += 4096;
        }

        // Create VROM tiles:
        this.vromTile = new Array(this.vromCount);
        for (i=0; i < this.vromCount; i++) {
            this.vromTile[i] = new Array(256);
            for (j=0; j < 256; j++) {
                this.vromTile[i][j] = new JSNES_PPU_Tile();
            }
        }

        // Convert CHR-ROM banks to tiles:
        var tileIndex;
        var leftOver;
        for (v=0; v < this.vromCount; v++) {
            for (i=0; i < 4096; i++) {
                tileIndex = i >> 4;
                leftOver = i % 16;
                if (leftOver < 8) {
                    this.vromTile[v][tileIndex].setScanline(
                        leftOver,
                        this.vrom[v][i],
                        this.vrom[v][i+8]
                    );
                }
                else {
                    this.vromTile[v][tileIndex].setScanline(
                        leftOver-8,
                        this.vrom[v][i-8],
                        this.vrom[v][i]
                    );
                }
            }
        }

        this.valid = true;
    }
this.getMirroringType = function() {
        if (this.fourScreen) {
            return this.FOURSCREEN_MIRRORING;
        }
        if (this.mirroring === 0) {
            return this.HORIZONTAL_MIRRORING;
        }
        return this.VERTICAL_MIRRORING;
    }
this.getMapperName = function() {
        if (this.mapperType >= 0 && this.mapperType < this.mapperName.length) {
            return this.mapperName[this.mapperType];
        }
        return "Unknown Mapper, "+this.mapperType;
    }
this.mapperSupported = function() {
      return true
        // return typeof JSNES_Mappers[this.mapperType] !== 'undefined';
    }
this.createMapper = function() {
        if (this.mapperSupported() || true) {
            // var m = new JSNES_Mappers[this.mapperType](this.nes);
            var mapper
            if(this.mapperType === 0){
              mapper = new JSNES_Mappers_0(this.nes)
            } else if(this.mapperType === 1){
              mapper = new JSNES_Mappers_1(this.nes)
            } else if(this.mapperType === 2){
              mapper = new JSNES_Mappers_2(this.nes)
            } else if(this.mapperType === 4){
              mapper = new JSNES_Mappers_4(this.nes)
            }

            // var m = new JSNES_Mappers_0(this.nes)
            console.log('mapper type', this.mapperType)
            return mapper
        }
        else {
            console.log("This ROM uses a mapper not supported by JSNES: "+this.getMapperName()+"("+this.mapperType+")");
            return null;
        }
    }
    this.nes = nes;

    this.mapperName = new Array(92);

    for (var i=0;i<92;i++) {
        this.mapperName[i] = "Unknown Mapper";
    }
    this.mapperName[ 0] = "Direct Access";
    this.mapperName[ 1] = "Nintendo MMC1";
    this.mapperName[ 2] = "UNROM";
    this.mapperName[ 3] = "CNROM";
    this.mapperName[ 4] = "Nintendo MMC3";
    this.mapperName[ 5] = "Nintendo MMC5";
    this.mapperName[ 6] = "FFE F4xxx";
    this.mapperName[ 7] = "AOROM";
    this.mapperName[ 8] = "FFE F3xxx";
    this.mapperName[ 9] = "Nintendo MMC2";
    this.mapperName[10] = "Nintendo MMC4";
    this.mapperName[11] = "Color Dreams Chip";
    this.mapperName[12] = "FFE F6xxx";
    this.mapperName[15] = "100-in-1 switch";
    this.mapperName[16] = "Bandai chip";
    this.mapperName[17] = "FFE F8xxx";
    this.mapperName[18] = "Jaleco SS8806 chip";
    this.mapperName[19] = "Namcot 106 chip";
    this.mapperName[20] = "Famicom Disk System";
    this.mapperName[21] = "Konami VRC4a";
    this.mapperName[22] = "Konami VRC2a";
    this.mapperName[23] = "Konami VRC2a";
    this.mapperName[24] = "Konami VRC6";
    this.mapperName[25] = "Konami VRC4b";
    this.mapperName[32] = "Irem G-101 chip";
    this.mapperName[33] = "Taito TC0190/TC0350";
    this.mapperName[34] = "32kB ROM switch";

    this.mapperName[64] = "Tengen RAMBO-1 chip";
    this.mapperName[65] = "Irem H-3001 chip";
    this.mapperName[66] = "GNROM switch";
    this.mapperName[67] = "SunSoft3 chip";
    this.mapperName[68] = "SunSoft4 chip";
    this.mapperName[69] = "SunSoft5 FME-7 chip";
    this.mapperName[71] = "Camerica chip";
    this.mapperName[78] = "Irem 74HC161/32-based";
    this.mapperName[91] = "Pirate HK-SF3 chip";
};