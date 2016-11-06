# todo

## nes library
* [ ] remove the UI 

## client side application (./client_application/webapp/)
### record runs for study in the server side application
* [x] control an NES game and record the inputs along with the state of the NES at frame zero
* [x] play a recording of an NES inputs into the nes replaying a run

## server side application (./server_application/)
* [ ] play runs recorded in the client side application
* [ ] generates NES profile data each frame

# todo


# experiments

## neural network to analyze ppu.spriteMem and control the game

The neural network should train on a set of data where the inputs are the
sprite memory and the outputs are the controller values.

* [ ] record the data (ppu_state, controller_state)
* [ ] train the network
* [ ] play the gaming using the network

# instrumented NES player

Browser boots up an NES ands queries for instructions.  Instructions are a list
of frame inputs and an NES state.  The browser NES plays the frame inputs and
returns the final state of the NES to the server.
