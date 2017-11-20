/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProjFile2DictDetailComponent } from '../../../../../../main/webapp/app/entities/proj-file-2-dict/proj-file-2-dict-detail.component';
import { ProjFile2DictService } from '../../../../../../main/webapp/app/entities/proj-file-2-dict/proj-file-2-dict.service';
import { ProjFile2Dict } from '../../../../../../main/webapp/app/entities/proj-file-2-dict/proj-file-2-dict.model';

describe('Component Tests', () => {

    describe('ProjFile2Dict Management Detail Component', () => {
        let comp: ProjFile2DictDetailComponent;
        let fixture: ComponentFixture<ProjFile2DictDetailComponent>;
        let service: ProjFile2DictService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ProjFile2DictDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProjFile2DictService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProjFile2DictDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjFile2DictDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjFile2DictService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProjFile2Dict(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.projFile2Dict).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
