import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    Area_typeService,
    Area_typePopupService,
    Area_typeComponent,
    Area_typeDetailComponent,
    Area_typeDialogComponent,
    Area_typePopupComponent,
    Area_typeDeletePopupComponent,
    Area_typeDeleteDialogComponent,
    area_typeRoute,
    area_typePopupRoute,
} from './';

const ENTITY_STATES = [
    ...area_typeRoute,
    ...area_typePopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        Area_typeComponent,
        Area_typeDetailComponent,
        Area_typeDialogComponent,
        Area_typeDeleteDialogComponent,
        Area_typePopupComponent,
        Area_typeDeletePopupComponent,
    ],
    entryComponents: [
        Area_typeComponent,
        Area_typeDialogComponent,
        Area_typePopupComponent,
        Area_typeDeleteDialogComponent,
        Area_typeDeletePopupComponent,
    ],
    providers: [
        Area_typeService,
        Area_typePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateArea_typeModule {}
