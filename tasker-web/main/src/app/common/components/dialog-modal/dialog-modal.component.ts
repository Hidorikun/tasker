import {Component, Input, OnInit} from '@angular/core';

export enum DialogModalStyleEnum {
  DANGER,
  INFO,
  WARNING
}

export interface DialogModalData {
  title: string;
  message: string;
  actionButtonMessage: string;
  actionButtonStyle: DialogModalStyleEnum;
}
@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {

  @Input()
  modal: any;

  @Input()
  data: DialogModalData;

  dialogModalStyleEnum = DialogModalStyleEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onAction() {
    this.modal.close(true);
  }
}
