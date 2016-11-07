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

* [x] record the data (ppu_state, controller_state)
* [x] train the network
* [x] play the gaming using the network
* [x] score the network
* [x] random mutation?
* [x] detect good PPU mem inputs
* [ ] vizualize network 

## how to make a network
* save a state in the nes with an smb level loaded `window.dvr.save_state()`
* run `sprite_trainer.js` in smb_data project
* copy th json of the network to the client_application directory
* change the require in client_application/webapp/dvr.js line 35 to use new json

# instrumented NES player

Browser boots up an NES ands queries for instructions.  Instructions are a list
of frame inputs and an NES state.  The browser NES plays the frame inputs and
returns the final state of the NES to the server.
