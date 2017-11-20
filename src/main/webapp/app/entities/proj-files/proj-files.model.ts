import { BaseEntity } from './../../shared';

export class ProjFiles implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public path?: string,
        public sourceLanguagePath?: string,
        public targetLanguagePath?: string,
        public projId?: number,
    ) {
    }
}
