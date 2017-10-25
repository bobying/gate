import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Area } from './area.model';
import { AreaPopupService } from './area-popup.service';
import { AreaService } from './area.service';
import { Area_type, Area_typeService } from '../area-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-area-dialog',
    templateUrl: './area-dialog.component.html'
})
export class AreaDialogComponent implements OnInit {

    area: Area;
    isSaving: boolean;

    area_types: Area_type[];

    areas: Area[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private areaService: AreaService,
        private area_typeService: Area_typeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.area_typeService.query()
            .subscribe((res: ResponseWrapper) => { this.area_types = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.areaService.query()
            .subscribe((res: ResponseWrapper) => { this.areas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.area.id !== undefined) {
            this.subscribeToSaveResponse(
                this.areaService.update(this.area));
        } else {
            this.subscribeToSaveResponse(
                this.areaService.create(this.area));
        }
    }

    private subscribeToSaveResponse(result: Observable<Area>) {
        result.subscribe((res: Area) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Area) {
        this.eventManager.broadcast({ name: 'areaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArea_typeById(index: number, item: Area_type) {
        return item.id;
    }

    trackAreaById(index: number, item: Area) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-area-popup',
    template: ''
})
export class AreaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPopupService: AreaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.areaPopupService
                    .open(AreaDialogComponent as Component, params['id']);
            } else {
                this.areaPopupService
                    .open(AreaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
