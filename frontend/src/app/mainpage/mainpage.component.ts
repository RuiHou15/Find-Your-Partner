import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { User, Note, Tag } from '../models';
import { AuthenticationService, UserService} from '../services';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  private tag: Tag;
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
        of(params.get('tag'))
    )).subscribe(tag_id => {
      this.userService.getTagById(+tag_id)
        .subscribe(tag => {
          this.tag = tag;
        })
      this.getNotesByTag(+tag_id);
    });
    

  }

  getNotesByTag(tag_id: number) {
    this.userService.getNotesByTag(tag_id).subscribe(
      data => {
        this.notes = data;
        this.notes.sort((a, b) => a.post_time > b.post_time ? -1 : 1);
      },
      error => {
        console.log(error);
      });
  }

}
