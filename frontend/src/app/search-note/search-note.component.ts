import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router';

import { UserService, AuthenticationService } from  '../services';
import { User, Note } from '../models';


@Component({
  selector: 'search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.css']
})
export class SearchNoteComponent implements OnInit {

	private currentUser : User;
	private searchResult: Note[];
	private searchContent = new FormControl('');

  constructor(
  	private router : Router,
  	private userService : UserService,
  	private authenticationService: AuthenticationService
  	) {
  		this.authenticationService.currentUser
  			.subscribe(user => {
  				this.currentUser = user;
  			})

  	 }

  ngOnInit() {
  }

  onSubmit() {
  	this.router.navigate([`/search/${this.searchContent.value}`]);
  }

}
