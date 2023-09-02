/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

import { nth } from './nth'

//// Main ////

function first<const T extends readonly any[]>(input: T): T[0]
function first<T>(input: ArrayLike<T>): T
function first(input: ArrayLike<unknown>) {
    return nth(input, 0)
}

//// Exports ////

export { first }
