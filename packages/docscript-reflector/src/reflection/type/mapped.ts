import * as ts from 'typescript'

import { TypeReflectionBase, TypeKind, TypeReflection, visitType } from './type'
import { ReflectionKind, createLink } from '../reflection'
import { Context } from '../../context'

export interface MappedTypeReflection extends TypeReflectionBase {
	typeKind: TypeKind.Mapped
	typeParameter: TypeReflection
	templateType: TypeReflection
	constraintType: TypeReflection
}

export interface MappedType extends ts.Type {
	declaration: ts.MappedTypeNode
	typeParameter: ts.Type
	constraintType: ts.Type
}

export function visitMapped(type: ts.Type, ctx: Context): MappedTypeReflection {
	const reflection: MappedTypeReflection = {
		kind: ReflectionKind.Type,
		typeKind: TypeKind.Mapped,
		typeParameter: undefined as any,
		templateType: undefined as any,
		constraintType: undefined as any
	}

	let mappedType = type as MappedType

	ctx.registerType(type, reflection)

	if (mappedType.typeParameter) {
		reflection.typeParameter = visitType(mappedType.typeParameter, ctx)
	}

	if (mappedType.constraintType) {
		reflection.constraintType = visitType(mappedType.constraintType, ctx)
	}

	let template = mappedType.declaration.type
	if (template) {
		let templateType = ctx.checker.getTypeAtLocation(template)
		if (templateType) {
			reflection.templateType = visitType(templateType, ctx)
		}
	}

	return reflection
}
