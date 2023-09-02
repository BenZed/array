import { nth } from './nth'
import { resolveIndex } from './resolve-index'

//// Shortcuts ////

const { indexOf } = Array.prototype

/**
 * Get the value adjacent to a given value in an Array, wrapping around to the
 * beginning or end.
 *
 * If the value is not in the given array, it will return the first value in the
 * array.
 *
 * @param haystack {@link ArrayLike}  to check
 * @param needle value to check
 * @param delta index offset of the given value to return, defaults to 1
 * @throws if {@link ArrayLike} is empty
 */
function adjacent<T>(haystack: ArrayLike<T>, needle: T, delta = 1): T {
    const { length } = haystack

    const index = indexOf.call(haystack, needle) + delta
    const indexResolved = resolveIndex(length, index)

    return nth(haystack, indexResolved)
}

//// Exports ////

export { adjacent }
