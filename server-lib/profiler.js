var fs = require('fs')
var tojpeg = require('./tojpeg.js')

module.exports = function profiler(options){
  // options.rundata
    // .nes_state
    // .input_frames

  console.log(options.rundata.input_frames.length)
  console.log(options.rundata.nes_state.slice(0,40))

  var nes_state_object = JSON.parse(options.rundata.nes_state)

  var romdata = JSON.parse(options.rundata.nes_state).romData

  // console.log(Object.keys(JSON.parse(options.rundata.nes_state)))

  var nes = require('../exported_source/JSNES.js')()
  nes.fromJSON(nes_state_object)
  // nes.loadRom(romdata)

  var frames = options.rundata.input_frames

  var memory_data = []

  frames.forEach(function(frame, frame_idx){
    frame.forEach(function(v,idx){
      nes.keyboard.state1[idx] = v
    })
    process.stdout.write('_')
    nes.frame()
    memory_data.push(nes.cpu.mem.slice(0,2048))
    // tojpeg({ nes: nes, filename: frame_idx + '.jpg' })
    process.stdout.write('.')
  })

  // fs.writeFileSync('./memory_data.json', JSON.stringify(memory_data))

}
