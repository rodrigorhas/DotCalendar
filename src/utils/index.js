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
