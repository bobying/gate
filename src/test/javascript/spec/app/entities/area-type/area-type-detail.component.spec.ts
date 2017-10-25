/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GateTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { Area_typeDetailComponent } from '../../../../../../main/webapp/app/entities/area-type/area-type-detail.component';
import { Area_typeService } from '../../../../../../main/webapp/app/entities/area-type/area-type.service';
import { Area_type } from '../../../../../../main/webapp/app/entities/area-type/area-type.model';

describe('Component Tests', () => {

    describe('Area_type Management Detail Component', () => {
        let comp: Area_typeDetailComponent;
        let fixture: ComponentFixture<Area_typeDetailComponent>;
        let service: Area_typeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [Area_typeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    Area_typeService,
                    JhiEventManager
                ]
            }).overrideTemplate(Area_typeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Area_typeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Area_typeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Area_type(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.area_type).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
