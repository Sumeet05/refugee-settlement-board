import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  contactUs: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    feedback: new FormControl('', [Validators.required])
  });

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('feedback')
  }

}
