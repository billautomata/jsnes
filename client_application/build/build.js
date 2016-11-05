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
    window.nes.start()
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
    console.log('tick')
    if (!isPaused) {
      if (isRecording) {
        // console.log('here')
        input_frames.push(window.nes.keyboard.state1.join('\t').split('\t'))
      }
      if (isPlayingRecording) {
        console.log(current_frame_index)
        input_frames[current_frame_index].forEach(function (v, idx) {
          console.log(v)
          window.nes.keyboard.state1[idx] = v
        })
        current_frame_index += 1

        current_frame_index %= input_frames.length
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
window.rom_url = '/local-roms/Mario Bros. (JU) [!].nes'
window.nes.ui.loadROM(function () {
  // window.dvr.init()
  global_tick()
})

function global_tick () {
  window.dvr.tick()
  window.requestAnimationFrame(global_tick)
}

console.log('supppp')
console.log(window.nes)

},{"./dvr.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRfYXBwbGljYXRpb24vd2ViYXBwL2R2ci5qcyIsImNsaWVudF9hcHBsaWNhdGlvbi93ZWJhcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGR2ciAoKSB7XG4gIHZhciBjdXJyZW50X2ZyYW1lX2luZGV4ID0gMFxuICB2YXIgaW5wdXRfZnJhbWVzID0gW11cbiAgdmFyIGlzUmVjb3JkaW5nXG4gIHZhciBpc1BsYXlpbmdSZWNvcmRpbmdcbiAgdmFyIGlzUGF1c2VkXG4gIHZhciBuZXNfc3RhdGVfc3RyaW5nID0gJydcblxuICBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICAvLyByZXNldCBhbGwgdGhlIHN0YXRlXG4gICAgd2luZG93Lm5lcy5zdGFydCgpXG4gICAgaXNSZWNvcmRpbmcgPSBmYWxzZVxuICAgIGlzUGxheWluZ1JlY29yZGluZyA9IGZhbHNlXG4gIH1cbiAgZnVuY3Rpb24gcGxheSAoKSB7XG4gICAgaXNQYXVzZWQgPSBmYWxzZVxuICB9XG4gIGZ1bmN0aW9uIHBsYXlfcmVjb3JkaW5nICgpIHtcbiAgICBpc1BsYXlpbmdSZWNvcmRpbmcgPSB0cnVlXG4gICAgY3VycmVudF9mcmFtZV9pbmRleCA9IDBcbiAgICB2YXIgbSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmb28nKSlcbiAgICBuZXNfc3RhdGVfc3RyaW5nID0gbS5uZXNfc3RhdGVfc3RyaW5nXG4gICAgaW5wdXRfZnJhbWVzID0gbS5pbnB1dF9mcmFtZXNcbiAgICB3aW5kb3cubmVzLmZyb21KU09OKEpTT04ucGFyc2UobmVzX3N0YXRlX3N0cmluZykpXG4gICAgd2luZG93Lm5lcy5zdGFydCgpXG4gIH1cbiAgZnVuY3Rpb24gc3RhcnRfcmVjb3JkaW5nICgpIHtcbiAgICAvLyBjbGVhciB0aGUgaW5wdXQgZnJhbWVzXG4gICAgLy8gc2F2ZSB0aGUgc3RhdGVcbiAgICBpc1JlY29yZGluZyA9IHRydWVcbiAgICBpc1BsYXlpbmdSZWNvcmRpbmcgPSBmYWxzZVxuICAgIGlucHV0X2ZyYW1lcyA9IFtdXG4gICAgbmVzX3N0YXRlX3N0cmluZyA9IEpTT04uc3RyaW5naWZ5KHdpbmRvdy5uZXMudG9KU09OKCkpXG4gICAgY29uc29sZS5sb2cobmVzX3N0YXRlX3N0cmluZy5sZW5ndGgpXG4gIH1cbiAgZnVuY3Rpb24gbG9hZF9yZWNvcmRpbmcgKCkge1xuICAgIC8vIHZhciBrID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCcnKVxuICB9XG4gIGZ1bmN0aW9uIHN0b3BfcmVjb3JkaW5nICgpIHtcbiAgICBpc1JlY29yZGluZyA9IGZhbHNlXG4gICAgY29uc29sZS5sb2coJ3NhdmluZycsIGlucHV0X2ZyYW1lcy5sZW5ndGgsICdmcmFtZXMnKVxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZm9vJywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaW5wdXRfZnJhbWVzOiBpbnB1dF9mcmFtZXMsXG4gICAgICBuZXNfc3RhdGVfc3RyaW5nOiBuZXNfc3RhdGVfc3RyaW5nXG4gICAgfSkpXG4gIH1cbiAgZnVuY3Rpb24gdGljayAoKSB7XG4gICAgY29uc29sZS5sb2coJ3RpY2snKVxuICAgIGlmICghaXNQYXVzZWQpIHtcbiAgICAgIGlmIChpc1JlY29yZGluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVyZScpXG4gICAgICAgIGlucHV0X2ZyYW1lcy5wdXNoKHdpbmRvdy5uZXMua2V5Ym9hcmQuc3RhdGUxLmpvaW4oJ1xcdCcpLnNwbGl0KCdcXHQnKSlcbiAgICAgIH1cbiAgICAgIGlmIChpc1BsYXlpbmdSZWNvcmRpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudF9mcmFtZV9pbmRleClcbiAgICAgICAgaW5wdXRfZnJhbWVzW2N1cnJlbnRfZnJhbWVfaW5kZXhdLmZvckVhY2goZnVuY3Rpb24gKHYsIGlkeCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHYpXG4gICAgICAgICAgd2luZG93Lm5lcy5rZXlib2FyZC5zdGF0ZTFbaWR4XSA9IHZcbiAgICAgICAgfSlcbiAgICAgICAgY3VycmVudF9mcmFtZV9pbmRleCArPSAxXG5cbiAgICAgICAgY3VycmVudF9mcmFtZV9pbmRleCAlPSBpbnB1dF9mcmFtZXMubGVuZ3RoXG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZygnZnJhbWUnKVxuICAgICAgd2luZG93Lm5lcy5mcmFtZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdCxcbiAgICB0aWNrOiB0aWNrLFxuICAgIHN0YXJ0X3JlY29yZGluZzogc3RhcnRfcmVjb3JkaW5nLFxuICAgIHN0b3BfcmVjb3JkaW5nOiBzdG9wX3JlY29yZGluZyxcbiAgICBwbGF5X3JlY29yZGluZzogcGxheV9yZWNvcmRpbmcsXG4gICAgbG9hZF9yZWNvcmRpbmc6IGxvYWRfcmVjb3JkaW5nLFxuICAgIGdldF9pbnB1dF9mcmFtZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpbnB1dF9mcmFtZXNcbiAgICB9XG4gIH1cbn1cbiIsInZhciBKU05FUyA9IHdpbmRvdy5KU05FU1xudmFyICQgPSB3aW5kb3cuJFxuXG53aW5kb3cuZHZyID0gcmVxdWlyZSgnLi9kdnIuanMnKSgpXG5cbndpbmRvdy5uZXMgPSBuZXcgSlNORVMoe1xuICAndWknOiAkKCcjZW11bGF0b3InKS5KU05FU1VJKHtcbiAgICAnSG9tZWJyZXcnOiBbXG4gICAgICBbJ0NvbmNlbnRyYXRpb24gUm9vbScsICdyb21zL2Nyb29tL2Nyb29tLm5lcyddLFxuICAgICAgWydMSjY1JywgJ3JvbXMvbGo2NS9sajY1Lm5lcyddXG4gICAgXSxcbiAgICAnV29ya2luZyc6IFtcbiAgICAgIFsnQnViYmxlIEJvYmJsZScsICdsb2NhbC1yb21zL0J1YmJsZSBCb2JibGUgKFUpLm5lcyddLFxuXG4gICAgICBbJ0NvbnRyYScsICdsb2NhbC1yb21zL0NvbnRyYSAoVSkgWyFdLm5lcyddLFxuICAgICAgWydEb25rZXkgS29uZycsICdsb2NhbC1yb21zL0RvbmtleSBLb25nIChKVSkubmVzJ10sXG4gICAgICBbJ0RyLiBNYXJpbycsICdsb2NhbC1yb21zL0RyLiBNYXJpbyAoSlUpLm5lcyddLFxuICAgICAgWydHb2xmJywgJ2xvY2FsLXJvbXMvR29sZiAoSlUpLm5lcyddLFxuICAgICAgWydUaGUgTGVnZW5kIG9mIFplbGRhJywgJ2xvY2FsLXJvbXMvTGVnZW5kIG9mIFplbGRhLCBUaGUgKFUpIChQUkcxKS5uZXMnXSxcbiAgICAgIFsnTGVtbWluZ3MnLCAnbG9jYWwtcm9tcy9MZW1taW5ncyAoVSkubmVzJ10sXG4gICAgICBbJ0xpZmVmb3JjZScsICdsb2NhbC1yb21zL0xpZmVmb3JjZSAoVSkubmVzJ10sXG5cbiAgICAgIFsnTWFyaW8gQnJvcy4nLCAnbG9jYWwtcm9tcy9NYXJpbyBCcm9zLiAoSlUpIFshXS5uZXMnXSxcbiAgICAgIFsnTWVnYSBNYW4nLCAnbG9jYWwtcm9tcy9NZWdhIE1hbiAoVSkubmVzJ10sXG4gICAgICBbJ1BhYy1NYW4nLCAnbG9jYWwtcm9tcy9QYWMtTWFuIChVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1N1cGVyIE1hcmlvIEJyb3MuJywgJ2xvY2FsLXJvbXMvU3VwZXIgTWFyaW8gQnJvcy4gKEpVKSAoUFJHMCkgWyFdLm5lcyddLFxuICAgICAgWydUZW5uaXMnLCAnbG9jYWwtcm9tcy9UZW5uaXMgKEpVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1RldHJpcycsICdsb2NhbC1yb21zL1RldHJpcyAoVSkgWyFdLm5lcyddLFxuICAgICAgWydUZXRyaXMgMicsICdsb2NhbC1yb21zL1RldHJpcyAyIChVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1plbGRhIElJIC0gVGhlIEFkdmVudHVyZSBvZiBMaW5rJywgJ2xvY2FsLXJvbXMvWmVsZGEgSUkgLSBUaGUgQWR2ZW50dXJlIG9mIExpbmsgKFUpLm5lcyddXG4gICAgXSxcblxuICAgICdOZWFybHkgV29ya2luZyc6IFtcbiAgICAgIFsnRHVjayBIdW50JywgJ2xvY2FsLXJvbXMvRHVjayBIdW50IChKVUUpIFshXS5uZXMnXSxcbiAgICAgIFsnU3VwZXIgTWFyaW8gQnJvcy4gMycsICdsb2NhbC1yb21zL1N1cGVyIE1hcmlvIEJyb3MuIDMgKFUpIChQUkcxKSBbIV0ubmVzJ11cbiAgICBdXG4gIH0pXG59KVxuXG4vLyBjb25zb2xlLmxvZygnaGV5YScpXG53aW5kb3cucm9tX3VybCA9ICcvbG9jYWwtcm9tcy9NYXJpbyBCcm9zLiAoSlUpIFshXS5uZXMnXG53aW5kb3cubmVzLnVpLmxvYWRST00oZnVuY3Rpb24gKCkge1xuICAvLyB3aW5kb3cuZHZyLmluaXQoKVxuICBnbG9iYWxfdGljaygpXG59KVxuXG5mdW5jdGlvbiBnbG9iYWxfdGljayAoKSB7XG4gIHdpbmRvdy5kdnIudGljaygpXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2xvYmFsX3RpY2spXG59XG5cbmNvbnNvbGUubG9nKCdzdXBwcHAnKVxuY29uc29sZS5sb2cod2luZG93Lm5lcylcbiJdfQ==
