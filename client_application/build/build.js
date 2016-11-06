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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRfYXBwbGljYXRpb24vd2ViYXBwL2R2ci5qcyIsImNsaWVudF9hcHBsaWNhdGlvbi93ZWJhcHAvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkdnIgKCkge1xuICB2YXIgY3VycmVudF9mcmFtZV9pbmRleCA9IDBcbiAgdmFyIGlucHV0X2ZyYW1lcyA9IFtdXG4gIHZhciBpc1JlY29yZGluZ1xuICB2YXIgaXNQbGF5aW5nUmVjb3JkaW5nXG4gIHZhciBpc1BhdXNlZFxuICB2YXIgbmVzX3N0YXRlX3N0cmluZyA9ICcnXG5cbiAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgLy8gcmVzZXQgYWxsIHRoZSBzdGF0ZVxuICAgIHdpbmRvdy5uZXMuc3RhcnQoKVxuICAgIGlzUmVjb3JkaW5nID0gZmFsc2VcbiAgICBpc1BsYXlpbmdSZWNvcmRpbmcgPSBmYWxzZVxuICB9XG4gIGZ1bmN0aW9uIHBsYXkgKCkge1xuICAgIGlzUGF1c2VkID0gZmFsc2VcbiAgfVxuICBmdW5jdGlvbiBwbGF5X3JlY29yZGluZyAoKSB7XG4gICAgaXNQbGF5aW5nUmVjb3JkaW5nID0gdHJ1ZVxuICAgIGN1cnJlbnRfZnJhbWVfaW5kZXggPSAwXG4gICAgdmFyIG0gPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9vJykpXG4gICAgbmVzX3N0YXRlX3N0cmluZyA9IG0ubmVzX3N0YXRlX3N0cmluZ1xuICAgIGlucHV0X2ZyYW1lcyA9IG0uaW5wdXRfZnJhbWVzXG4gICAgd2luZG93Lm5lcy5mcm9tSlNPTihKU09OLnBhcnNlKG5lc19zdGF0ZV9zdHJpbmcpKVxuICB9XG4gIGZ1bmN0aW9uIHN0YXJ0X3JlY29yZGluZyAoKSB7XG4gICAgLy8gY2xlYXIgdGhlIGlucHV0IGZyYW1lc1xuICAgIC8vIHNhdmUgdGhlIHN0YXRlXG4gICAgaXNSZWNvcmRpbmcgPSB0cnVlXG4gICAgaXNQbGF5aW5nUmVjb3JkaW5nID0gZmFsc2VcbiAgICBpbnB1dF9mcmFtZXMgPSBbXVxuICAgIG5lc19zdGF0ZV9zdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh3aW5kb3cubmVzLnRvSlNPTigpKVxuICAgIGNvbnNvbGUubG9nKG5lc19zdGF0ZV9zdHJpbmcubGVuZ3RoKVxuICB9XG4gIGZ1bmN0aW9uIGxvYWRfcmVjb3JkaW5nICgpIHtcbiAgICAvLyB2YXIgayA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnJylcbiAgfVxuICBmdW5jdGlvbiBzdG9wX3JlY29yZGluZyAoKSB7XG4gICAgaXNSZWNvcmRpbmcgPSBmYWxzZVxuICAgIGNvbnNvbGUubG9nKCdzYXZpbmcnLCBpbnB1dF9mcmFtZXMubGVuZ3RoLCAnZnJhbWVzJylcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZvbycsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGlucHV0X2ZyYW1lczogaW5wdXRfZnJhbWVzLFxuICAgICAgbmVzX3N0YXRlX3N0cmluZzogbmVzX3N0YXRlX3N0cmluZ1xuICAgIH0pKVxuICB9XG4gIGZ1bmN0aW9uIHRpY2sgKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCd0aWNrJylcbiAgICBpZiAoIWlzUGF1c2VkKSB7XG4gICAgICBpZiAoaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2hlcmUnKVxuICAgICAgICBpbnB1dF9mcmFtZXMucHVzaCh3aW5kb3cubmVzLmtleWJvYXJkLnN0YXRlMS5qb2luKCdcXHQnKS5zcGxpdCgnXFx0JykpXG4gICAgICB9XG4gICAgICBpZiAoaXNQbGF5aW5nUmVjb3JkaW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwbGF5aW5nIHJlY29yZGluZycsIGN1cnJlbnRfZnJhbWVfaW5kZXgpXG4gICAgICAgIGlucHV0X2ZyYW1lc1tjdXJyZW50X2ZyYW1lX2luZGV4XS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpZHgpIHtcbiAgICAgICAgICB3aW5kb3cubmVzLmtleWJvYXJkLnN0YXRlMVtpZHhdID0gdlxuICAgICAgICB9KVxuICAgICAgICBjdXJyZW50X2ZyYW1lX2luZGV4ICs9IDFcbiAgICAgICAgaWYgKGN1cnJlbnRfZnJhbWVfaW5kZXggPT09IGlucHV0X2ZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc2V0VGltZW91dChwbGF5X3JlY29yZGluZywgMTApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmcmFtZScpXG4gICAgICB3aW5kb3cubmVzLmZyYW1lKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0LFxuICAgIHRpY2s6IHRpY2ssXG4gICAgc3RhcnRfcmVjb3JkaW5nOiBzdGFydF9yZWNvcmRpbmcsXG4gICAgc3RvcF9yZWNvcmRpbmc6IHN0b3BfcmVjb3JkaW5nLFxuICAgIHBsYXlfcmVjb3JkaW5nOiBwbGF5X3JlY29yZGluZyxcbiAgICBsb2FkX3JlY29yZGluZzogbG9hZF9yZWNvcmRpbmcsXG4gICAgZ2V0X2lucHV0X2ZyYW1lczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGlucHV0X2ZyYW1lc1xuICAgIH1cbiAgfVxufVxuIiwidmFyIEpTTkVTID0gd2luZG93LkpTTkVTXG52YXIgJCA9IHdpbmRvdy4kXG5cbndpbmRvdy5kdnIgPSByZXF1aXJlKCcuL2R2ci5qcycpKClcblxud2luZG93Lm5lcyA9IG5ldyBKU05FUyh7XG4gICd1aSc6ICQoJyNlbXVsYXRvcicpLkpTTkVTVUkoe1xuICAgICdIb21lYnJldyc6IFtcbiAgICAgIFsnQ29uY2VudHJhdGlvbiBSb29tJywgJ3JvbXMvY3Jvb20vY3Jvb20ubmVzJ10sXG4gICAgICBbJ0xKNjUnLCAncm9tcy9sajY1L2xqNjUubmVzJ11cbiAgICBdLFxuICAgICdXb3JraW5nJzogW1xuICAgICAgWydCdWJibGUgQm9iYmxlJywgJ2xvY2FsLXJvbXMvQnViYmxlIEJvYmJsZSAoVSkubmVzJ10sXG5cbiAgICAgIFsnQ29udHJhJywgJ2xvY2FsLXJvbXMvQ29udHJhIChVKSBbIV0ubmVzJ10sXG4gICAgICBbJ0RvbmtleSBLb25nJywgJ2xvY2FsLXJvbXMvRG9ua2V5IEtvbmcgKEpVKS5uZXMnXSxcbiAgICAgIFsnRHIuIE1hcmlvJywgJ2xvY2FsLXJvbXMvRHIuIE1hcmlvIChKVSkubmVzJ10sXG4gICAgICBbJ0dvbGYnLCAnbG9jYWwtcm9tcy9Hb2xmIChKVSkubmVzJ10sXG4gICAgICBbJ1RoZSBMZWdlbmQgb2YgWmVsZGEnLCAnbG9jYWwtcm9tcy9MZWdlbmQgb2YgWmVsZGEsIFRoZSAoVSkgKFBSRzEpLm5lcyddLFxuICAgICAgWydMZW1taW5ncycsICdsb2NhbC1yb21zL0xlbW1pbmdzIChVKS5uZXMnXSxcbiAgICAgIFsnTGlmZWZvcmNlJywgJ2xvY2FsLXJvbXMvTGlmZWZvcmNlIChVKS5uZXMnXSxcblxuICAgICAgWydNYXJpbyBCcm9zLicsICdsb2NhbC1yb21zL01hcmlvIEJyb3MuIChKVSkgWyFdLm5lcyddLFxuICAgICAgWydNZWdhIE1hbicsICdsb2NhbC1yb21zL01lZ2EgTWFuIChVKS5uZXMnXSxcbiAgICAgIFsnUGFjLU1hbicsICdsb2NhbC1yb21zL1BhYy1NYW4gKFUpIFshXS5uZXMnXSxcbiAgICAgIFsnU3VwZXIgTWFyaW8gQnJvcy4nLCAnbG9jYWwtcm9tcy9TdXBlciBNYXJpbyBCcm9zLiAoSlUpIChQUkcwKSBbIV0ubmVzJ10sXG4gICAgICBbJ1Rlbm5pcycsICdsb2NhbC1yb21zL1Rlbm5pcyAoSlUpIFshXS5uZXMnXSxcbiAgICAgIFsnVGV0cmlzJywgJ2xvY2FsLXJvbXMvVGV0cmlzIChVKSBbIV0ubmVzJ10sXG4gICAgICBbJ1RldHJpcyAyJywgJ2xvY2FsLXJvbXMvVGV0cmlzIDIgKFUpIFshXS5uZXMnXSxcbiAgICAgIFsnWmVsZGEgSUkgLSBUaGUgQWR2ZW50dXJlIG9mIExpbmsnLCAnbG9jYWwtcm9tcy9aZWxkYSBJSSAtIFRoZSBBZHZlbnR1cmUgb2YgTGluayAoVSkubmVzJ11cbiAgICBdLFxuXG4gICAgJ05lYXJseSBXb3JraW5nJzogW1xuICAgICAgWydEdWNrIEh1bnQnLCAnbG9jYWwtcm9tcy9EdWNrIEh1bnQgKEpVRSkgWyFdLm5lcyddLFxuICAgICAgWydTdXBlciBNYXJpbyBCcm9zLiAzJywgJ2xvY2FsLXJvbXMvU3VwZXIgTWFyaW8gQnJvcy4gMyAoVSkgKFBSRzEpIFshXS5uZXMnXVxuICAgIF1cbiAgfSlcbn0pXG5cbi8vIGNvbnNvbGUubG9nKCdoZXlhJylcbndpbmRvdy5yb21fdXJsID0gJy9sb2NhbC1yb21zL01hcmlvIEJyb3MuIChKVSkgWyFdLm5lcydcbndpbmRvdy5uZXMudWkubG9hZFJPTShmdW5jdGlvbiAoKSB7XG4gIC8vIHdpbmRvdy5kdnIuaW5pdCgpXG4gIGdsb2JhbF90aWNrKClcbn0pXG5cbmZ1bmN0aW9uIGdsb2JhbF90aWNrICgpIHtcbiAgd2luZG93LmR2ci50aWNrKClcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShnbG9iYWxfdGljaylcbn1cblxuY29uc29sZS5sb2coJ3N1cHBwcCcpXG5jb25zb2xlLmxvZyh3aW5kb3cubmVzKVxuIl19
