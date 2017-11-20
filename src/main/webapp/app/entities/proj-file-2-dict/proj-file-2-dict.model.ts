import { BaseEntity } from './../../shared';

export class ProjFile2Dict implements BaseEntity {
    constructor(
        public id?: number,
        public projFilesId?: number,
        public dictId?: number,
    ) {
    }
}
