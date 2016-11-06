var fs = require('fs')
var profiler = require('./profiler.js')
var memory_data_to_jpeg = require('./memory_data_to_jpeg.js')

// var rundata = JSON.parse(fs.readFileSync('../runs/example_run.json'))
// console.log(Object.keys(rundata))
// var run = profiler({
//   rundata: rundata
// })

var memory_data = JSON.parse(fs.readFileSync('./memory_data.json'))

memory_data_to_jpeg({
  memory_data: memory_data,
  filename: '_memory.jpg'
})
