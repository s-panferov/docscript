import { generateInline, expect } from './utils'
import { isClassReflection } from '../ast/class'

describe('class-interface-merge', () => {
	let module = generateInline(`
		interface Test<A, B, C> {
			prop: string
			foo(name: 'string')
		}

		class Test<A, B, C> {
			prop2: string
			foo(name: string) { }
		}
	`)

	let cls = module.items[0]
	let cls2 = module.items[1]

	it('compiles', () => {
		expect(cls).to.ok
		expect(cls2).to.not.ok

		if (isClassReflection(cls)) {
			expect(cls.properties).lengthOf(3)
			expect(cls.typeParameters).lengthOf(3)
		} else {
			expect.fail()
		}
	})
})
