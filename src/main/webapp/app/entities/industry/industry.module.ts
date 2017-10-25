import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    IndustryService,
    IndustryPopupService,
    IndustryComponent,
    IndustryDetailComponent,
    IndustryDialogComponent,
    IndustryPopupComponent,
    IndustryDeletePopupComponent,
    IndustryDeleteDialogComponent,
    industryRoute,
    industryPopupRoute,
    IndustryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...industryRoute,
    ...industryPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IndustryComponent,
        IndustryDetailComponent,
        IndustryDialogComponent,
        IndustryDeleteDialogComponent,
        IndustryPopupComponent,
        IndustryDeletePopupComponent,
    ],
    entryComponents: [
        IndustryComponent,
        IndustryDialogComponent,
        IndustryPopupComponent,
        IndustryDeleteDialogComponent,
        IndustryDeletePopupComponent,
    ],
    providers: [
        IndustryService,
        IndustryPopupService,
        IndustryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateIndustryModule {}
