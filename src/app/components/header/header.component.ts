import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeService } from 'src/app/services/time.service';

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
  }

  onPrevious() {

  }
  
  onNext() {

  }
}