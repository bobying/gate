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
    DictSourceTypeSelectionComponent,
    DictSourceTypeMultiSelectionComponent,
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
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DictSourceTypeComponent,
        DictSourceTypeDetailComponent,
        DictSourceTypeDialogComponent,
        DictSourceTypeDeleteDialogComponent,
        DictSourceTypePopupComponent,
        DictSourceTypeDeletePopupComponent,
        DictSourceTypeSelectionComponent,
        DictSourceTypeMultiSelectionComponent,
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        DictSourceTypeSelectionComponent,
        DictSourceTypeMultiSelectionComponent,
    ]
})
export class GateDictSourceTypeModule {}
