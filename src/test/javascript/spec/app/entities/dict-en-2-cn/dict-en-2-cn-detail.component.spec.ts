/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DictEn2CnDetailComponent } from '../../../../../../main/webapp/app/entities/dict-en-2-cn/dict-en-2-cn-detail.component';
import { DictEn2CnService } from '../../../../../../main/webapp/app/entities/dict-en-2-cn/dict-en-2-cn.service';
import { DictEn2Cn } from '../../../../../../main/webapp/app/entities/dict-en-2-cn/dict-en-2-cn.model';

describe('Component Tests', () => {

    describe('DictEn2Cn Management Detail Component', () => {
        let comp: DictEn2CnDetailComponent;
        let fixture: ComponentFixture<DictEn2CnDetailComponent>;
        let service: DictEn2CnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [DictEn2CnDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DictEn2CnService,
                    JhiEventManager
                ]
            }).overrideTemplate(DictEn2CnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictEn2CnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictEn2CnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DictEn2Cn(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dictEn2Cn).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
