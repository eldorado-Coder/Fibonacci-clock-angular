import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import boxCombos from '../constants/boxCombos';
import boxes from '../constants/boxes';
import { Box } from '../models/box.model';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  initialTime = new Date();
  initialHours = this.initialTime.getHours();
  initialMinutes = this.initialTime.getMinutes();
  initialSeconds = this.initialTime.getSeconds();
  boxes = new BehaviorSubject(boxes);
  constructor() { }

  updateTime(hours = this.initialHours, minutes = this.initialMinutes, seconds = this.initialSeconds) {
    const newCurrentTime = this.formatTime(hours, minutes, seconds)
    this.boxes.next(this.updateBoxes(this.boxes.getValue(), newCurrentTime.hours, newCurrentTime.minutes));
    return {
      currentTime: newCurrentTime
    }
  }

   
  formatTime (hours: number, minutes: number, seconds: number) {
    let adjustedHours = this.formatHours(hours)
    let adjustedMinutes = this.formatMinutes(minutes, seconds)
  
    if (adjustedMinutes === 60) {
      adjustedHours = this.formatHours(hours + 1)
      adjustedMinutes = 0
    }
  
    return {
      hours: adjustedHours,
      minutes: adjustedMinutes
    }
  }

  
 formatMinutes (minutes: number, seconds: number) {
  const totalSeconds = (minutes * 60) + seconds
  return Math.round(totalSeconds / 300) * 5
}

 getRandomCombo (value: number) {
  const combosForValue = boxCombos[value]
  let randomCombo: any[] = []

  if (combosForValue.length) {
    randomCombo = combosForValue[Math.floor(Math.random() * combosForValue.length)]
  }

  return randomCombo
}

 updateBoxes (boxes: Box[], hours: number, minutes: number) {
  const comboForHours = this.getRandomCombo(hours)
  const comboForMinutes = this.getRandomCombo(minutes / 5)

    return boxes.map((box, index) => {
      const represents = []

      if (comboForHours.includes(index)) {
        represents.push('hours')
      }

      if (comboForMinutes.includes(index)) {
        represents.push('minutes')
      }

      return Object.assign({}, box, { represents })
    })
  }

  
 formatHours (hours: number) {
  if (hours === 0) {
    return 12
  } else if (hours > 12) {
    return hours - 12
  } else {
    return hours
  }
}

}
