import { shuffle } from './shuffle'
import { it, expect } from '@jest/globals'
// Because shuffle could theoretically break tests do to it's random nature,
// We run each test a 10000 times. If less than 99% of these 10000 tests pass,
// something is wrong.

function deChancify<T>(
    doFunc: () => ArrayLike<T>,
    testFunc: (input: ArrayLike<T>) => void
): void {
    const MAX = 10000
    const THRESHOLD = MAX * 0.99

    let passes = 0
    for (let i = 0; i < MAX; i++) {
        const result = doFunc()
        try {
            testFunc(result)
            passes++
        } catch {
            //
        }
    }

    expect(passes).toBeGreaterThanOrEqual(THRESHOLD)
}

const array = [0, 1, 2, 3, 4, 5, 6]

it('randomly orders an array', () => {
    deChancify(
        () => shuffle([...array]),
        result => expect(result).not.toEqual(array)
    )
})

it('works on array-likes', () => {
    const arrayLike = {
        length: 6,
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e',
        5: 'f'
    }

    deChancify(
        () => shuffle({ ...arrayLike }),
        result => expect(result).not.toEqual(arrayLike)
    )
})

it('returns input mutated', () => {
    expect(shuffle(array)).toEqual(array)
})

it('work on buffers', () => {
    const buffer = Buffer.from(array)
    expect(() => shuffle(buffer)).not.toThrow()
})

it('optionally bindable', () => {
    const arrayLike = {
        length: 6,
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e',
        5: 'f',
        shuffle
    }

    deChancify(
        () => ({ ...arrayLike }).shuffle(),
        output => expect(output).not.toEqual(arrayLike)
    )
})
