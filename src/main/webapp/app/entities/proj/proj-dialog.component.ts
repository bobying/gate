import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Proj } from './proj.model';
import { ProjPopupService } from './proj-popup.service';
import { ProjService } from './proj.service';

@Component({
    selector: 'jhi-proj-dialog',
    templateUrl: './proj-dialog.component.html'
})
export class ProjDialogComponent implements OnInit {

    proj: Proj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private projService: ProjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.proj.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projService.update(this.proj));
        } else {
            this.subscribeToSaveResponse(
                this.projService.create(this.proj));
        }
    }

    private subscribeToSaveResponse(result: Observable<Proj>) {
        result.subscribe((res: Proj) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Proj) {
        this.eventManager.broadcast({ name: 'projListModification', content: 'OK'});
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
    selector: 'jhi-proj-popup',
    template: ''
})
export class ProjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projPopupService: ProjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projPopupService
                    .open(ProjDialogComponent as Component, params['id']);
            } else {
                this.projPopupService
                    .open(ProjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
