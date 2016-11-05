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
