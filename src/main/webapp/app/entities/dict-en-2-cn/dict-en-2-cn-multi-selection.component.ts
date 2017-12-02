import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { ResponseWrapper, BaseFormField } from '../../shared';

import { DictEn2Cn } from './dict-en-2-cn.model';
import { DictEn2CnService } from './dict-en-2-cn.service';

@Component({
  selector: 'jhi-dict-en-2-cn-multi-selection',
  templateUrl: './dict-en-2-cn-multi-selection.component.html',
  providers: [
      {provide: NG_VALUE_ACCESSOR, useExisting: DictEn2CnMultiSelectionComponent, multi: true},
      NgbTypeaheadConfig
    ],
})
export class DictEn2CnMultiSelectionComponent extends BaseFormField<Array<DictEn2Cn>> {
    searching = false;
    searchFailed = false;
    selected: DictEn2Cn;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

    constructor(
        private config: NgbTypeaheadConfig,
        private dictEn2CnService: DictEn2CnService
    ) {
        super();
        config.showHint = true;
    }

    search = (text$: Observable<string>) =>
        text$
          .debounceTime(300)
          .distinctUntilChanged()
          .do(() => this.searching = true)
          .switchMap((term) =>
              this.dictEn2CnService.query({}, {'english.contains': term})
                  .do(() => this.searchFailed = false)
                  .map((r: ResponseWrapper) => r.json)
                  .catch(() => {
                      this.searchFailed = true;
                      return Observable.of([]);
                  }))
           .do(() => this.searching = false)
           .merge(this.hideSearchingWhenUnsubscribed);

    formatter = (x: {name: string}) => x.name;

    onSelect($event, input) {
        const item = $event.item;
        const itemlist = this.getValue();
        if (itemlist) {
            itemlist.push(item);
            this.forceOnChange();
        } else {
            this.setValue([item]);
        }
        $event.preventDefault();
        input.value = '';
    }

    onRemoveItem(idx: number) {
        super.getValue().splice(idx, 1);
        this.forceOnChange();
    }
}
