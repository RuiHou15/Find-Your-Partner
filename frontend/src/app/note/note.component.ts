import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Note, User, Comment } from '../models';

import { UserService, AuthenticationService } from '../services';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  private user: User;
  private currentUser: User;
  private comments: Comment[];
  private commentContent = new FormControl('');
  private liked: Boolean;
  private avatar: string;
  
  constructor(
    private authenticationService: AuthenticationService,
  	private router: Router,
  	private userService: UserService) { 
    
    }

  ngOnInit() {
    this.avatar = "https://en.wikipedia.org/wiki/North_Carolina_Tar_Heels#/media/File:North_Carolina_Tar_Heels_logo.svg"
 
    this.authenticationService.currentUser
      .subscribe(user => {
        this.currentUser = user;
        this.userService.liked(this.currentUser.user_id, this.note.id)
          .subscribe(res => {
            this.liked = res;
            console.log(this.liked);
          })
      });

  	this.userService.getUserById(this.note.user_id)
  		.subscribe(user => {
  			this.user = user;
  		});

    this.userService.getCommentsByNoteId(this.note.id)
      .subscribe(comments => {
        this.comments = comments;
        this.comments.forEach(
          comment => {
            this.userService.getUserById(comment.user_id)
            .subscribe(user => {
              comment['name'] = user.name;
            })
          })
      });
  }

  gotoProfile(user_id:string) {
  	this.router.navigate([`/profile/${user_id}`]);
  }

  postComment() {
    let comment = new Comment(this.note.id, this.currentUser.user_id, this.commentContent.value, new Date());
    this.userService.postComment(comment)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => {
          console.log(error);
        }
        );
  }

  like() {
    if (this.liked) {
      return;
    }
    this.userService.like(this.currentUser.user_id, this.note.id)
      .subscribe(res => {
        this.liked = res;
        console.log(this.liked);
      })
  }



  timeSince(post_time: Date) {
    let now = new Date();
    var seconds = Math.floor((now.getTime() - new Date(post_time).getTime()) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

}
