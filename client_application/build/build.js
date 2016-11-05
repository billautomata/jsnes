(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var JSNES = window.JSNES
var $ = window.$

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
window.rom_url = '/local-roms/Tetris (U) [!].nes'
window.nes.ui.loadROM()

console.log('supppp')
console.log(window.nes)

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRfYXBwbGljYXRpb24vd2ViYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBKU05FUyA9IHdpbmRvdy5KU05FU1xudmFyICQgPSB3aW5kb3cuJFxuXG53aW5kb3cubmVzID0gbmV3IEpTTkVTKHtcbiAgJ3VpJzogJCgnI2VtdWxhdG9yJykuSlNORVNVSSh7XG4gICAgJ0hvbWVicmV3JzogW1xuICAgICAgWydDb25jZW50cmF0aW9uIFJvb20nLCAncm9tcy9jcm9vbS9jcm9vbS5uZXMnXSxcbiAgICAgIFsnTEo2NScsICdyb21zL2xqNjUvbGo2NS5uZXMnXVxuICAgIF0sXG4gICAgJ1dvcmtpbmcnOiBbXG4gICAgICBbJ0J1YmJsZSBCb2JibGUnLCAnbG9jYWwtcm9tcy9CdWJibGUgQm9iYmxlIChVKS5uZXMnXSxcblxuICAgICAgWydDb250cmEnLCAnbG9jYWwtcm9tcy9Db250cmEgKFUpIFshXS5uZXMnXSxcbiAgICAgIFsnRG9ua2V5IEtvbmcnLCAnbG9jYWwtcm9tcy9Eb25rZXkgS29uZyAoSlUpLm5lcyddLFxuICAgICAgWydEci4gTWFyaW8nLCAnbG9jYWwtcm9tcy9Eci4gTWFyaW8gKEpVKS5uZXMnXSxcbiAgICAgIFsnR29sZicsICdsb2NhbC1yb21zL0dvbGYgKEpVKS5uZXMnXSxcbiAgICAgIFsnVGhlIExlZ2VuZCBvZiBaZWxkYScsICdsb2NhbC1yb21zL0xlZ2VuZCBvZiBaZWxkYSwgVGhlIChVKSAoUFJHMSkubmVzJ10sXG4gICAgICBbJ0xlbW1pbmdzJywgJ2xvY2FsLXJvbXMvTGVtbWluZ3MgKFUpLm5lcyddLFxuICAgICAgWydMaWZlZm9yY2UnLCAnbG9jYWwtcm9tcy9MaWZlZm9yY2UgKFUpLm5lcyddLFxuXG4gICAgICBbJ01hcmlvIEJyb3MuJywgJ2xvY2FsLXJvbXMvTWFyaW8gQnJvcy4gKEpVKSBbIV0ubmVzJ10sXG4gICAgICBbJ01lZ2EgTWFuJywgJ2xvY2FsLXJvbXMvTWVnYSBNYW4gKFUpLm5lcyddLFxuICAgICAgWydQYWMtTWFuJywgJ2xvY2FsLXJvbXMvUGFjLU1hbiAoVSkgWyFdLm5lcyddLFxuICAgICAgWydTdXBlciBNYXJpbyBCcm9zLicsICdsb2NhbC1yb21zL1N1cGVyIE1hcmlvIEJyb3MuIChKVSkgKFBSRzApIFshXS5uZXMnXSxcbiAgICAgIFsnVGVubmlzJywgJ2xvY2FsLXJvbXMvVGVubmlzIChKVSkgWyFdLm5lcyddLFxuICAgICAgWydUZXRyaXMnLCAnbG9jYWwtcm9tcy9UZXRyaXMgKFUpIFshXS5uZXMnXSxcbiAgICAgIFsnVGV0cmlzIDInLCAnbG9jYWwtcm9tcy9UZXRyaXMgMiAoVSkgWyFdLm5lcyddLFxuICAgICAgWydaZWxkYSBJSSAtIFRoZSBBZHZlbnR1cmUgb2YgTGluaycsICdsb2NhbC1yb21zL1plbGRhIElJIC0gVGhlIEFkdmVudHVyZSBvZiBMaW5rIChVKS5uZXMnXVxuICAgIF0sXG5cbiAgICAnTmVhcmx5IFdvcmtpbmcnOiBbXG4gICAgICBbJ0R1Y2sgSHVudCcsICdsb2NhbC1yb21zL0R1Y2sgSHVudCAoSlVFKSBbIV0ubmVzJ10sXG4gICAgICBbJ1N1cGVyIE1hcmlvIEJyb3MuIDMnLCAnbG9jYWwtcm9tcy9TdXBlciBNYXJpbyBCcm9zLiAzIChVKSAoUFJHMSkgWyFdLm5lcyddXG4gICAgXVxuICB9KVxufSlcblxuLy8gY29uc29sZS5sb2coJ2hleWEnKVxud2luZG93LnJvbV91cmwgPSAnL2xvY2FsLXJvbXMvVGV0cmlzIChVKSBbIV0ubmVzJ1xud2luZG93Lm5lcy51aS5sb2FkUk9NKClcblxuY29uc29sZS5sb2coJ3N1cHBwcCcpXG5jb25zb2xlLmxvZyh3aW5kb3cubmVzKVxuIl19
