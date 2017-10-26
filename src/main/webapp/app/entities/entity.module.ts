import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GateArea_typeModule } from './area-type/area-type.module';
import { GateAreaModule } from './area/area.module';
import { GateIndustryModule } from './industry/industry.module';
import { GateCompanyModule } from './company/company.module';
import { GateUserModule } from './user/user.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GateArea_typeModule,
        GateAreaModule,
        GateIndustryModule,
        GateCompanyModule,
        GateUserModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateEntityModule {}
