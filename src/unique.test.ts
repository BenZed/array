import { unique } from './unique'
import { inspect } from 'util'
import { it, expect, describe } from '@jest/globals'

describe('removes duplicate items from input array', () => {
    it('[0,0,1,1,2,2,3,3] >> [0,1,2,3]', () => {
        const arr = [0, 0, 1, 1, 2, 2, 3, 3]
        unique(arr)
        expect(arr.sort()).toEqual([0, 1, 2, 3])
    })

    it('[Function, Function, Object, Object] >> [Function, Object]', () => {
        const arr = [Function, Function, Object, Object]
        const arr2 = unique(arr)

        expect(arr2).toHaveLength(2)
        expect(arr2[0]).toEqual(Function)
        expect(arr2[1]).toEqual(Object)
    })

    it('mixed array', () => {
        const arr = [true, true, 'foo', 'foo', 'bar', 0, NaN, NaN]

        unique(arr)
        expect(arr).toEqual([true, 'foo', 'bar', 0, NaN])
    })

    it('unsorted array', () => {
        const arr = 'the quick brown fox jumps over the lazy dog'.split('')

        expect(unique(arr.join(''))).toEqual('the quickbrownfxjmpsvlazydg')
    })

    it('optionally bindable', () => {
        const obj = {
            0: 'ace',
            1: 'base',
            2: 'case',
            3: 'face',
            4: 'ace',
            length: 5,
            unique
        }

        obj.unique()

        expect(obj).toEqual({
            0: 'ace',
            1: 'base',
            2: 'case',
            3: 'face',
            length: 4,
            unique
        })
    })
})

describe('works on numerical-length values', () => {
    const obj: ArrayLike<string> = {
        0: 'one',
        1: 'one',
        length: 2
    }

    it(`${inspect('foobar')} >> 'fobar'`, () => {
        const str = 'foobar'
        expect(unique<string>(str)).toEqual('fobar')
    })

    it(`${inspect(obj)} >> {"0": "one", "length": 1}`, () => {
        expect(unique(obj)).toEqual({ 0: 'one', length: 1 })
    })
})
