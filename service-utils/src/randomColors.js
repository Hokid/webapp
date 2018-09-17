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

  const result = rand.toString(16);

  return `${new Array(6 - result.length).fill('0').join('')}${color}`;
}
