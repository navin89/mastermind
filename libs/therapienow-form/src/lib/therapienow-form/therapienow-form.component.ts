import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-therapienow-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './therapienow-form.component.html',
  styleUrl: './therapienow-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TherapienowFormComponent implements OnInit {

  form= new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    address: new FormGroup({
      fullAddress: new FormControl(''),
      city: new FormControl(''),
      postcode: new FormControl(0),
    }),
    phones: new FormArray([
      new FormControl(''),
    ])
  });

  ngOnInit(): void {
    //EMPTY
  }

  addPhone() {
    this.form.controls.phones.insert(0, new FormControl());
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }
}
