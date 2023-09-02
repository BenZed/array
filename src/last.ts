/* eslint-disable @typescript-eslint/no-explicit-any */

import { nth } from './nth'

//// Type ////

type Last<T> = T extends [infer Ti] ? Ti : never

//// Main ////

/**
 * Returns the last element in the {@link ArrayLike}
 * @throws if empty.
 */
function last<const T extends readonly any[]>(arrayLike: T): Last<T>
function last<T>(arrayLike: ArrayLike<T>): T
function last(arrayLike: ArrayLike<unknown>) {
    const lastIndex = Math.max(arrayLike.length - 1, 0)
    return nth(arrayLike, lastIndex)
}

//// Exports ////

export { last }
