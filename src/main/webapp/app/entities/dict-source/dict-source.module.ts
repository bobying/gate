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
    DictSourceSelectionComponent,
    DictSourceMultiSelectionComponent,
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
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DictSourceComponent,
        DictSourceDetailComponent,
        DictSourceDialogComponent,
        DictSourceDeleteDialogComponent,
        DictSourcePopupComponent,
        DictSourceDeletePopupComponent,
        DictSourceSelectionComponent,
        DictSourceMultiSelectionComponent,
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        DictSourceSelectionComponent,
        DictSourceMultiSelectionComponent,
    ]
})
export class GateDictSourceModule {}
