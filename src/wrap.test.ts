import { wrap } from './wrap'

import { it, expect } from '@jest/globals'

it('ensures an input is an array', () => {
    expect(wrap(5)).toBeInstanceOf(Array)
    expect(wrap(5)).toEqual([5])
})

it('returns the input if it is an array', () => {
    const arr = [1]
    expect(wrap(arr)).toEqual(arr)
    expect(wrap(arr) === arr).toBe(true)
})

it('return type is array of input type', () => {
    wrap({ flag: true }) satisfies { flag: boolean }[]
    wrap('string') satisfies string[]
    wrap(5) satisfies number[]

    wrap([true]) satisfies boolean[]
    wrap(['string']) satisfies string[]
    wrap([5]) satisfies number[]
})

it('return type retains readonly modifier', () => {
    const readonlyArr: readonly string[] = ['a']
    wrap(readonlyArr) satisfies readonly string[]
})

it('return type retains const modifier', () => {
    const constArr = ['a'] as const
    wrap(constArr) satisfies readonly ['a']
})

it.skip('return type works with keys', () => {
    // type StringKey<T> = Extract<keyof T, string>
    // type Mask<T> = readonly StringKey<T>[]
    // const subscribe = <T>(mask?: Mask<T> | Mask<T>[number]): void => {
    //     // there should *not* be a type error here
    //     const masked: Mask<T> = mask ? wrap(mask) : []
    //     void masked
    // }
    // void subscribe
})
