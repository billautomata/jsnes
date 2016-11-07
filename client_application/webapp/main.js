var JSNES = window.JSNES
var $ = window.$

window.nes = new JSNES({
  'ui': $('#emulator').JSNESUI({
    'Homebrew': []
  })
})

window.dvr = require('./dvr.js')()
window.rom_url = '/local-roms/Mario Bros. (JU) [!].nes'

if (window.localStorage.getItem('foo') === null) {
  //  window.localStorage.setItem('foo', JSON.stringify(require('../../runs/example_run.json')))
}

// window.rom_url = '/local-roms/Donkey Kong (JU) [p1].nes'
window.nes.ui.loadROM(function (romdata) {
  // window.dvr.play_recording()
  window.dvr.go_network()
  global_tick()
})

function global_tick () {
  // window.draw_frame = 'blegh'
  for (var i = 0; i < 3; i++) {
    window.dvr.tick()
  }
  window.requestAnimationFrame(global_tick)
}

console.log(window.nes)

window.r = window.dvr.start_recording
window.s = window.dvr.stop_recording
