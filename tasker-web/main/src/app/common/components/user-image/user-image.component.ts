import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/User";

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public initialsStyle: string;

  @Input()
  public imageStyle: string;

  constructor() { }

  ngOnInit(): void {
  }

  private getImage(image: Blob) {
    return 'data:image/jpeg;base64,' + image;
  }
}
