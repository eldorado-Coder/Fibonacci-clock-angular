import { TimeService } from '../../app/services/time.service';

describe('Services:', () => {
  let services: TimeService;

  beforeEach(() => {
    services = new TimeService();
  });

  describe('formatHours', () => {

    it('should return 12 when hours are 0', () => {
      expect(services.formatHours(0)).toBe(12)
    })

    it('should return 1 when hours are 13', () => {
      expect(services.formatHours(13)).toBe(1)
    })
  })

  describe('formatMinutes', () => {

    it('should return 0 when passed 2 minutes and 29 seconds', () => {
      expect(services.formatMinutes(2, 29)).toBe(0)
    })

    it('should return 5 when passed 2 minutes and 30 seconds', () => {
      expect(services.formatMinutes(2, 30)).toBe(5)
    })

    it('should return 60 when passed 57 minutes and 30 seconds', () => {
      expect(services.formatMinutes(57, 30)).toBe(60)
    })
  })

  describe('formatTime', () => {

    it('should return 12 hours 0 minutes at midnight', () => {
      const expectedObj = {
        hours: 12,
        minutes: 0
      }

      expect(services.formatTime(0, 0, 0)).toEqual(expectedObj)
    })

    it('should return 1:00 for 1:02:29', () => {
      const expectedObj = {
        hours: 1,
        minutes: 0
      }

      expect(services.formatTime(1, 2, 29)).toEqual(expectedObj)
    })

    it('should return 1:05 for 1:02:30', () => {
      const expectedObj = {
        hours: 1,
        minutes: 5
      }

      expect(services.formatTime(1, 2, 30)).toEqual(expectedObj)
    })

    it('should round to next hour when at 57 minutes and 30 seconds', () => {
      const expectedObj = {
        hours: 1,
        minutes: 0
      }

      expect(services.formatTime(12, 57, 30)).toEqual(expectedObj)
    })

    it('should round to midnight when 11:57:30', () => {
      const expectedObj = {
        hours: 12,
        minutes: 0
      }

      expect(services.formatTime(11, 57, 30)).toEqual(expectedObj)
    })

  })

  describe('UPDATE_TIME', () => {

    
    it('updates currentTime with hours and minutes', () => {
      const hours = 14
      const minutes = 15
      const seconds = 20
      const initialState = {
        boxes: [
          { name: 'box1a', size: 1, represents: [] },
          { name: 'box1b', size: 1, represents: [] }
        ],
        currentTime: services.formatTime(12, 30, 45),
      }
      const expectedState = Object.assign({}, initialState, {
        currentTime: services.formatTime(hours, minutes, seconds)
      })

      expect(services.updateTime(hours, minutes, seconds)).toEqual(expectedState.currentTime)
    })
  })
})
