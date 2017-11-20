import { BaseEntity } from './../../shared';

export const enum Enabled {
    'X',
    'Y',
    'N'
}

export class DictEn2Cn implements BaseEntity {
    constructor(
        public id?: number,
        public english?: string,
        public chinese?: string,
        public hits?: number,
        public enable?: Enabled,
        public modified_date?: any,
        public consumed_date?: any,
        public sourceId?: number,
    ) {
    }
}
