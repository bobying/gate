import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DictSource } from './dict-source.model';
import { DictSourcePopupService } from './dict-source-popup.service';
import { DictSourceService } from './dict-source.service';
import { DictSourceType, DictSourceTypeService } from '../dict-source-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dict-source-dialog',
    templateUrl: './dict-source-dialog.component.html'
})
export class DictSourceDialogComponent implements OnInit {

    dictSource: DictSource;
    isSaving: boolean;

    dictsourcetypes: DictSourceType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dictSourceService: DictSourceService,
        private dictSourceTypeService: DictSourceTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.dictSourceTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.dictsourcetypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dictSource.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dictSourceService.update(this.dictSource));
        } else {
            this.subscribeToSaveResponse(
                this.dictSourceService.create(this.dictSource));
        }
    }

    private subscribeToSaveResponse(result: Observable<DictSource>) {
        result.subscribe((res: DictSource) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DictSource) {
        this.eventManager.broadcast({ name: 'dictSourceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDictSourceTypeById(index: number, item: DictSourceType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dict-source-popup',
    template: ''
})
export class DictSourcePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictSourcePopupService: DictSourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dictSourcePopupService
                    .open(DictSourceDialogComponent as Component, params['id']);
            } else {
                this.dictSourcePopupService
                    .open(DictSourceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
