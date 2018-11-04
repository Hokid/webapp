export function throwIfNotInstanse(instance: any, constructor: any) {
  if (!(instance instanceof constructor)) {
    throw new TypeError('object not instance of ' + constructor.name);
  }
}

export function byId(list: Array<{ id: number }>, id: number) {
  return list.find((i) => i.id === id);
}
