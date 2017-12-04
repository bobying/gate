import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GateDictSourceTypeModule } from './dict-source-type/dict-source-type.module';
import { GateDictSourceModule } from './dict-source/dict-source.module';
import { GateDictEn2CnModule } from './dict-en-2-cn/dict-en-2-cn.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GateDictSourceTypeModule,
        GateDictSourceModule,
        GateDictEn2CnModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateEntityModule {}
