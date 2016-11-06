var JSNES = window.JSNES
var $ = window.$

window.dvr = require('./dvr.js')()

window.nes = new JSNES({
  'ui': $('#emulator').JSNESUI({
    'Homebrew': [
      ['Concentration Room', 'roms/croom/croom.nes'],
      ['LJ65', 'roms/lj65/lj65.nes']
    ],
    'Working': [
      ['Bubble Bobble', 'local-roms/Bubble Bobble (U).nes'],

      ['Contra', 'local-roms/Contra (U) [!].nes'],
      ['Donkey Kong', 'local-roms/Donkey Kong (JU).nes'],
      ['Dr. Mario', 'local-roms/Dr. Mario (JU).nes'],
      ['Golf', 'local-roms/Golf (JU).nes'],
      ['The Legend of Zelda', 'local-roms/Legend of Zelda, The (U) (PRG1).nes'],
      ['Lemmings', 'local-roms/Lemmings (U).nes'],
      ['Lifeforce', 'local-roms/Lifeforce (U).nes'],

      ['Mario Bros.', 'local-roms/Mario Bros. (JU) [!].nes'],
      ['Mega Man', 'local-roms/Mega Man (U).nes'],
      ['Pac-Man', 'local-roms/Pac-Man (U) [!].nes'],
      ['Super Mario Bros.', 'local-roms/Super Mario Bros. (JU) (PRG0) [!].nes'],
      ['Tennis', 'local-roms/Tennis (JU) [!].nes'],
      ['Tetris', 'local-roms/Tetris (U) [!].nes'],
      ['Tetris 2', 'local-roms/Tetris 2 (U) [!].nes'],
      ['Zelda II - The Adventure of Link', 'local-roms/Zelda II - The Adventure of Link (U).nes']
    ],

    'Nearly Working': [
      ['Duck Hunt', 'local-roms/Duck Hunt (JUE) [!].nes'],
      ['Super Mario Bros. 3', 'local-roms/Super Mario Bros. 3 (U) (PRG1) [!].nes']
    ]
  })
})

// console.log('heya')
window.rom_url = '/local-roms/Mario Bros. (JU) [!].nes'

if (window.localStorage.getItem('foo') === null) {
  window.localStorage.setItem('foo', JSON.stringify(require('../../runs/example_run.json')))
}

// window.rom_url = '/local-roms/Donkey Kong (JU) [p1].nes'
window.nes.ui.loadROM(function (romdata) {
  // window.dvr.play_recording()
  // window.dvr.go_network()
  // setInterval(function () {
  //   window.dvr.go_network()
  // }, 30000)
  global_tick()
})

function global_tick () {
  // for (var i = 0; i < 10; i++) {
  window.dvr.tick()
  // }
  window.requestAnimationFrame(global_tick)
}

console.log(window.nes)

window.r = window.dvr.start_recording
window.s = window.dvr.stop_recording
