//// Implementation ////

function getBinarySearchResult<T>(
    array: ArrayLike<T>,
    value: T
): BinarySearchResult {
    let min = 0
    let max = array.length

    const isAscending = array[0] < array[array.length - 1]

    while (min < max) {
        const mid = (min + max) >> 1
        const _value = array[mid]
        if (_value === value) return { index: mid, found: true }

        if (isAscending ? _value < value : _value > value) min = mid + 1
        else max = mid
    }

    const closest = Math.min(max, array.length - 1)

    return { index: closest, found: false }
}

//// Interface ////

export interface BinarySearchResult {
    /**
     * True if the given value was found at
     * the accompanying {@link index}.
     */
    readonly found: boolean

    /**
     * Index of the given value. If {@link found} is false, then
     * this value represents the closest value.
     */
    readonly index: number
}
/**
 * Return the closest index to the given
 */
export function binarySearch<T>(
    array: ArrayLike<T>,
    value: T
): BinarySearchResult {
    return getBinarySearchResult(array, value)
}

/*
 * @returns index of value in given {@link ArrayLike} via binary search.
 */
export function binaryIndexOf<T>(array: ArrayLike<T>, value: T): number {
    const { found, index } = getBinarySearchResult(array, value)
    return found ? index : -1
}
