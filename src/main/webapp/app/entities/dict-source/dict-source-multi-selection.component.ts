import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { ResponseWrapper, BaseFormField } from '../../shared';

import { DictSource } from './dict-source.model';
import { DictSourceService } from './dict-source.service';

@Component({
  selector: 'jhi-dict-source-multi-selection',
  templateUrl: './dict-source-multi-selection.component.html',
  providers: [
      {provide: NG_VALUE_ACCESSOR, useExisting: DictSourceMultiSelectionComponent, multi: true},
      NgbTypeaheadConfig
    ],
})
export class DictSourceMultiSelectionComponent extends BaseFormField<Array<DictSource>> {
    searching = false;
    searchFailed = false;
    selected: DictSource;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

    constructor(
        private config: NgbTypeaheadConfig,
        private dictSourceService: DictSourceService
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
              this.dictSourceService.query({}, {'name.contains': term})
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
