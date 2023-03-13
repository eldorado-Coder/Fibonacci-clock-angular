import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeService } from 'src/app/services/time.service';
import { pairwise } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentTimeForm!: FormGroup;

  constructor(private fb: FormBuilder, public timeService: TimeService) { }
  
  ngOnInit(): void {
    this.currentTimeForm = this.fb.group({
      hours: ['', Validators.compose([Validators.min(0), Validators.max(24)])],
      minutes: ['', Validators.compose([Validators.min(0), Validators.max(59)])],
    });
    this.currentTimeForm.get("hours")?.valueChanges.pipe(pairwise()).subscribe(([prev, next])  => {
      if (next < 0 || next > 11 || next.toString().indexOf('.') > 0 || next.toString().indexOf('-') > 0) {
        this.currentTimeForm.get("hours")?.setValue(prev);
      } 
    })
    this.currentTimeForm.get("minutes")?.valueChanges.pipe(pairwise()).subscribe(([prev, next])  => {
      if (next < 0 || next > 60 || next.toString().indexOf('.') > 0 || next.toString().indexOf('-') > 0) {
        this.currentTimeForm.get("minutes")?.setValue(prev);
      } 
    })
  }

  onPrevious() {
    let now = new Date()
    now.setHours(this.timeService.currentTime.hours);
    now.setMinutes(this.timeService.currentTime.minutes - 5);
    this.timeService.currentTime = {
      hours: now.getHours(),
      minutes: now.getMinutes()
    }
    this.timeService.storeCurrentTime();
  }
  
  onNext() {
    let now = new Date()
    now.setHours(this.timeService.currentTime.hours);
    now.setMinutes(this.timeService.currentTime.minutes + 5);
    this.timeService.currentTime = {
      hours: now.getHours(),
      minutes: now.getMinutes()
    }
    this.timeService.storeCurrentTime();
  }
}
