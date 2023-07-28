import { last } from './last'
import { it, expect } from '@jest/globals'

it('returns the last element of an array', () => {
    expect(last([1, 2, 3, 4, 5])).toEqual(5)
})

it('works on array-likes', () => {
    expect(last('string')).toEqual('g')
    expect(last({ 0: 'zero', length: 1 })).toEqual('zero')
})

it('return type for arrays is typeof array or undefined', () => {
    last([5]) satisfies number | undefined
})

it('return type for string is string', () => {
    last('cake') satisfies string
})

it('return type for array likes', () => {
    last({ 0: 'zero', length: 1 }) satisfies string | undefined
})

it('return type for readonly arrays is array type', () => {
    last(['a', 'b'] as readonly [string, string]) satisfies string
})

it('return type for const arrays is const item', () => {
    last([1, 2, 3] as const) satisfies 3
})
