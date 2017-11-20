import { BaseEntity } from './../../shared';

export class Proj implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public desc?: any,
        public url?: string,
    ) {
    }
}
