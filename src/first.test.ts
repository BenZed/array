import { first } from './first'

import { it, expect } from '@jest/globals'

//// Tests ////

it('returns the first element of an array', () => {
    expect(first([1, 2, 3, 4, 5])).toEqual(1)
})

it('works on strings', () => {
    expect(first('string')).toEqual('s')
})

it('works on other array likes', () => {
    expect(
        first({
            0: 'zero',
            length: 1
        })
    ).toEqual('zero')
})

it('return type for arrays is typeof array or undefined', () => {
    first([5]) satisfies number | undefined
})

it('return type for string is string', () => {
    first('cake') satisfies string
})

it('return type for array likes', () => {
    first({ 0: 'zero', length: 1 }) satisfies string | undefined
})

it('return type for tuples', () => {
    first(['a'] as [string]) satisfies string
})

it('return type for const arrays is const item', () => {
    first([1, 2, 3] as const) satisfies 1
})
