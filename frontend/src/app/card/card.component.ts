import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import {MatCardModule} from '@angular/material/card';

import { Tag } from '../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
	@Input() tag: Tag;
	

  constructor(private router: Router) { }

  navigateToMainPage() {
  	this.router.navigate([`/mainpage/${this.tag.id}`]);
  }

}
