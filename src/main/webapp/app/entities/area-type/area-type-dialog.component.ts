import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Area_type } from './area-type.model';
import { Area_typePopupService } from './area-type-popup.service';
import { Area_typeService } from './area-type.service';

@Component({
    selector: 'jhi-area-type-dialog',
    templateUrl: './area-type-dialog.component.html'
})
export class Area_typeDialogComponent implements OnInit {

    area_type: Area_type;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private area_typeService: Area_typeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.area_type.id !== undefined) {
            this.subscribeToSaveResponse(
                this.area_typeService.update(this.area_type));
        } else {
            this.subscribeToSaveResponse(
                this.area_typeService.create(this.area_type));
        }
    }

    private subscribeToSaveResponse(result: Observable<Area_type>) {
        result.subscribe((res: Area_type) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Area_type) {
        this.eventManager.broadcast({ name: 'area_typeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-area-type-popup',
    template: ''
})
export class Area_typePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private area_typePopupService: Area_typePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.area_typePopupService
                    .open(Area_typeDialogComponent as Component, params['id']);
            } else {
                this.area_typePopupService
                    .open(Area_typeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
