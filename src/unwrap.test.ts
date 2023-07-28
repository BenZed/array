import { unwrap } from './unwrap'
import { it, expect } from '@jest/globals'

it('ensures an input is not an array', () => {
    const obj = {}

    expect(unwrap([obj])).toEqual(obj)
})

it('returns the input if it is not an array', () => {
    const obj = {}

    expect(unwrap(obj)).toEqual(obj)
})

it('return type for non arrays is same as input', () => {
    unwrap(true) satisfies boolean
})

it('return type for arrays is typeof array or undefined', () => {
    unwrap([5]) satisfies number | undefined
})

it('return type for readonly arrays is array type', () => {
    const readonlyArr = ['a'] as readonly [string]
    const result = unwrap(readonlyArr)
    result satisfies string
})

it('return type for const arrays is const item', () => {
    const readonlyArr = [1, 2, 3] as const
    const result = unwrap(readonlyArr)
    result satisfies 1
})
