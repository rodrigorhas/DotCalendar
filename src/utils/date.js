/**
 * @param {Moment} a
 * @param {Moment} b
 * @returns {boolean}
 */
export const isSameMonth = (a, b) => a.format('MM-YYYY') === b.format('MM-YYYY')

/**
 * @param {Moment} a
 * @param {Moment} b
 * @returns {boolean}
 */
export const isSameDay = (a, b) => a.format('DD-MM-YYYY') === b.format('DD-MM-YYYY')

/**
 * @param {Moment} date
 * @param {int} months
 */
export const addMonths = (date, months) => date.add(months, 'months')

/**
 * @param {Moment} date
 * @param {int} months
 */
export const subMonths = (date, months) => date.subtract(months, 'months')

/**
 * @param {Moment} date
 * @param {int} days
 */
export const addDays = (date, days) => date.add(days, 'days')

/**
 * @param {Moment} date
 * @param {int} days
 */
export const subDays = (date, days) => date.subtract(days, 'days')
