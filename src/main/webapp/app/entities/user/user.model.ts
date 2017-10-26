import { BaseEntity } from './../../shared';

export class User implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nickname?: string,
        public avatarContentType?: string,
        public avatar?: any,
        public company?: string,
        public job_title?: string,
        public telephone?: string,
        public area?: number,
        public industry?: string,
        public company_idId?: number,
    ) {
    }
}
