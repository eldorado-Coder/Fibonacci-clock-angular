import { Component, OnDestroy, OnInit } from '@angular/core';
import colors from '../../constants/colors';
import { Box } from '../../models/box.model';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  
})
export class ClockComponent implements OnInit, OnDestroy {
  title = 'fibonacci-angular-test';
  colors = colors.default;
  boxes:Box[] = [];

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    this.timeService.updateTime(hours, minutes, seconds)

    this.timeService.boxes.subscribe((res) => this.boxes = res);
  }
  
  getColorIndex(represents: string[]) {
    if (represents.length === 1 && represents[0] === 'hours') {
      return 1;
    } else if (represents.length === 1 && represents[0] === 'minutes') {
      return 2;
    } else if (represents.length === 2) {
      return 3;
    } else return 0;
  }

  ngOnDestroy(): void {
    this.timeService.boxes.unsubscribe();
  }

}
