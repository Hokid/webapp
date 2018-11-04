export class Gamicon {
  static TYPE_LIST = 'TLIST';
  static TYPE_JSON = 'TJSON';
  static TYPE_INT = 'TINT';
  static TYPE_FLOAT = 'TFLOAT';
  static TYPE_BOOLEAN = 'TBOOL';
  static SPACE_RX = /\s+/g;
  static COMMA_RX = /,+/g;

  constructor(options = {}) {
    this.config = {};
    this.env = {};
    this.options = options;

    this.loadEnv();
    this.parseEnv();
  }

  static parseList(list, options = {stripEmpty: false}) {
    let result;

    if (Gamicon.SPACE_RX.test(list)) {
      list = list.replace(Gamicon.SPACE_RX, ',')
    }

    list = list.replace(Gamicon.COMMA_RX, ',')

    result = list.split(',');

    if (options.stripEmpty) {
      result = result.filter(c => !!c);
    }

    return result;
  }

  static parseValue(name, value, options = {}) {
    if (Gamicon.is(name, Gamicon.createTypeRegExp(Gamicon.TYPE_LIST))) {
      return Gamicon.parseList(value, options.list);
    } else if (Gamicon.is(name, Gamicon.createTypeRegExp(Gamicon.TYPE_JSON))) {
      return Gamicon.parseJSON(value, options.json);
    } else if (Gamicon.is(name, Gamicon.createTypeRegExp(Gamicon.TYPE_INT))) {
      return Gamicon.parseINT(value, options.int);
    } else if (Gamicon.is(name, Gamicon.createTypeRegExp(Gamicon.TYPE_FLOAT))) {
      return Gamicon.parseFLOAT(value, options.float);
    } else if (Gamicon.is(name, Gamicon.createTypeRegExp(Gamicon.TYPE_BOOLEAN))) {
      return Gamicon.parseBOOLEAN(value, {});
    }

    return value;
  }

  static parseJSON(value, options = {}) {
    try {
      const result = JSON.parse(value);
      return result;
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.log(e);
      }

      return null;
    }
  }

  static parseINT(value, options = {}) {
    return parseInt(value);
  }

  static parseFLOAT(value, options = {}) {
    return parseFloat(value);
  }

  static parseBOOLEAN(value, options = {}) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  }

  static is(name, tx) {
    return tx.test(name);
  }

  static createTypeRegExp(type) {
    return new RegExp(`_${type}$`);
  }

  static stripType(name) {
    const types = [
      Gamicon.TYPE_LIST,
      Gamicon.TYPE_JSON,
      Gamicon.TYPE_INT,
      Gamicon.TYPE_FLOAT,
      Gamicon.TYPE_BOOLEAN
    ];
    const rx = new RegExp(`_(${types.join('|')})$`);

    return name.replace(rx, '');
  }

  loadEnv() {
    const keys = Object.keys(process.env);

    keys.forEach((key) => {
      if (Gamicon.ENV_RX.some(rx => rx.test(key))) {
        this.env[key] = process.env[key] || '';
      }
    });
  }

  parseEnv() {
    const keys = Object.keys(this.env);

    keys.forEach(key => {
      const value = Gamicon.parseValue(key, this.env[key]);
      const name = Gamicon.stripType(key);

      this.config[name] = value;
    });
  }

  get(name) {
    return this.config[name];
  }
}

