import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { User, Note, Tag } from '../models';
import { AuthenticationService, UserService} from '../services';


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private searchContent: string;
  private currentUser: User;
  private notes: Note[];

  constructor(
  		private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
    	
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {

  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('searchContent'))
    )).subscribe(searchContent => {
    	this.searchContent = searchContent;
      	this.userService.searchNotes(searchContent)
        	.subscribe(notes => {
          	this.notes = notes;
          	this.notes.sort((a, b) => a.post_time > b.post_time ? -1 : 1);
        })
    });
    
  }


}
