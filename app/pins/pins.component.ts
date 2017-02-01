import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Pin } from '../pin';
import { PinService } from '../pin.service';

import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core'

@Component({
  moduleId: module.id,
  selector: 'my-pins',
  templateUrl: 'pins.component.html',
  styleUrls: [ 'pins.component.css' ],
  providers: [PinService]
})

export class PinsComponent implements OnInit {
  pins: Pin[];
  lat: number = 43.6006786;
  lng: number = 1.3628012;
  errorMess :string [];

  constructor(
    private router: Router,
    private pinService: PinService) { }

  getPins(): void {
    this.pinService.getPins()
      .then( pins => this.pins = pins)
      .catch((ex) => {
        console.error('Error fetching pins', ex);
        // this.errorMess.push ( "Error fetching the pins's data, retry later.");
      });
  }

  ngOnInit(): void {
    this.getPins();
  }

  onSelect(pin: Pin): void {
    // this.selectedPin = pin;
  }


  gotoDetail(id:number): void {
    this.router.navigate(['/detail', id]);
  }

  // add(pin: Pin): void {
  //  // name = name.trim();
  //   //if (!name) { return; }
  //   this.pinService.create(pin)
  //     .then(pin => {
  //       this.pins.push(pin);
  //     }).catch((ex) => {
  //       console.error('Error adding the pin', ex);
  //       this.errorMess.push ( "Error adding the pin, retry later.");
  //     });
  // }

  // delete(pin: Pin): void {
  //   this.pinService
  //       .delete(pin.id)
  //       .then(() => {
  //         this.pins = this.pins.filter(h => h !== pin);
  //       }).catch((ex) => {
  //         console.error('Error deleting the pin', ex);
  //         this.errorMess.push ( "Error deleting the pin, retry later.");
  //       });
  // }
  get errormessage() { return this.errorMess.toString(); }
}
