import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DictEn2Cn } from './dict-en-2-cn.model';
import { DictEn2CnService } from './dict-en-2-cn.service';

@Injectable()
export class DictEn2CnPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dictEn2CnService: DictEn2CnService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dictEn2CnService.find(id).subscribe((dictEn2Cn) => {
                    dictEn2Cn.modified_date = this.datePipe
                        .transform(dictEn2Cn.modified_date, 'yyyy-MM-ddTHH:mm:ss');
                    dictEn2Cn.consumed_date = this.datePipe
                        .transform(dictEn2Cn.consumed_date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dictEn2CnModalRef(component, dictEn2Cn);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dictEn2CnModalRef(component, new DictEn2Cn());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dictEn2CnModalRef(component: Component, dictEn2Cn: DictEn2Cn): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dictEn2Cn = dictEn2Cn;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
