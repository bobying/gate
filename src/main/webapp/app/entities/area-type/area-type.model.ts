import { BaseEntity } from './../../shared';

export const enum Valid {
    'valid',
    'invalid'
}

export class Area_type implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public valid?: Valid,
    ) {
    }
}
