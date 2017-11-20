import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProjFiles } from './proj-files.model';
import { ProjFilesService } from './proj-files.service';

@Component({
    selector: 'jhi-proj-files-detail',
    templateUrl: './proj-files-detail.component.html'
})
export class ProjFilesDetailComponent implements OnInit, OnDestroy {

    projFiles: ProjFiles;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projFilesService: ProjFilesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjFiles();
    }

    load(id) {
        this.projFilesService.find(id).subscribe((projFiles) => {
            this.projFiles = projFiles;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjFiles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projFilesListModification',
            (response) => this.load(this.projFiles.id)
        );
    }
}
