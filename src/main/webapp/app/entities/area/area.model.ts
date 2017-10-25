import { BaseEntity } from './../../shared';

export const enum Valid {
    'valid',
    'invalid'
}

export class Area implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public zip?: string,
        public simple_name?: string,
        public valid?: Valid,
        public area_typeId?: number,
        public parent_areaId?: number,
    ) {
    }
}
