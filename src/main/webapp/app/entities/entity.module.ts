import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GateArea_typeModule } from './area-type/area-type.module';
import { GateAreaModule } from './area/area.module';
import { GateIndustryModule } from './industry/industry.module';
import { GateCompanyModule } from './company/company.module';
import { GateUserModule } from './user/user.module';
import { GateDictEn2CnModule } from './dict-en-2-cn/dict-en-2-cn.module';
import { GateDictSourceModule } from './dict-source/dict-source.module';
import { GateDictSourceTypeModule } from './dict-source-type/dict-source-type.module';
import { GateLanguageModule } from './language/language.module';
import { GateProjFile2DictModule } from './proj-file-2-dict/proj-file-2-dict.module';
import { GateProjFilesModule } from './proj-files/proj-files.module';
import { GateProjModule } from './proj/proj.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GateArea_typeModule,
        GateAreaModule,
        GateIndustryModule,
        GateCompanyModule,
        GateUserModule,
        GateDictEn2CnModule,
        GateDictSourceModule,
        GateDictSourceTypeModule,
        GateLanguageModule,
        GateProjFile2DictModule,
        GateProjFilesModule,
        GateProjModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateEntityModule {}
