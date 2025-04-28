import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-therapienow-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './therapienow-form.component.html',
  styleUrl: './therapienow-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TherapienowFormComponent implements OnInit {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];

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
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl('')
      })
    ])
  });

  ngOnInit(): void {
    //EMPTY
  }

  addPhone() {
    this.form.controls.phones.insert(0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl('')
      })
    );

  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(e: Event) {
    console.log('form submitted::', this.form.value);
  }
}
