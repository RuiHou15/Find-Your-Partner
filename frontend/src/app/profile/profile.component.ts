import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { User, Note, Tag } from '../models';
import { AuthenticationService, UserService} from '../services';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  private user: User;
  
  constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
    	

    }

  ngOnInit() {
  	this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('user_id'))
    )).subscribe(user_id => {
      this.userService.getUserById(user_id)
        .subscribe(user => {
          this.user = user;
        })

    });
  }

}
