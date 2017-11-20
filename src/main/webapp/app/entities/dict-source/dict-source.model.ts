import { BaseEntity } from './../../shared';

export class DictSource implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public sourceTypeId?: number,
    ) {
    }
}
