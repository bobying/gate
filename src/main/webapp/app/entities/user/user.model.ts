import { BaseEntity } from './../../shared';

export class User implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nickname?: string,
        public avatarContentType?: string,
        public avatar?: any,
        public telephone?: string,
        public company?: string,
        public job_title?: string,
        public exper_years?: number,
        public introduction?: string,
        public wechat?: string,
        public email?: string,
    ) {
    }
}
