import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DictSourceType } from './dict-source-type.model';
import { DictSourceTypePopupService } from './dict-source-type-popup.service';
import { DictSourceTypeService } from './dict-source-type.service';

@Component({
    selector: 'jhi-dict-source-type-dialog',
    templateUrl: './dict-source-type-dialog.component.html'
})
export class DictSourceTypeDialogComponent implements OnInit {

    dictSourceType: DictSourceType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dictSourceTypeService: DictSourceTypeService,
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
        if (this.dictSourceType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dictSourceTypeService.update(this.dictSourceType));
        } else {
            this.subscribeToSaveResponse(
                this.dictSourceTypeService.create(this.dictSourceType));
        }
    }

    private subscribeToSaveResponse(result: Observable<DictSourceType>) {
        result.subscribe((res: DictSourceType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DictSourceType) {
        this.eventManager.broadcast({ name: 'dictSourceTypeListModification', content: 'OK'});
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
    selector: 'jhi-dict-source-type-popup',
    template: ''
})
export class DictSourceTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictSourceTypePopupService: DictSourceTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dictSourceTypePopupService
                    .open(DictSourceTypeDialogComponent as Component, params['id']);
            } else {
                this.dictSourceTypePopupService
                    .open(DictSourceTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
