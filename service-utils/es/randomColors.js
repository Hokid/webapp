import "core-js/modules/es6.array.fill";
import "core-js/modules/es6.regexp.to-string";
export function RRGGBB(exclude) {
  var eLn = Array.isArray(exclude) ? exclude.length : 0;
  var max = 0xffffff - eLn;
  var rand = Math.round(max * Math.random());

  if (eLn) {
    for (var i = 0; i < eLn; i++) {
      if (rand < parseInt(exclude[i], 10)) {
        break;
      }

      rand++;
    }
  }

  var result = rand.toString(16);
  return "".concat(new Array(6 - result.length).fill('0').join('')).concat(color);
}