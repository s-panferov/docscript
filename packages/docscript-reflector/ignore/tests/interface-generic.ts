import { generateInline, expect, typeRef } from './utils'
import { ItemType } from '../items'
import { isInterfaceReflection } from '../ast/interface'

import { isPropertySignatureReflection } from '../ast/type/property'

describe('interface-generic', () => {
	let module = generateInline(`
		interface Test<T, A extends T> {
			p0: T
			p1: A
		}
	`)

	let iface = module.items[0]

	it('reflects generic interface', () => {
		if (isInterfaceReflection(iface)) {
			expect(iface.properties).lengthOf(2)
			expect(iface.typeParameters).lengthOf(2)

			{
				let tp = iface.typeParameters[0]

				expect(tp.name).equal('T')
				expect(tp.itemType).equal(ItemType.TypeParameter)

				let member = iface.properties[0]
				if (isPropertySignatureReflection(member)) {
					expect(typeRef(member.type)).equal(tp.selfRef.id)
				}
			}

			{
				let tp = iface.typeParameters[1]

				expect(tp.name).equal('A')
				expect(tp.itemType).equal(ItemType.TypeParameter)

				let member = iface.properties[1]
				if (isPropertySignatureReflection(member)) {
					expect(typeRef(member.type)).equal(tp.selfRef.id)
				}
				expect(typeRef(tp.constraint)).equal(iface.typeParameters[0].selfRef.id)
			}
		} else {
			expect.fail()
		}
	})
})
