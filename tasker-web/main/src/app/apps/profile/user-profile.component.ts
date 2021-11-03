import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {Observable, Subject, Subscription} from "rxjs";
import {User} from "../../common/model/User";
import {ActivatedRoute} from "@angular/router";
import {filter, takeUntil, tap} from "rxjs/operators";
import {GetCurrentUser, GetProfileError, GetUserProfile} from "../../common/store/store.selectors";
import {
  ClearBreadCrumbs,
  ClearErrors,
  LoadUserProfile,
  UpdateUserProfile, UpdateUserProflieParams,
  UploadUserProfileImage
} from "../../common/store/store.actions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-contacts',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  showSidebar = false;
  viewMode = true;
  editSave = 'Edit';
  private destroy$ = new Subject();
  profileFormGroup: FormGroup;
  imagePreview: string | ArrayBuffer;
  userProfile: User;
  selectedFile: File;
  shouldRemoveImage = false;

  userProfile$: Observable<User>;
  currentUser$: Observable<User>;
  profileError$: Observable<string>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
  ) {
  }


  ngOnInit() {

    this.store.dispatch(ClearBreadCrumbs());

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.store.dispatch(LoadUserProfile({username: params.username}))
    });

    this.userProfile$ = this.store.select(GetUserProfile).pipe(
      filter(userProfile => !!userProfile),
      tap(userProfile => {
        this.userProfile = userProfile;
        this.initializeProfileFormGroup(userProfile);
        if (!!userProfile.image) {
          this.imagePreview = this.getImagePreview(userProfile.image);
        } else {
          this.shouldRemoveImage = true;
        }
        this.setViewMode(true);
      })
    );

    this.currentUser$ = this.store.select(GetCurrentUser);
    this.profileError$ = this.store.select(GetProfileError)
  }

  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  removeImage(){
    this.shouldRemoveImage = true;
    this.selectedFile = null;
  }

  editUser() {
    if (this.viewMode) {
      this.setViewMode(false)
    } else if (this.profileFormGroup.valid) {

      this.store.dispatch(UpdateUserProfile({
        userProfile: this.getUserProfile(),
        image: this.selectedFile
      }));
    }
  }

  onCancel() {
    this.setViewMode(true);
    this.initializeProfileFormGroup(this.userProfile);
    this.imagePreview = this.getImagePreview(this.userProfile.image);
    this.store.dispatch(ClearErrors());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  preview(files: FileList) {
    if (files.length === 0) {
      return;
    }
    this.selectedFile = files[0];
    if (this.selectedFile.type.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }
    this.shouldRemoveImage = false;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
  }

  private setViewMode(value: boolean) {
    this.viewMode = value;
    this.editSave = value ? 'Edit' : 'Save';
  }

  private initializeProfileFormGroup(userProfile: User) {
    this.profileFormGroup = this.fb.group({
      username: [{value: userProfile.username, disabled: true}],
      firstName: [userProfile.firstName, Validators.required],
      lastName: [userProfile.lastName, Validators.required],
      email: [userProfile.email, Validators.email],
    });
  }

  private getUserProfile(): User {
    const userProfile: User = {};
    let fieldValue;

    Object.keys(this.profileFormGroup.controls).forEach(key => {
      fieldValue = this.profileFormGroup.get(key).value;
      userProfile[key] = fieldValue
    });

    return userProfile;
  }

  private getImagePreview(image: Blob) {
    return 'data:image/jpeg;base64,' + image;
  }
}
