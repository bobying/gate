/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProjDetailComponent } from '../../../../../../main/webapp/app/entities/proj/proj-detail.component';
import { ProjService } from '../../../../../../main/webapp/app/entities/proj/proj.service';
import { Proj } from '../../../../../../main/webapp/app/entities/proj/proj.model';

describe('Component Tests', () => {

    describe('Proj Management Detail Component', () => {
        let comp: ProjDetailComponent;
        let fixture: ComponentFixture<ProjDetailComponent>;
        let service: ProjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ProjDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProjService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Proj(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.proj).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
