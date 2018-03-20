export function RRGGBB(exclude) {
  const eLn = Array.isArray(exclude) ? exclude.length : 0;
  const max = 0xffffff - eLn;
  let rand = Math.round(max * Math.random());

  if (eLn) {
    for(let i = 0; i < eLn; i++) {
      if (rand < parseInt(exclude[i], 10)) {
        break;
      }
      rand++;
    }
  }

  return rand.toString(16);
}
