/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

import { IndexesOf } from './types'

//// Main ////

function nth<const T extends readonly any[], const I extends IndexesOf<T>>(
    input: T,
    index: I
): T[I]
function nth<T>(input: ArrayLike<T>, index: number): T
function nth(input: ArrayLike<unknown>, index: number) {
    const maxIndex = input.length - 1
    if (index > maxIndex || index < 0) {
        throw new Error(`No item at index ${index}`)
    }

    return input[index]
}

//// Exports ////

export { nth }
