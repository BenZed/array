//// Main ////

/**
 * @returns index of value in given {@link ArrayLike} via binary search.
 */
function binarySearch<T>(array: ArrayLike<T>, value: T): number {
    let min = 0
    let max = array.length

    const isAscending = array[0] < array[array.length - 1]

    while (min < max) {
        const mid = (min + max) >> 1
        const _value = array[mid]
        if (_value === value) return mid

        if (isAscending ? _value < value : _value > value) min = mid + 1
        else max = mid
    }

    return -1
}

//// Exports ////

export { binarySearch }
