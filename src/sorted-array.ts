import { isArray } from '@benzed/types'
import { binaryIndexOf } from './binary-search'

//// Types ////

type Sortable = number | { valueOf(): number }

type CompareFn<T> = NonNullable<Parameters<Array<T>['sort']>[0]>

//// Helper ////

function isSortedArray<T extends Sortable = number>(arr: unknown): boolean {
    if (!isArray<T>(arr)) return false

    if (arr.length <= 1) return true

    const ascending = arr[0] < arr[arr.length - 1]

    let prev = arr[0]
    for (let i = 1; i < arr.length; i++) {
        const curr = arr[i]
        const isSorted = ascending ? curr >= prev : curr <= prev
        if (!isSorted) return false

        prev = curr
    }

    return true
}

/**
 * Sorter method that places the items in an array in ascending order.
 */
function ascending<T>(a: T, b: T): number {
    //             ^ purposefully not extending Sortable
    //               method can be exported to be used
    //               on regular arrays.

    return (a as unknown as number) - (b as unknown as number)
}

/**
 * Sorter method that places the items in an array in descending order.
 */
function descending<T>(a: T, b: T): number {
    return (b as unknown as number) - (a as unknown as number)
}

//// Main ////

/**
 * @deprecated Extends built-in {@link Array} class, which doesn't
 * transpile nicely to older targets. Use {@link binaryFind} instead.
 */
class SortedArray<T extends Sortable> extends Array<T> {
    constructor(...params: readonly T[]) {
        // initialize array with length
        super(params.length)

        for (let i = 0; i < this.length; i++) this[i] = params[i]

        this.sort()
    }

    /**
     * Sorts the array in place, by default in ascending order.
     * A sorter method may be provided to apply custom sorting order.
     * @param sorter
     * @returns
     */
    override sort(sorter: CompareFn<T> = ascending): this {
        const { length } = this

        for (let i = 1; i < length; i++) {
            const item = this[i]

            let ii: number
            for (ii = i - 1; ii >= 0 && sorter(this[ii], item) > 0; ii--)
                this[ii + 1] = this[ii]

            this[ii + 1] = item
        }

        return this
    }

    /**
     * Returns true if the array is currently sorted.
     */
    get isSorted(): boolean {
        return isSortedArray(this)
    }

    /**
     * Returns a duplicate of this array. Extended array implementations
     * can't take advantage of the array spread operator `[...]`, so this
     * is provided as a convenience method for the rare occasions where
     * you'd like to copy an array in place before chaining a mutating
     * method.
     *
     * ```typescript
     *
     * const sa1 = new SortedArray(1,2,3)
     * const sa2 = sa1.copy().reverse()
     * //          ^ because [...sa1].reverse()
     * //          won't result in a SortedArray
     *
     * ```
     */
    copy(): SortedArray<T> {
        const clone = new SortedArray<T>()

        for (let i = 0; i < this.length; i++) clone[i] = this[i]

        return clone
    }

    /**
     * Returns the last index of a given value in the array using
     * binary search.
     * @param value
     * @returns found index or -1 if value cannot be found.
     */
    override lastIndexOf(value: T): number {
        let index = this._getIndexViaBinarySearch(value)

        // in case the array is in descending order
        while (this[index + 1] === value) index++

        return index
    }

    /**
     * Returns the first index of a given value in the array using
     * binary search.
     * @param value
     * @returns found index or -1 if value cannot be found.
     */
    override indexOf(value: T): number {
        let index = this._getIndexViaBinarySearch(value)

        // in case the array is in ascending order
        while (this[index - 1] === value) index--

        return index
    }

    override reverse(): this {
        return super.reverse.call(this) as this
        // this needs to be implemented because the inherited Array['reverse']
        // method return type seems to be `Array<T>` instead of `this`
    }

    //// Helper ////

    private _getIndexViaBinarySearch(value: T): number {
        return binaryIndexOf(this, value)
    }
}

//// Exports ////

export { isSortedArray, SortedArray, ascending, descending, Sortable }
