import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjFile2Dict } from './proj-file-2-dict.model';
import { ProjFile2DictPopupService } from './proj-file-2-dict-popup.service';
import { ProjFile2DictService } from './proj-file-2-dict.service';
import { ProjFiles, ProjFilesService } from '../proj-files';
import { DictEn2Cn, DictEn2CnService } from '../dict-en-2-cn';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-proj-file-2-dict-dialog',
    templateUrl: './proj-file-2-dict-dialog.component.html'
})
export class ProjFile2DictDialogComponent implements OnInit {

    projFile2Dict: ProjFile2Dict;
    isSaving: boolean;

    projfiles: ProjFiles[];

    dicten2cns: DictEn2Cn[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private projFile2DictService: ProjFile2DictService,
        private projFilesService: ProjFilesService,
        private dictEn2CnService: DictEn2CnService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projFilesService.query()
            .subscribe((res: ResponseWrapper) => { this.projfiles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.dictEn2CnService.query()
            .subscribe((res: ResponseWrapper) => { this.dicten2cns = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.projFile2Dict.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projFile2DictService.update(this.projFile2Dict));
        } else {
            this.subscribeToSaveResponse(
                this.projFile2DictService.create(this.projFile2Dict));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProjFile2Dict>) {
        result.subscribe((res: ProjFile2Dict) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProjFile2Dict) {
        this.eventManager.broadcast({ name: 'projFile2DictListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjFilesById(index: number, item: ProjFiles) {
        return item.id;
    }

    trackDictEn2CnById(index: number, item: DictEn2Cn) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-proj-file-2-dict-popup',
    template: ''
})
export class ProjFile2DictPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projFile2DictPopupService: ProjFile2DictPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projFile2DictPopupService
                    .open(ProjFile2DictDialogComponent as Component, params['id']);
            } else {
                this.projFile2DictPopupService
                    .open(ProjFile2DictDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
