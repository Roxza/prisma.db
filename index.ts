declare module "prisma.db" {
  export class plasmaDatabase {
    constructor(data?: object);
    public set(key: string, value: any): void;
    public fetch(key: string): any;
    public get(key: string): any;
    public has(key: string): boolean;
    public delete(key: string): void;
    public math(key: string, operator: string, number: number): void;
    public type(key: string): string;
    public size(): number;
    public push(key: string, value: any): void;
    public add(key: string, value: any): void;
    public subtract(key: string, value: any): void;
    public dataAll(): object;
    public destory(): void;
    public clear(): void;
  }
}
