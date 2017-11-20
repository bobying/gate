import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DictEn2Cn } from './dict-en-2-cn.model';
import { DictEn2CnPopupService } from './dict-en-2-cn-popup.service';
import { DictEn2CnService } from './dict-en-2-cn.service';
import { DictSource, DictSourceService } from '../dict-source';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dict-en-2-cn-dialog',
    templateUrl: './dict-en-2-cn-dialog.component.html'
})
export class DictEn2CnDialogComponent implements OnInit {

    dictEn2Cn: DictEn2Cn;
    isSaving: boolean;

    dictsources: DictSource[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dictEn2CnService: DictEn2CnService,
        private dictSourceService: DictSourceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.dictSourceService.query()
            .subscribe((res: ResponseWrapper) => { this.dictsources = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dictEn2Cn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dictEn2CnService.update(this.dictEn2Cn));
        } else {
            this.subscribeToSaveResponse(
                this.dictEn2CnService.create(this.dictEn2Cn));
        }
    }

    private subscribeToSaveResponse(result: Observable<DictEn2Cn>) {
        result.subscribe((res: DictEn2Cn) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DictEn2Cn) {
        this.eventManager.broadcast({ name: 'dictEn2CnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDictSourceById(index: number, item: DictSource) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dict-en-2-cn-popup',
    template: ''
})
export class DictEn2CnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictEn2CnPopupService: DictEn2CnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dictEn2CnPopupService
                    .open(DictEn2CnDialogComponent as Component, params['id']);
            } else {
                this.dictEn2CnPopupService
                    .open(DictEn2CnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
