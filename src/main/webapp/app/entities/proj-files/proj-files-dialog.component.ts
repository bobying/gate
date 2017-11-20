import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjFiles } from './proj-files.model';
import { ProjFilesPopupService } from './proj-files-popup.service';
import { ProjFilesService } from './proj-files.service';
import { Proj, ProjService } from '../proj';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-proj-files-dialog',
    templateUrl: './proj-files-dialog.component.html'
})
export class ProjFilesDialogComponent implements OnInit {

    projFiles: ProjFiles;
    isSaving: boolean;

    projs: Proj[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private projFilesService: ProjFilesService,
        private projService: ProjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projService.query()
            .subscribe((res: ResponseWrapper) => { this.projs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.projFiles.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projFilesService.update(this.projFiles));
        } else {
            this.subscribeToSaveResponse(
                this.projFilesService.create(this.projFiles));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProjFiles>) {
        result.subscribe((res: ProjFiles) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProjFiles) {
        this.eventManager.broadcast({ name: 'projFilesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjById(index: number, item: Proj) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-proj-files-popup',
    template: ''
})
export class ProjFilesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projFilesPopupService: ProjFilesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projFilesPopupService
                    .open(ProjFilesDialogComponent as Component, params['id']);
            } else {
                this.projFilesPopupService
                    .open(ProjFilesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
