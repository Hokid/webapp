export declare class Gamicon {
    static TYPE_LIST: string;
    static TYPE_JSON: string;
    static TYPE_INT: string;
    static TYPE_FLOAT: string;
    static TYPE_BOOLEAN: string;
    static SPACE_RX: RegExp;
    static COMMA_RX: RegExp;
    constructor(options?: {});
    static parseList(list: any, options?: {
        stripEmpty: boolean;
    }): any;
    static parseValue(name: any, value: any, options?: {}): any;
    static parseJSON(value: any, options?: {}): any;
    static parseINT(value: any, options?: {}): number;
    static parseFLOAT(value: any, options?: {}): number;
    static parseBOOLEAN(value: any, options?: {}): boolean | undefined;
    static is(name: any, tx: any): any;
    static createTypeRegExp(type: any): RegExp;
    static stripType(name: any): any;
    loadEnv(): void;
    parseEnv(): void;
    get(name: any): any;
}
