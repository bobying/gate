import { BaseEntity } from './../../shared';

const Enabled = {
    X : 'X' as 'X',
    Y : 'Y' as 'Y',
    N : 'N' as 'N'
}

type Enabled = (typeof Enabled)[keyof typeof Enabled];

export { Enabled }

export class DictEn2Cn implements BaseEntity {
    constructor(
        public id?: number,
        public english?: string,
        public chinese?: string,
        public hits?: number,
        public enable?: Enabled,
        public modified_date?: any,
        public consumed_date?: any,
        public priority?: number,
        public regex?: number,
        public sourceId?: number,
    ) {
    }
}
