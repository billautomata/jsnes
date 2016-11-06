(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function dvr () {
  var current_frame_index = 0
  var input_frames = []
  var isRecording
  var isPlayingRecording
  var isPaused
  var nes_state_string = ''

  function init () {
    // reset all the state
    window.nes.start()
    isRecording = false
    isPlayingRecording = false
  }
  function play () {
    isPaused = false
  }
  function play_recording () {
    isPlayingRecording = true
    current_frame_index = 0
    var m = JSON.parse(window.localStorage.getItem('foo'))
    nes_state_string = m.nes_state_string
    input_frames = m.input_frames
    window.nes.fromJSON(JSON.parse(nes_state_string))
  }
  function start_recording () {
    // clear the input frames
    // save the state
    isRecording = true
    isPlayingRecording = false
    input_frames = []
    nes_state_string = JSON.stringify(window.nes.toJSON())
    console.log(nes_state_string.length)
  }
  function load_recording () {
    // var k = window.localStorage.getItem('')
  }
  function stop_recording () {
    isRecording = false
    console.log('saving', input_frames.length, 'frames')
    window.localStorage.setItem('foo', JSON.stringify({
      input_frames: input_frames,
      nes_state_string: nes_state_string
    }))
  }
  function tick () {
    // console.log('tick')
    if (!isPaused) {
      if (isRecording) {
        // console.log('here')
        input_frames.push(window.nes.keyboard.state1.join('\t').split('\t'))
      }
      if (isPlayingRecording) {
        // console.log('playing recording', current_frame_index)
        input_frames[current_frame_index].forEach(function (v, idx) {
          window.nes.keyboard.state1[idx] = v
        })
        current_frame_index += 1
        if (current_frame_index === input_frames.length - 1) {
          setTimeout(play_recording, 10)
        }
      }
      // console.log('frame')
      window.nes.frame()
    }
  }
  return {
    init: init,
    tick: tick,
    start_recording: start_recording,
    stop_recording: stop_recording,
    play_recording: play_recording,
    load_recording: load_recording,
    get_input_frames: function () {
      return input_frames
    }
  }
}

},{}],2:[function(require,module,exports){
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
// window.rom_url = '/local-roms/Mario Bros. (JU) [!].nes'
window.rom_url = '/local-roms/Donkey Kong (JU) [p1].nes'
window.nes.ui.loadROM(function (romdata) {
  // window.dvr.init()
  global_tick()
// var other_nes = require('../../exported_source/JSNES.js')({ ui: {
//     updateStatus: function (d) { console.log(d) },
//     writeFrame: function () {}
// }})
// other_nes.loadRom(romdata)
// other_nes.frame()
// console.log(other_nes)
})

function global_tick () {
  window.dvr.tick()
  window.requestAnimationFrame(global_tick)
}

console.log('supppp')
console.log(window.nes)

},{"./dvr.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRfYXBwbGljYXRpb24vd2ViYXBwL2R2ci5qcyIsImNsaWVudF9hcHBsaWNhdGlvbi93ZWJhcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZHZyICgpIHtcbiAgdmFyIGN1cnJlbnRfZnJhbWVfaW5kZXggPSAwXG4gIHZhciBpbnB1dF9mcmFtZXMgPSBbXVxuICB2YXIgaXNSZWNvcmRpbmdcbiAgdmFyIGlzUGxheWluZ1JlY29yZGluZ1xuICB2YXIgaXNQYXVzZWRcbiAgdmFyIG5lc19zdGF0ZV9zdHJpbmcgPSAnJ1xuXG4gIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgIC8vIHJlc2V0IGFsbCB0aGUgc3RhdGVcbiAgICB3aW5kb3cubmVzLnN0YXJ0KClcbiAgICBpc1JlY29yZGluZyA9IGZhbHNlXG4gICAgaXNQbGF5aW5nUmVjb3JkaW5nID0gZmFsc2VcbiAgfVxuICBmdW5jdGlvbiBwbGF5ICgpIHtcbiAgICBpc1BhdXNlZCA9IGZhbHNlXG4gIH1cbiAgZnVuY3Rpb24gcGxheV9yZWNvcmRpbmcgKCkge1xuICAgIGlzUGxheWluZ1JlY29yZGluZyA9IHRydWVcbiAgICBjdXJyZW50X2ZyYW1lX2luZGV4ID0gMFxuICAgIHZhciBtID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZvbycpKVxuICAgIG5lc19zdGF0ZV9zdHJpbmcgPSBtLm5lc19zdGF0ZV9zdHJpbmdcbiAgICBpbnB1dF9mcmFtZXMgPSBtLmlucHV0X2ZyYW1lc1xuICAgIHdpbmRvdy5uZXMuZnJvbUpTT04oSlNPTi5wYXJzZShuZXNfc3RhdGVfc3RyaW5nKSlcbiAgfVxuICBmdW5jdGlvbiBzdGFydF9yZWNvcmRpbmcgKCkge1xuICAgIC8vIGNsZWFyIHRoZSBpbnB1dCBmcmFtZXNcbiAgICAvLyBzYXZlIHRoZSBzdGF0ZVxuICAgIGlzUmVjb3JkaW5nID0gdHJ1ZVxuICAgIGlzUGxheWluZ1JlY29yZGluZyA9IGZhbHNlXG4gICAgaW5wdXRfZnJhbWVzID0gW11cbiAgICBuZXNfc3RhdGVfc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkod2luZG93Lm5lcy50b0pTT04oKSlcbiAgICBjb25zb2xlLmxvZyhuZXNfc3RhdGVfc3RyaW5nLmxlbmd0aClcbiAgfVxuICBmdW5jdGlvbiBsb2FkX3JlY29yZGluZyAoKSB7XG4gICAgLy8gdmFyIGsgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJycpXG4gIH1cbiAgZnVuY3Rpb24gc3RvcF9yZWNvcmRpbmcgKCkge1xuICAgIGlzUmVjb3JkaW5nID0gZmFsc2VcbiAgICBjb25zb2xlLmxvZygnc2F2aW5nJywgaW5wdXRfZnJhbWVzLmxlbmd0aCwgJ2ZyYW1lcycpXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmb28nLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpbnB1dF9mcmFtZXM6IGlucHV0X2ZyYW1lcyxcbiAgICAgIG5lc19zdGF0ZV9zdHJpbmc6IG5lc19zdGF0ZV9zdHJpbmdcbiAgICB9KSlcbiAgfVxuICBmdW5jdGlvbiB0aWNrICgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygndGljaycpXG4gICAgaWYgKCFpc1BhdXNlZCkge1xuICAgICAgaWYgKGlzUmVjb3JkaW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoZXJlJylcbiAgICAgICAgaW5wdXRfZnJhbWVzLnB1c2god2luZG93Lm5lcy5rZXlib2FyZC5zdGF0ZTEuam9pbignXFx0Jykuc3BsaXQoJ1xcdCcpKVxuICAgICAgfVxuICAgICAgaWYgKGlzUGxheWluZ1JlY29yZGluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncGxheWluZyByZWNvcmRpbmcnLCBjdXJyZW50X2ZyYW1lX2luZGV4KVxuICAgICAgICBpbnB1dF9mcmFtZXNbY3VycmVudF9mcmFtZV9pbmRleF0uZm9yRWFjaChmdW5jdGlvbiAodiwgaWR4KSB7XG4gICAgICAgICAgd2luZG93Lm5lcy5rZXlib2FyZC5zdGF0ZTFbaWR4XSA9IHZcbiAgICAgICAgfSlcbiAgICAgICAgY3VycmVudF9mcmFtZV9pbmRleCArPSAxXG4gICAgICAgIGlmIChjdXJyZW50X2ZyYW1lX2luZGV4ID09PSBpbnB1dF9mcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHNldFRpbWVvdXQocGxheV9yZWNvcmRpbmcsIDEwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZygnZnJhbWUnKVxuICAgICAgd2luZG93Lm5lcy5mcmFtZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdCxcbiAgICB0aWNrOiB0aWNrLFxuICAgIHN0YXJ0X3JlY29yZGluZzogc3RhcnRfcmVjb3JkaW5nLFxuICAgIHN0b3BfcmVjb3JkaW5nOiBzdG9wX3JlY29yZGluZyxcbiAgICBwbGF5X3JlY29yZGluZzogcGxheV9yZWNvcmRpbmcsXG4gICAgbG9hZF9yZWNvcmRpbmc6IGxvYWRfcmVjb3JkaW5nLFxuICAgIGdldF9pbnB1dF9mcmFtZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpbnB1dF9mcmFtZXNcbiAgICB9XG4gIH1cbn1cbiIsInZhciBKU05FUyA9IHdpbmRvdy5KU05FU1xudmFyICQgPSB3aW5kb3cuJFxuXG53aW5kb3cuZHZyID0gcmVxdWlyZSgnLi9kdnIuanMnKSgpXG5cbndpbmRvdy5uZXMgPSBuZXcgSlNORVMoe1xuICAndWknOiAkKCcjZW11bGF0b3InKS5KU05FU1VJKHtcbiAgICAnSG9tZWJyZXcnOiBbXG4gICAgICBbJ0NvbmNlbnRyYXRpb24gUm9vbScsICdyb21zL2Nyb29tL2Nyb29tLm5lcyddLFxuICAgICAgWydMSjY1JywgJ3JvbXMvbGo2NS9sajY1Lm5lcyddXG4gICAgXSxcbiAgICAnV29ya2luZyc6IFtcbiAgICAgIFsnQnViYmxlIEJvYmJsZScsICdsb2NhbC1yb21zL0J1YmJsZSBCb2JibGUgKFUpLm5lcyddLFxuXG4gICAgICBbJ0NvbnRyYScsICdsb2NhbC1yb21zL0NvbnRyYSAoVSkgWyFdLm5lcyddLFxuICAgICAgWydEb25rZXkgS29uZycsICdsb2NhbC1yb21zL0RvbmtleSBLb25nIChKVSkubmVzJ10sXG4gICAgICBbJ0RyLiBNYXJpbycsICdsb2NhbC1yb21zL0RyLiBNYXJpbyAoSlUpLm5lcyddLFxuICAgICAgWydHb2xmJywgJ2xvY2FsLXJvbXMvR29sZiAoSlUpLm5lcyddLFxuICAgICAgWydUaGUgTGVnZW5kIG9mIFplbGRhJywgJ2xvY2FsLXJvbXMvTGVnZW5kIG9mIFplbGRhLCBUaGUgKFUpIChQUkcxKS5uZXMnXSxcbiAgICAgIFsnTGVtbWluZ3MnLCAnbG9jYWwtcm9tcy9MZW1taW5ncyAoVSkubmVzJ10sXG4gICAgICBbJ0xpZmVmb3JjZScsICdsb2NhbC1yb21zL0xpZmVmb3JjZSAoVSkubmVzJ10sXG5cbiAgICAgIFsnTWFyaW8gQnJvcy4nLCAnbG9jYWwtcm9tcy9NYXJpbyBCcm9zLiAoSlUpIFshXS5uZXMnXSxcbiAgICAgIFsnTWVnYSBNYW4nLCAnbG9jYWwtcm9tcy9NZWdhIE1hbiAoVSkubmVzJ10sXG4gICAgICBbJ1BhYy1NYW4nLCAnbG9jYWwtcm9tcy9QYWMtTWFuIChVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1N1cGVyIE1hcmlvIEJyb3MuJywgJ2xvY2FsLXJvbXMvU3VwZXIgTWFyaW8gQnJvcy4gKEpVKSAoUFJHMCkgWyFdLm5lcyddLFxuICAgICAgWydUZW5uaXMnLCAnbG9jYWwtcm9tcy9UZW5uaXMgKEpVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1RldHJpcycsICdsb2NhbC1yb21zL1RldHJpcyAoVSkgWyFdLm5lcyddLFxuICAgICAgWydUZXRyaXMgMicsICdsb2NhbC1yb21zL1RldHJpcyAyIChVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1plbGRhIElJIC0gVGhlIEFkdmVudHVyZSBvZiBMaW5rJywgJ2xvY2FsLXJvbXMvWmVsZGEgSUkgLSBUaGUgQWR2ZW50dXJlIG9mIExpbmsgKFUpLm5lcyddXG4gICAgXSxcblxuICAgICdOZWFybHkgV29ya2luZyc6IFtcbiAgICAgIFsnRHVjayBIdW50JywgJ2xvY2FsLXJvbXMvRHVjayBIdW50IChKVUUpIFshXS5uZXMnXSxcbiAgICAgIFsnU3VwZXIgTWFyaW8gQnJvcy4gMycsICdsb2NhbC1yb21zL1N1cGVyIE1hcmlvIEJyb3MuIDMgKFUpIChQUkcxKSBbIV0ubmVzJ11cbiAgICBdXG4gIH0pXG59KVxuXG4vLyBjb25zb2xlLmxvZygnaGV5YScpXG4vLyB3aW5kb3cucm9tX3VybCA9ICcvbG9jYWwtcm9tcy9NYXJpbyBCcm9zLiAoSlUpIFshXS5uZXMnXG53aW5kb3cucm9tX3VybCA9ICcvbG9jYWwtcm9tcy9Eb25rZXkgS29uZyAoSlUpIFtwMV0ubmVzJ1xud2luZG93Lm5lcy51aS5sb2FkUk9NKGZ1bmN0aW9uIChyb21kYXRhKSB7XG4gIC8vIHdpbmRvdy5kdnIuaW5pdCgpXG4gIGdsb2JhbF90aWNrKClcbi8vIHZhciBvdGhlcl9uZXMgPSByZXF1aXJlKCcuLi8uLi9leHBvcnRlZF9zb3VyY2UvSlNORVMuanMnKSh7IHVpOiB7XG4vLyAgICAgdXBkYXRlU3RhdHVzOiBmdW5jdGlvbiAoZCkgeyBjb25zb2xlLmxvZyhkKSB9LFxuLy8gICAgIHdyaXRlRnJhbWU6IGZ1bmN0aW9uICgpIHt9XG4vLyB9fSlcbi8vIG90aGVyX25lcy5sb2FkUm9tKHJvbWRhdGEpXG4vLyBvdGhlcl9uZXMuZnJhbWUoKVxuLy8gY29uc29sZS5sb2cob3RoZXJfbmVzKVxufSlcblxuZnVuY3Rpb24gZ2xvYmFsX3RpY2sgKCkge1xuICB3aW5kb3cuZHZyLnRpY2soKVxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdsb2JhbF90aWNrKVxufVxuXG5jb25zb2xlLmxvZygnc3VwcHBwJylcbmNvbnNvbGUubG9nKHdpbmRvdy5uZXMpXG4iXX0=
