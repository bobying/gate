import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { ResponseWrapper, BaseFormField } from '../../shared';

import { DictSourceType } from './dict-source-type.model';
import { DictSourceTypeService } from './dict-source-type.service';

@Component({
  selector: 'jhi-dict-source-type-selection',
  templateUrl: './dict-source-type-selection.component.html',
  providers: [
      {provide: NG_VALUE_ACCESSOR, useExisting: DictSourceTypeSelectionComponent, multi: true},
      NgbTypeaheadConfig
    ],
})
export class DictSourceTypeSelectionComponent extends BaseFormField<DictSourceType> {
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
      this.setValue(item);
      $event.preventDefault();
      input.value = item.name;
    }

}
