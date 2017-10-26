import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public introduce?: any,
        public code?: string,
        public website?: string,
    ) {
    }
}
