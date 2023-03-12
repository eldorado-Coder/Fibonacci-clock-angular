export class currentTime {
    hours: number;
    minutes: number;

    constructor () {
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes()
    }
}