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

  // network stuff
  var networkRunning = false
  var framesPlayed = 0
  var mostFramesPlayed = 0
  var bestNet = ''

  var k = require('../mb_network2.json')
  bestNet = JSON.stringify(k)

  function mutate_net (net, rate, size) {
    console.log('mutating')
    net.connections.forEach(function (v, idx) {
      if (Math.random() < rate) {
        v.weight += (Math.random() * (size * 2.0)) - size
      }
    })
  }
  k.connections.forEach(function (v, idx) {
    if (Math.random() < 0.001) {
      v.weight += Math.random() * 0.1
    }
  })
  console.log(k.connections.length)

  var instance = Network.fromJSON(k)
  // var instance = Network.fromJSON(require('../medium_network_16_4.json'))
  // var instance = Network.fromJSON(require('../bad_network_16_4.json'))
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
        if (current_frame_index >= input_frames.length - 1) {
          console.log('frame index reset')
          setTimeout(play_recording, 1)
        }
      }
      if (networkRunning) {
        framesPlayed += 1
        // activate network on spritemem and
        var m = instance.activate(window.nes.ppu.spriteMem.map(function (o) { return o / 256 }))
        // var m2 = instance2.activate(window.nes.ppu.spriteMem.map(function (o) { return o / 256 }))
        m = m.map(function (o) { if (o > 0.01) { return 65 } else { return 64 } })
        // m2 = m2.map(function (o) { if (o > 0.01) { return 65 } else { return 64 } })
        // console.log(m.join('\t'))
        window.nes.keyboard.state1[0] = m[0]
        window.nes.keyboard.state1[6] = m[1]
        window.nes.keyboard.state1[7] = m[2]
        // window.nes.keyboard.state2[0] = m2[0]
        // window.nes.keyboard.state2[6] = m2[1]
        // window.nes.keyboard.state2[7] = m2[2]

        // window.nes.keyboard.state2[0] = m[0]
        // window.nes.keyboard.state2[6] = m[1]
        // window.nes.keyboard.state2[7] = m[2]

      }
      // console.log('frame')
      window.nes.frame()

      if (window.nes.cpu.mem[0x48] === 0) {
        console.log('mario died')
        console.log('best frames', mostFramesPlayed)
        console.log('this run', framesPlayed)
        // mario has died
        // score the network

        // determine if the score was the best
        // if yes, store it
        if (framesPlayed >= mostFramesPlayed) {
          console.log('new best found')
          mostFramesPlayed = framesPlayed
          bestNet = JSON.stringify(k)
        }

        k = JSON.parse(bestNet)
        mutate_net(k, 0.01, 0.01)
        instance = Network.fromJSON(k)
        framesPlayed = 0
        load_state()

        // mutate the best network
        // load_state()

      }

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
