import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

import { Tag } from '../models';
import { TagService } from '../services';
import { baseUrl } from '../services/url';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private tags: Tag[];
	private urlPrefix: string;

  constructor(private tagService: TagService) { 

  }

  ngOnInit() {
  	this.urlPrefix = baseUrl;
  	this.tagService.getAllTags().subscribe(tags => {
  		this.tags = tags;
  		this.tags.forEach(tag => {
  			tag.image = this.urlPrefix.concat(tag.image);
  		})
  	})

  }


}
