import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    DictSourceTypeService,
    DictSourceTypePopupService,
    DictSourceTypeComponent,
    DictSourceTypeDetailComponent,
    DictSourceTypeDialogComponent,
    DictSourceTypePopupComponent,
    DictSourceTypeDeletePopupComponent,
    DictSourceTypeDeleteDialogComponent,
    dictSourceTypeRoute,
    dictSourceTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...dictSourceTypeRoute,
    ...dictSourceTypePopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DictSourceTypeComponent,
        DictSourceTypeDetailComponent,
        DictSourceTypeDialogComponent,
        DictSourceTypeDeleteDialogComponent,
        DictSourceTypePopupComponent,
        DictSourceTypeDeletePopupComponent,
    ],
    entryComponents: [
        DictSourceTypeComponent,
        DictSourceTypeDialogComponent,
        DictSourceTypePopupComponent,
        DictSourceTypeDeleteDialogComponent,
        DictSourceTypeDeletePopupComponent,
    ],
    providers: [
        DictSourceTypeService,
        DictSourceTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateDictSourceTypeModule {}
