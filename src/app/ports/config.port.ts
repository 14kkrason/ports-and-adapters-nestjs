export interface Config {
    get(key: keyof ConfigData): string | number | boolean | Record<string, any>;
}

export interface ConfigData {
    example: string;
}