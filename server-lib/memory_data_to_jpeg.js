var fs = require('fs')
var jpeg = require('jpeg-js');

module.exports = function tojpeg(options){
  // options.memory_data
  // options.filename

  var memory_data = options.memory_data
  var w = memory_data[0].length
  var h = memory_data.length

  var pixel_buffer = new Buffer(w*h*4)
  var pixel_buffer_idx = 0

  memory_data.forEach(function(row, row_idx){
    row.forEach(function(v, col_idx){
      pixel_buffer[pixel_buffer_idx] = v
      pixel_buffer_idx++
      pixel_buffer[pixel_buffer_idx] = v
      pixel_buffer_idx++
      pixel_buffer[pixel_buffer_idx] = v
      pixel_buffer_idx++
      pixel_buffer[pixel_buffer_idx] = 255
      pixel_buffer_idx++
    })
  })

  var r = {
    data: pixel_buffer,
    width: w,
    height: h
  }

  fs.writeFileSync('./output/' + options.filename,
    jpeg.encode(r,100).data.toString('binary'), 'binary')

}
