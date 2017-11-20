import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    ProjFile2DictService,
    ProjFile2DictPopupService,
    ProjFile2DictComponent,
    ProjFile2DictDetailComponent,
    ProjFile2DictDialogComponent,
    ProjFile2DictPopupComponent,
    ProjFile2DictDeletePopupComponent,
    ProjFile2DictDeleteDialogComponent,
    projFile2DictRoute,
    projFile2DictPopupRoute,
    ProjFile2DictResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...projFile2DictRoute,
    ...projFile2DictPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProjFile2DictComponent,
        ProjFile2DictDetailComponent,
        ProjFile2DictDialogComponent,
        ProjFile2DictDeleteDialogComponent,
        ProjFile2DictPopupComponent,
        ProjFile2DictDeletePopupComponent,
    ],
    entryComponents: [
        ProjFile2DictComponent,
        ProjFile2DictDialogComponent,
        ProjFile2DictPopupComponent,
        ProjFile2DictDeleteDialogComponent,
        ProjFile2DictDeletePopupComponent,
    ],
    providers: [
        ProjFile2DictService,
        ProjFile2DictPopupService,
        ProjFile2DictResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateProjFile2DictModule {}
