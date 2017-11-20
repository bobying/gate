/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DictSourceDetailComponent } from '../../../../../../main/webapp/app/entities/dict-source/dict-source-detail.component';
import { DictSourceService } from '../../../../../../main/webapp/app/entities/dict-source/dict-source.service';
import { DictSource } from '../../../../../../main/webapp/app/entities/dict-source/dict-source.model';

describe('Component Tests', () => {

    describe('DictSource Management Detail Component', () => {
        let comp: DictSourceDetailComponent;
        let fixture: ComponentFixture<DictSourceDetailComponent>;
        let service: DictSourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [DictSourceDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DictSourceService,
                    JhiEventManager
                ]
            }).overrideTemplate(DictSourceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DictSourceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DictSourceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DictSource(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dictSource).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
