import {
  dayClass,
  dayNames,
  monthName,
  selectedDayToCalendarDay,
} from './utils'

describe('dayClass', () => {
  const weekendDay = {
    month: 1,
    year: 2020,
    weekDay: { dayInMonth: 5, dayInWeek: 6, month: { month: 1, year: 2019 } },
  }

  it('should set weekend class', () => {
    expect(dayClass(weekendDay)).toContain('day')
  })

  it('should set weekend class', () => {
    expect(dayClass(weekendDay)).toContain('weekend')
  })

  it('should set other-moth class for 2019', () => {
    expect(dayClass(weekendDay)).toContain('other-month')
  })

  it('should set selected class', () => {
    expect(
      dayClass({ ...weekendDay, selectedDay: { day: 5, month: 1, year: 2019 } })
    ).toContain('selected')
  })

  it('should set `in-range` class', () => {
    expect(
      dayClass({
        month: 1,
        year: 2020,
        weekDay: {
          dayInMonth: 7,
          dayInWeek: 2,
          month: { month: 1, year: 2020 },
        },
        rangeStart: { day: 6, month: 1, year: 2020 },
        rangeEnd: { day: 12, month: 1, year: 2020 },
      })
    ).toContain('in-range')
  })

  it('should set `range-select-in-progress` class', () => {
    expect(
      dayClass({
        month: 1,
        year: 2020,
        weekDay: {
          dayInMonth: 7,
          dayInWeek: 2,
          month: { month: 1, year: 2020 },
        },
        rangeStart: { day: 6, month: 1, year: 2020 },
      })
    ).toContain('range-select-in-progress')
  })
})

describe('dayNames', () => {
  it('returns english day names by default', () => {
    expect(dayNames(0)).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
  })

  it('returns slovenian day names when correct locale is set', () => {
    expect(dayNames(1, 'sl-SI')).toEqual([
      'po',
      'to',
      'sr',
      'če',
      'pe',
      'so',
      'ne',
    ])
  })
})

describe('monthName', () => {
  it('returns english month name by default', () => {
    expect(monthName(2020, 1)).toBe('January')
  })

  it('returns slovenian month name when correct locale is set', () => {
    expect(monthName(2020, 1, 'sl-SI')).toBe('januar')
  })
})

describe('selectedDayToCalendarDay', () => {
  it('parses dd-mm-yyyy', () => {
    expect(selectedDayToCalendarDay('2020-02-01')).toEqual({
      day: 1,
      month: 2,
      year: 2020,
    })
  })
})
