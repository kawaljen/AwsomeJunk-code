import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { PinService } from '../pin.service';
import { Pin } from '../pin';

import { PinCommentsComponent } from './pin-comments/pin-comments.component';

import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core'

@Component({
  moduleId: module.id,
  selector: 'my-pin-detail',
  templateUrl: 'pin-detail.component.html',
  styleUrls: [ 'pin-detail.component.css' ],
  // directives : [PinCommentsComponent]
  // declare child compenent pin-comments here ????
})

export class PinDetailComponent implements OnInit {
  @Input() pin: Pin;

  constructor(
    private pinService: PinService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.pinService.getPin(+params['id']))
      .subscribe(pin => this.pin = pin);
  }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   this.pinService.update(this.pin)
  //     .then(() => this.goBack())
  //     .catch((ex) => {
  //       console.error('Error fetching at save ftc', ex);
  //     });
  // }
}
