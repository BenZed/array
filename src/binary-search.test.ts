import { binarySearch } from './binary-search'

import { test, expect, describe } from '@jest/globals'

//// Setup ////

class Score {
    constructor(readonly points: number) {}

    valueOf() {
        return this.points
    }
}

class ScoreSpy extends Score {
    comparisons = 0
    override valueOf(): number {
        this.comparisons++
        return super.valueOf()
    }
}

const numbers = Array.from({ length: 100 }, (_, i) => i + 1)
const scores = Array.from({ length: 100 }, (_, i) => new Score(i + 1))

// const evenNumbers = numbers.filter((_, i) => i % 2 === 0)
// const evenScores = scores.filter(s => s.points % 2 === 0)

//// Tests ////

describe(binarySearch.name, () => {
    test('gets indexes', () => {
        expect(binarySearch(numbers, 5)).toBe(4)
    })

    test('gets indexes of sortables', () => {
        const five = scores[5]
        expect(binarySearch(scores, five)).toEqual(5)
    })

    test('gets non-indexes', () => {
        expect(binarySearch(numbers, 101)).toBe(-1)

        const notInScores = new Score(1000)
        expect(binarySearch(scores, notInScores)).toEqual(-1)
    })

    test('does not compare every value', () => {
        // proves that we are actually doing binary searches

        const nonBinaryIndexes = [25, 51, 76] as const

        for (const nonBinaryIndex of nonBinaryIndexes) {
            const spies = Array.from(
                { length: 100 },
                (_, i) => new ScoreSpy(i + 1)
            )
            const spy = spies[nonBinaryIndex]

            expect(spy.comparisons).toBe(0)

            const spyIndex = binarySearch(spies, spy)
            expect(spyIndex).toBe(nonBinaryIndex)
            expect(spy.comparisons).toBeGreaterThan(0)
            expect(spy.comparisons).toBeLessThan(10)
        }
    })

    // TODO in a way that doesn't involve checking every index (and thus defeating the point)
    test.todo("throws if array isn't sorted")
})
