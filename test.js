var jpeg = require('jpeg-js');
var fs = require('fs')

var nes = require('./exported_source/JSNES.js')({
  ui: {
    updateStatus: function(d){ console.log(d) },
    writeFrame: function(){}
  }
})

// var state = JSON.parse(JSON.parse(fs.readFileSync('./runs/test.json').toString('utf-8')).nes_state)
// state.romData =
// state.romData = fs.readFileSync('./local-roms/Super Mario Bros. (JU) (PRG0) [!].nes').toString('ascii')
// console.log('rom length', state.romData.length)

// var romData = fs.readFileSync('./local-roms/Mega Man (U).nes', 'binary').toString('utf-8')
// var romData = fs.readFileSync('./local-roms/Super Mario Bros. 3 (U) (PRG1) [!].nes', 'binary').toString('utf-8')
// var romData = fs.readFileSync('./local-roms/Tetris (U) [!].nes', 'binary').toString('utf-8')
// var romData = fs.readFileSync('./local-roms/Super Mario Bros. (JU) (PRG0) [!].nes', 'binary').toString('utf-8')
// var romData = fs.readFileSync('./local-roms/Mario Bros. (JU) [!].nes', 'binary').toString('utf-8')
var romData = fs.readFileSync('./local-roms/Contra (U).nes', 'binary').toString('utf-8')

// nope
// var romData = fs.readFileSync('./local-roms/Metroid (U).nes', 'binary').toString('utf-8')       // nope
// var romData = fs.readFileSync('./local-roms/Ninja Gaiden (U).nes', 'binary').toString('utf-8')  // nope

// nes.fromJSON(state)
// nes.fromJSON(JSON.parse(fs.readFileSync('./runs/server_side.json')))

nes.loadRom(romData)
nes.reloadRom()

var test = []
for(var i = 0; i < 1500; i++){
  nes.frame()
  if(i === 300 || i=== 500){
    nes.keyboard.state1[3] = 0x41
  } else {
    nes.keyboard.state1[3] = 0x40
  }
  process.stdout.write('.')
}

// fs.writeFileSync('./runs/server_side.json', JSON.stringify(nes.toJSON()))

test.push(nes.ppu.buffer.slice(0,256*240))

test.forEach(function(m){
  // console.log(m.join('\t'))
  var x_pos = 0
  var y_pos = 0
  var pixel_buffer = new Buffer(m.length*4)
  var pixel_buffer_idx = 0
  m.forEach(function(v){
    // console.log(v)
    pixel_buffer[pixel_buffer_idx] = (v) & 0xFF
    pixel_buffer_idx++
    pixel_buffer[pixel_buffer_idx] = (v >> 8) & 0xFF
    pixel_buffer_idx++
    pixel_buffer[pixel_buffer_idx] = (v >> 16) & 0xFF
    pixel_buffer_idx++
    pixel_buffer[pixel_buffer_idx] = 255
    pixel_buffer_idx++
  })
  console.log(pixel_buffer_idx === pixel_buffer.length)

  var r = {
    data: pixel_buffer,
    width: 256,
    height: 240
  }

  console.log(jpeg.encode(r,100))
  fs.writeFileSync('./test.jpg', jpeg.encode(r,100).data.toString('binary'), 'binary')
})
