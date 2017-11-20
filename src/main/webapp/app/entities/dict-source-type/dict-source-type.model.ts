import { BaseEntity } from './../../shared';

export class DictSourceType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
