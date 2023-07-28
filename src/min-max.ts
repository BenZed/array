import type { Sortable } from './sorted-array'

/**
 * Returns the largest value in the provided parameters.
 * Differs from {@link Math.max} because objects adhering to the Sortable
 * interface can be provided as parameters as well.
 *
 * Unlike {@link Math.max}, it throws if no parameters have been provided.
 */
export function max<T extends Sortable>(...params: readonly T[]): T {
    let current: T | undefined = undefined
    for (const param of params) {
        if (current === undefined || param > current) current = param
    }

    if (current === undefined)
        throw new Error('At least one argument must be provided.')

    return current
}

/**
 * Returns the smallest value in the provided parameters.
 * Differs from {@link Math.min} because objects adhering to the Sortable
 * interface can be provided as parameters as well.
 *
 * Unlike {@link Math.min}, it throws if no parameters have been provided.
 */
export function min<T extends Sortable>(...params: readonly T[]): T {
    let current: T | undefined = undefined

    for (const param of params) {
        if (current === undefined || param < current) current = param
    }

    if (current === undefined)
        throw new Error('At least one argument must be provided.')

    return current
}
