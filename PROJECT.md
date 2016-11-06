# todo

## client side application
### record runs for study in the server side application
* control an NES game and record the inputs along with the state of the NES at frame zero
* play a recording of an NES inputs into the nes replaying a run

## server side application
### play runs recorded in the client side application


# todo

create a grunt task that
* builds the jsnes browser file with a concat
* builds the web application code that powers the UI
* run standard
* livereload

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

The server is generating frame inputs in order
