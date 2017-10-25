import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GateArea_typeModule } from './area-type/area-type.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GateArea_typeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateEntityModule {}
