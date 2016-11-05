(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

      window.nes = new JSNES({
          'ui': $('#emulator').JSNESUI({
              "Homebrew": [
                  ['Concentration Room', 'roms/croom/croom.nes'],
                  ['LJ65', 'roms/lj65/lj65.nes'],
              ],
              "Working": [
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

              "Nearly Working": [
                  ['Duck Hunt', 'local-roms/Duck Hunt (JUE) [!].nes'],
                  ['Super Mario Bros. 3', 'local-roms/Super Mario Bros. 3 (U) (PRG1) [!].nes']
              ]
          })
      });

      // console.log('heya')
      window.rom_url = '/local-roms/Tetris (U) [!].nes'
      window.nes.ui.loadROM()

console.log('supppp')
console.log(window.nes)

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRfYXBwbGljYXRpb24vd2ViYXBwL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4gICAgICB3aW5kb3cubmVzID0gbmV3IEpTTkVTKHtcbiAgICAgICAgICAndWknOiAkKCcjZW11bGF0b3InKS5KU05FU1VJKHtcbiAgICAgICAgICAgICAgXCJIb21lYnJld1wiOiBbXG4gICAgICAgICAgICAgICAgICBbJ0NvbmNlbnRyYXRpb24gUm9vbScsICdyb21zL2Nyb29tL2Nyb29tLm5lcyddLFxuICAgICAgICAgICAgICAgICAgWydMSjY1JywgJ3JvbXMvbGo2NS9sajY1Lm5lcyddLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcIldvcmtpbmdcIjogW1xuICAgICAgICAgICAgICAgICAgWydCdWJibGUgQm9iYmxlJywgJ2xvY2FsLXJvbXMvQnViYmxlIEJvYmJsZSAoVSkubmVzJ10sXG5cbiAgICAgICAgICAgICAgICAgIFsnQ29udHJhJywgJ2xvY2FsLXJvbXMvQ29udHJhIChVKSBbIV0ubmVzJ10sXG4gICAgICAgICAgICAgICAgICBbJ0RvbmtleSBLb25nJywgJ2xvY2FsLXJvbXMvRG9ua2V5IEtvbmcgKEpVKS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnRHIuIE1hcmlvJywgJ2xvY2FsLXJvbXMvRHIuIE1hcmlvIChKVSkubmVzJ10sXG4gICAgICAgICAgICAgICAgICBbJ0dvbGYnLCAnbG9jYWwtcm9tcy9Hb2xmIChKVSkubmVzJ10sXG4gICAgICAgICAgICAgICAgICBbJ1RoZSBMZWdlbmQgb2YgWmVsZGEnLCAnbG9jYWwtcm9tcy9MZWdlbmQgb2YgWmVsZGEsIFRoZSAoVSkgKFBSRzEpLm5lcyddLFxuICAgICAgICAgICAgICAgICAgWydMZW1taW5ncycsICdsb2NhbC1yb21zL0xlbW1pbmdzIChVKS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnTGlmZWZvcmNlJywgJ2xvY2FsLXJvbXMvTGlmZWZvcmNlIChVKS5uZXMnXSxcblxuICAgICAgICAgICAgICAgICAgWydNYXJpbyBCcm9zLicsICdsb2NhbC1yb21zL01hcmlvIEJyb3MuIChKVSkgWyFdLm5lcyddLFxuICAgICAgICAgICAgICAgICAgWydNZWdhIE1hbicsICdsb2NhbC1yb21zL01lZ2EgTWFuIChVKS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnUGFjLU1hbicsICdsb2NhbC1yb21zL1BhYy1NYW4gKFUpIFshXS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnU3VwZXIgTWFyaW8gQnJvcy4nLCAnbG9jYWwtcm9tcy9TdXBlciBNYXJpbyBCcm9zLiAoSlUpIChQUkcwKSBbIV0ubmVzJ10sXG4gICAgICAgICAgICAgICAgICBbJ1Rlbm5pcycsICdsb2NhbC1yb21zL1Rlbm5pcyAoSlUpIFshXS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnVGV0cmlzJywgJ2xvY2FsLXJvbXMvVGV0cmlzIChVKSBbIV0ubmVzJ10sXG4gICAgICAgICAgICAgICAgICBbJ1RldHJpcyAyJywgJ2xvY2FsLXJvbXMvVGV0cmlzIDIgKFUpIFshXS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnWmVsZGEgSUkgLSBUaGUgQWR2ZW50dXJlIG9mIExpbmsnLCAnbG9jYWwtcm9tcy9aZWxkYSBJSSAtIFRoZSBBZHZlbnR1cmUgb2YgTGluayAoVSkubmVzJ11cbiAgICAgICAgICAgICAgXSxcblxuICAgICAgICAgICAgICBcIk5lYXJseSBXb3JraW5nXCI6IFtcbiAgICAgICAgICAgICAgICAgIFsnRHVjayBIdW50JywgJ2xvY2FsLXJvbXMvRHVjayBIdW50IChKVUUpIFshXS5uZXMnXSxcbiAgICAgICAgICAgICAgICAgIFsnU3VwZXIgTWFyaW8gQnJvcy4gMycsICdsb2NhbC1yb21zL1N1cGVyIE1hcmlvIEJyb3MuIDMgKFUpIChQUkcxKSBbIV0ubmVzJ11cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgIH0pXG4gICAgICB9KTtcblxuICAgICAgLy8gY29uc29sZS5sb2coJ2hleWEnKVxuICAgICAgd2luZG93LnJvbV91cmwgPSAnL2xvY2FsLXJvbXMvVGV0cmlzIChVKSBbIV0ubmVzJ1xuICAgICAgd2luZG93Lm5lcy51aS5sb2FkUk9NKClcblxuY29uc29sZS5sb2coJ3N1cHBwcCcpXG5jb25zb2xlLmxvZyh3aW5kb3cubmVzKVxuIl19
