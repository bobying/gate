import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public introduction?: any,
        public office_url?: string,
    ) {
    }
}
