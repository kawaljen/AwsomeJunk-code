import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

import { Comment } from '../../comment';
import { CommentService } from '../../comment.service';

@Component({
  moduleId: module.id,
  selector: 'my-comments',
  templateUrl: 'pin-comments.component.html',
  styleUrls: [ 'pin-comments.component.css' ],
  providers: [CommentService]
})

export class PinCommentsComponent implements OnInit {
  @Input() pinId : number;
  form: FormGroup;
  comments: Comment[];
  comment : Comment;
  errorMess :string [];
  submited = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService,
    fb: FormBuilder,) {
        this.form = fb.group({
            "description":["", Validators.required],
            "photoUrl":[""],
        });

     }

  // getComments(): void {
  //   this.commentService.getComments()
  //     .then( comments => this.comments = comments)
  //     .catch((ex) => {
  //       console.error('Error fetching comments', ex);
  //       this.errorMess.push ( "Error fetching the comments's data, retry later.");
  //     });
  // }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.commentService.getComments(+params['id']))
      .subscribe(comments => this.comments = comments);
  }

  onSubmit(value:any) {
    this.comment= new Comment( this.pinId, value.description, new Date().getTime() );
    this.addCommment(this.comment);
    this.form.reset();
  }

  addCommment(comment: Comment): void {
    this.commentService.create(comment)
      .then(comment => {
        this.comments.push(comment);
        this.submited = true;
      }).catch((ex) => {
        console.error('Error adding the comment', ex);
        this.errorMess.push ( "Error adding the comment, retry later.");
      });
  }

//   delete(comment: Comment): void {
//     this.commentService
//         .delete(comment.id)
//         .then(() => {
//           this.comments = this.comments.filter(h => h !== comment);
//           if (this.selectedPin === comment) { this.selectedPin = null; }
//         }).catch((ex) => {
//           console.error('Error deleting the comment', ex);
//           this.errorMess.push ( "Error deleting the comment, retry later.");
//         });
//   }
  get errormessage() { return this.errorMess.toString(); }
}
