import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

import { Pin } from '../pin';
import { PinService } from '../pin.service';

import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core'

@Component({
  moduleId: module.id,
  selector: 'pin-form',
  templateUrl: 'pin-form.component.html',
  styleUrls: [ 'pin-form.component.css' ]
})

export class PinFormComponent {
  // model driven form http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
  form: FormGroup;
  pins: Pin[];
  pin:Pin;
  submitted = false;
  lat: number = 43.6006786;
  lng: number = 1.3628012;
  errorMess :string [];

    constructor(
      fb: FormBuilder,
      private router: Router,
      private pinService: PinService,
      
    ) {
        this.form = fb.group({
            "name": ["", Validators.required],
            "description":["", Validators.required],
            "adress":[""],
            "photoUrl":[""],
            "timestamp":["", Validators.required],
            "lat":["", Validators.required],
            "lng":["", Validators.required],
            "id":["", Validators.required]
        });
    }

   newPin(event:any):void{
    this.getPins();
    this.pin = new Pin();
    this.pin.lat = event.coords.lat;
    this.pin.lng = event.coords.lng;
    // this.pin.timestamp = new Date().getTime();
    this.form.controls['lat'].setValue(event.coords.lat);
    this.form.controls['lng'].setValue(event.coords.lng);
    this.form.controls['timestamp'].setValue(new Date().getTime());
    // this.form.patchValue({
    //     lat : event.coords.lat, 
    //     lng:event.coords.lng , 
    //     timestamp : new Date().getTime()});
  }

  getPins(): void {
    this.pinService.getPins()
        .then( (pins) => {
              this.pins = pins;
              this.form.controls['id'].setValue(this.pins[this.pins.length-1].id + 1);
              this.pin.id = this.pins[this.pins.length-1].id + 1;
        }).catch((ex) => {
          console.error('Error fetching pins', ex);
          this.errorMess.push ( "Error connecting with the server fetching the pins's data, retry later.");
        });
  }

  onSubmit(pin:Pin, isValid: boolean) {
    this.submitted = true;
    this.add(pin, isValid);
  }

  add(model:Pin, isValid: boolean): void {
    if (!isValid) { return; }
    // this.pin = new Pin({ model.id, model.name, model.lat, model.lng,model.description, model.timestamp, false, model.photoUrl, model.adress});
    // model2 = new Pin("id": model.id, "name": model.name, "lat": model.lat, "lng": model.lng, "description": model.description, "timestamp": model.timestamp, "moderated": false, "photoUrl": model.photoUrl, "adress": model.adress);
    this.pin.name = model.name;
    this.pin.description = model.description;
    this.pin.photoUrl = model.photoUrl;
    this.pin.adress = model.adress;
    this.pin.timestamp = new Date().getTime();
    
    this.pinService.create(this.pin)
      .then((pin) => { 
          this.pins.push(pin);
          this.router.navigate(['/detail', pin.id]);
      }).catch((ex) => {
        console.error('Error creating the pins', ex);
        this.errorMess.push ( "Error connection adding the pins, retry later.");
      });
  }
  get diagnostic() { return JSON.stringify(this.pin, null, 4); }

  get errormessage() { return this.errorMess.toString(); }

}
