/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DictSourceTypeDetailComponent } from '../../../../../../main/webapp/app/entities/dict-source-type/dict-source-type-detail.component';
import { DictSourceTypeService } from '../../../../../../main/webapp/app/entities/dict-source-type/dict-source-type.service';
import { DictSourceType } from '../../../../../../main/webapp/app/entities/dict-source-type/dict-source-type.model';

describe('Component Tests', () => {

    describe('DictSourceType Management Detail Component', () => {
        let comp: DictSourceTypeDetailComponent;
        let fixture: ComponentFixture<DictSourceTypeDetailComponent>;
        let service: DictSourceTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [DictSourceTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DictSourceTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(DictSourceTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictSourceTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictSourceTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DictSourceType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dictSourceType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
