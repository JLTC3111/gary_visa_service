export type FindingParameters = Record<string, string | number | boolean | null | string[]>;
export type PortableFinding = { id?: string; code?: string; category?: string; severity: 'critical'|'warning'|'recommendation'|'passed'; title?: string; explanation?: string; recommendation?: string; evidence?: string; params?: FindingParameters; messageKey?: string; messageValues?: FindingParameters; schemaVersion?: number };
export declare const FINDING_SCHEMA_VERSION: 1;
export declare const knownFindingCodes: readonly string[];
export declare function normalizeFinding<T extends PortableFinding>(finding:T): T & {code:string;params:FindingParameters;schemaVersion:number};
export declare function localizeFinding<T extends PortableFinding>(finding:T,language?:string): T & {title:string;explanation:string;recommendation:string};
export declare const tFinding: typeof localizeFinding;
export declare function findingLabel(key:string,language?:string):string;
