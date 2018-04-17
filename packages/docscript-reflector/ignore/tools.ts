import { Type, TypeFlags } from 'typescript'
import { inspect as nodeInspect } from 'util'

export enum CoreType {
	Any = 'any',
	String = 'string',
	Number = 'number',
	Boolean = 'boolean',
	Void = 'void',
	Symbol = 'symbol',
	Null = 'null',
	Undefined = 'undefined',
	This = 'this'
}

export function getCoreType(type: Type): CoreType {
	if (type.flags & TypeFlags.String) {
		return CoreType.String
	} else if (type.flags & TypeFlags.Number) {
		return CoreType.Number
	} else if (type.flags & TypeFlags.Any) {
		return CoreType.Any
	} else if (type.flags & TypeFlags.Boolean) {
		return CoreType.Boolean
	} else if (type.flags & TypeFlags.Void) {
		return CoreType.Void
	} else if (type.flags & TypeFlags.ESSymbol) {
		return CoreType.Symbol
	}
}

export function inspect(obj: any) {
	console.log(nodeInspect(obj, { depth: null }))
}
