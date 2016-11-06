var jpeg = require('jpeg-js')
var fs = require('fs')
var synaptic = require('synaptic') // this line is not needed in the browser

console.log('dvr starting up')

var Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect

module.exports = function dvr () {
  var current_frame_index = 0
  var input_frames = []
  var isRecording
  var isPlayingRecording
  var isPaused
  var nes_state_string = ''
  var networkRunning = false

  var instance = Network.fromJSON(require('../mb_ppu_network.json'))
  console.log(instance)

  // neural network stuff

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
    if (nes_state_string === undefined) {
      nes_state_string = m.nes_state
    }
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

  function save_state () {
    window.localStorage.setItem('foo-nes-state', JSON.stringify(window.nes.toJSON()))
  }
  function load_state () {
    window.nes.fromJSON(JSON.parse(window.localStorage.getItem('foo-nes-state')))
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
          setTimeout(play_recording, 1)
        }
      }
      if (networkRunning) {
        // activate network on spritemem and
        var m = instance.activate(window.nes.ppu.spriteMem.map(function (o) { return o / 256 }))
        m = m.map(function (o) { if (o > 0.1) { return 65 } else { return 64 } })
        window.nes.keyboard.state1[0] = m[0]
        window.nes.keyboard.state1[6] = m[1]
        window.nes.keyboard.state1[7] = m[2]

      // most in array is button
      // var max_idx = -1
      // var max_value = 0
      // console.log(m.join('\t'))
      // m.forEach(function (v, _i) {
      //   if (max_value < v) {
      //     max_value = v
      //     max_idx = _i
      //   }
      // })
      // if (max_idx !== -1) {
      //   if (max_idx === 0) {
      //     window.nes.keyboard.state1[0] = 65
      //     window.nes.keyboard.state1[6] = 64
      //     window.nes.keyboard.state1[7] = 64
      //   }
      //   if (max_idx === 1) {
      //     window.nes.keyboard.state1[0] = 64
      //     window.nes.keyboard.state1[6] = 65
      //     window.nes.keyboard.state1[7] = 64
      //   }
      //   if (max_idx === 2) {
      //     window.nes.keyboard.state1[0] = 64
      //     window.nes.keyboard.state1[6] = 64
      //     window.nes.keyboard.state1[7] = 65
      //   }
      // }
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
    save_state: save_state,
    load_state: load_state,
    go_network: function () {
      load_state()
      networkRunning = true
    },
    get_input_frames: function () {
      return input_frames
    }
  }
}
