import { binaryIndexOf, binarySearch } from './binary-search'

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

//// Tests ////

describe(binaryIndexOf.name, () => {
    test('gets indexes', () => {
        expect(binaryIndexOf(numbers, 5)).toBe(4)
    })

    test('gets indexes of sortables', () => {
        const five = scores[5]
        expect(binaryIndexOf(scores, five)).toEqual(5)
    })

    test('gets non-indexes', () => {
        expect(binaryIndexOf(numbers, 101)).toBe(-1)

        const notInScores = new Score(1000)
        expect(binaryIndexOf(scores, notInScores)).toEqual(-1)
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

            const spyIndex = binaryIndexOf(spies, spy)
            expect(spyIndex).toBe(nonBinaryIndex)
            expect(spy.comparisons).toBeGreaterThan(0)
            expect(spy.comparisons).toBeLessThan(10)
        }
    })

    // TODO in a way that doesn't involve checking every index (and thus defeating the point)
    test.todo("throws if array isn't sorted")
})

describe(binarySearch.name, () => {
    //
    test('gets search results', () => {
        expect(binarySearch(numbers, 10)).toEqual({ index: 9, found: true })
    })

    test('gets results of sortables', () => {
        const twenty = scores[20]

        expect(binarySearch(scores, twenty)).toEqual({
            index: 20,
            found: true
        })
    })

    test('does not compare every value', () => {
        // proves that we are actually doing binary searches

        const nonBinaryIndexes = [12, 13, 91] as const

        for (const nonBinaryIndex of nonBinaryIndexes) {
            const spies = Array.from(
                { length: 100 },
                (_, i) => new ScoreSpy(i + 1)
            )
            const spy = spies[nonBinaryIndex]

            expect(spy.comparisons).toBe(0)

            const spyIndex = binarySearch(spies, spy).index
            expect(spyIndex).toBe(nonBinaryIndex)
            expect(spy.comparisons).toBeGreaterThan(0)
            expect(spy.comparisons).toBeLessThan(10)
        }
    })

    describe('result', () => {
        const everyThird = scores.filter(s => s.points % 3 === 0)
        test('false if value could not be found', () => {
            const thirtyOne = scores.find(s => s.points === 31) as Score
            expect(binarySearch(everyThird, thirtyOne)).toEqual({
                index: 10,
                found: false
            })
        })

        test('closest index below', () => {
            const tooSmall = new Score(-10)
            expect(binarySearch(everyThird, tooSmall)).toEqual({
                index: 0,
                found: false
            })
        })

        test('closest index above', () => {
            const tooBig = new Score(110)
            expect(binarySearch(everyThird, tooBig)).toEqual({
                index: everyThird.length - 1,
                found: false
            })
        })
    })
})
