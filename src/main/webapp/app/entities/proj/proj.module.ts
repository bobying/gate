import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    ProjService,
    ProjPopupService,
    ProjComponent,
    ProjDetailComponent,
    ProjDialogComponent,
    ProjPopupComponent,
    ProjDeletePopupComponent,
    ProjDeleteDialogComponent,
    projRoute,
    projPopupRoute,
    ProjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...projRoute,
    ...projPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProjComponent,
        ProjDetailComponent,
        ProjDialogComponent,
        ProjDeleteDialogComponent,
        ProjPopupComponent,
        ProjDeletePopupComponent,
    ],
    entryComponents: [
        ProjComponent,
        ProjDialogComponent,
        ProjPopupComponent,
        ProjDeleteDialogComponent,
        ProjDeletePopupComponent,
    ],
    providers: [
        ProjService,
        ProjPopupService,
        ProjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateProjModule {}
