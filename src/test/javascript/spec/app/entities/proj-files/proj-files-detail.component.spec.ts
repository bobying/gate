/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProjFilesDetailComponent } from '../../../../../../main/webapp/app/entities/proj-files/proj-files-detail.component';
import { ProjFilesService } from '../../../../../../main/webapp/app/entities/proj-files/proj-files.service';
import { ProjFiles } from '../../../../../../main/webapp/app/entities/proj-files/proj-files.model';

describe('Component Tests', () => {

    describe('ProjFiles Management Detail Component', () => {
        let comp: ProjFilesDetailComponent;
        let fixture: ComponentFixture<ProjFilesDetailComponent>;
        let service: ProjFilesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ProjFilesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProjFilesService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProjFilesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjFilesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjFilesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProjFiles(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.projFiles).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
