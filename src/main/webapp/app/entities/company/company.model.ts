import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public website?: string,
        public code?: string,
        public introduce?: any,
    ) {
    }
}
