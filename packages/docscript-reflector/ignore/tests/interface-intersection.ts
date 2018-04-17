import { generateInline, expect, typeRef, coreType } from './utils'
import { CoreType } from '../tools'
import { isInterfaceReflection } from '../ast/interface'

import { isIntersectionTypeReflection, isUnionTypeReflection } from '../ast/type/intersection-union'

import { isPropertySignatureReflection } from '../ast/type/property'

describe('interface-intersection', () => {
	let module = generateInline(`
		interface Test {
			p0: string & Test
			p1: string | Test
		}
	`)

	let iface = module.items[0]

	it('union type property', () => {
		if (isInterfaceReflection(iface)) {
			expect(iface.properties).lengthOf(2)

			{
				let member = iface.properties[0]

				if (isPropertySignatureReflection(member)) {
					let type = member.type
					expect(isIntersectionTypeReflection(type)).to.true

					if (isIntersectionTypeReflection(type)) {
						expect(type.types).lengthOf(2)
						expect(coreType(type.types[0])).to.equal(CoreType.String)
						expect(typeRef(type.types[1])).to.equal(iface.selfRef.id)
					} else {
						expect.fail()
					}
				} else {
					expect.fail()
				}
			}

			{
				let member = iface.properties[1]

				if (isPropertySignatureReflection(member)) {
					let type = member.type
					expect(isUnionTypeReflection(type)).to.true

					if (isUnionTypeReflection(type)) {
						expect(type.types).lengthOf(2)
						expect(coreType(type.types[0])).to.equal(CoreType.String)
						expect(typeRef(type.types[1])).to.equal(iface.selfRef.id)
					} else {
						expect.fail()
					}
				} else {
					expect.fail()
				}
			}
		}
	})
})
