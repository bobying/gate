import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    DictSourceService,
    DictSourcePopupService,
    DictSourceComponent,
    DictSourceDetailComponent,
    DictSourceDialogComponent,
    DictSourcePopupComponent,
    DictSourceDeletePopupComponent,
    DictSourceDeleteDialogComponent,
    dictSourceRoute,
    dictSourcePopupRoute,
    DictSourceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dictSourceRoute,
    ...dictSourcePopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DictSourceComponent,
        DictSourceDetailComponent,
        DictSourceDialogComponent,
        DictSourceDeleteDialogComponent,
        DictSourcePopupComponent,
        DictSourceDeletePopupComponent,
    ],
    entryComponents: [
        DictSourceComponent,
        DictSourceDialogComponent,
        DictSourcePopupComponent,
        DictSourceDeleteDialogComponent,
        DictSourceDeletePopupComponent,
    ],
    providers: [
        DictSourceService,
        DictSourcePopupService,
        DictSourceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateDictSourceModule {}
