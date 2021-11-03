import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {merge, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {User} from "../../model/User";

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss']
})
export class UserAutocompleteComponent implements OnInit {

  @Input() users: User[];
  @Input() user: any;

  @Output() valueChanged = new EventEmitter();
  @Output() blur = new EventEmitter();

  @ViewChild('instance', { static: true })
  instance = Object.create(null);

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

    constructor() { }

  ngOnInit(): void {
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.users : this.users
        .filter(u => (u.firstName+u.lastName).toLowerCase().indexOf(term.toLowerCase()) > -1))
        .slice(0, 10))
    );
  };

  formatter = (user: User) => user.firstName + ' ' + user.lastName;

  onModelChange() {
    if (!!this.user.username ) {
      this.valueChanged.emit(this.user);
    } else {
      this.valueChanged.emit(null);
    }
  }

  onBlur() {
    this.blur.emit();
  }
}
