import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { ResponseWrapper, BaseFormField } from '../../shared';

import { DictSourceType } from './dict-source-type.model';
import { DictSourceTypeService } from './dict-source-type.service';

@Component({
  selector: 'jhi-dict-source-type-multi-selection',
  templateUrl: './dict-source-type-multi-selection.component.html',
  providers: [
      {provide: NG_VALUE_ACCESSOR, useExisting: DictSourceTypeMultiSelectionComponent, multi: true},
      NgbTypeaheadConfig
    ],
})
export class DictSourceTypeMultiSelectionComponent extends BaseFormField<Array<DictSourceType>> {
    searching = false;
    searchFailed = false;
    selected: DictSourceType;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

    constructor(
        private config: NgbTypeaheadConfig,
        private dictSourceTypeService: DictSourceTypeService
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
              this.dictSourceTypeService.query({}, {'name.contains': term})
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
