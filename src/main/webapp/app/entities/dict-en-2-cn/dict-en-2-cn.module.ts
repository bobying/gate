import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    DictEn2CnService,
    DictEn2CnPopupService,
    DictEn2CnComponent,
    DictEn2CnDetailComponent,
    DictEn2CnDialogComponent,
    DictEn2CnPopupComponent,
    DictEn2CnDeletePopupComponent,
    DictEn2CnDeleteDialogComponent,
    DictEn2CnSelectionComponent,
    DictEn2CnMultiSelectionComponent,
    dictEn2CnRoute,
    dictEn2CnPopupRoute,
    DictEn2CnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dictEn2CnRoute,
    ...dictEn2CnPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DictEn2CnComponent,
        DictEn2CnDetailComponent,
        DictEn2CnDialogComponent,
        DictEn2CnDeleteDialogComponent,
        DictEn2CnPopupComponent,
        DictEn2CnDeletePopupComponent,
        DictEn2CnSelectionComponent,
        DictEn2CnMultiSelectionComponent,
    ],
    entryComponents: [
        DictEn2CnComponent,
        DictEn2CnDialogComponent,
        DictEn2CnPopupComponent,
        DictEn2CnDeleteDialogComponent,
        DictEn2CnDeletePopupComponent,
    ],
    providers: [
        DictEn2CnService,
        DictEn2CnPopupService,
        DictEn2CnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        DictEn2CnSelectionComponent,
        DictEn2CnMultiSelectionComponent,
    ]
})
export class GateDictEn2CnModule {}
