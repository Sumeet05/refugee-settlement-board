import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() value: string;
  @Input() color: string;
  
  constructor() { }

}
