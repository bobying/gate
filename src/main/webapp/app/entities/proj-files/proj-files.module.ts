import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    ProjFilesService,
    ProjFilesPopupService,
    ProjFilesComponent,
    ProjFilesDetailComponent,
    ProjFilesDialogComponent,
    ProjFilesPopupComponent,
    ProjFilesDeletePopupComponent,
    ProjFilesDeleteDialogComponent,
    projFilesRoute,
    projFilesPopupRoute,
    ProjFilesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...projFilesRoute,
    ...projFilesPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProjFilesComponent,
        ProjFilesDetailComponent,
        ProjFilesDialogComponent,
        ProjFilesDeleteDialogComponent,
        ProjFilesPopupComponent,
        ProjFilesDeletePopupComponent,
    ],
    entryComponents: [
        ProjFilesComponent,
        ProjFilesDialogComponent,
        ProjFilesPopupComponent,
        ProjFilesDeleteDialogComponent,
        ProjFilesDeletePopupComponent,
    ],
    providers: [
        ProjFilesService,
        ProjFilesPopupService,
        ProjFilesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateProjFilesModule {}
