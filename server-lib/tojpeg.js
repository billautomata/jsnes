var fs = require('fs')
var jpeg = require('jpeg-js');

module.exports = function tojpeg(options){
  // options.nes
  // options.filename

  var w = 256
  var h = 240

  var x_pos = 0
  var y_pos = 0
  var pixel_buffer = new Buffer(w*h*4)
  var pixel_buffer_idx = 0
  options.nes.ppu.buffer.slice(0,w*h).forEach(function(v){
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
  // console.log(pixel_buffer_idx === pixel_buffer.length)

  var r = {
    data: pixel_buffer,
    width: w,
    height: h
  }

  fs.writeFileSync('./output/' + options.filename,
    jpeg.encode(r,100).data.toString('binary'), 'binary')

}
