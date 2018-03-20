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

  return rand.toString(16);
}