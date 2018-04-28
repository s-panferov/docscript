import { ReflectionLink, BaseReflection, Reflection, ReflectionKind } from '../reflection'
import { TypeReflection } from '../_type/reflection'
import { TypeParameterReflection } from '@docscript/reflector'

export interface ReflectionWithCallSignatures {
	ownCallSignatures?: SignatureReflection[]
	allCallSignatures?: (ReflectionLink | SignatureReflection)[]
}

export interface ReflectionWithConstructSignatures {
	constructSignatures?: SignatureReflection[]
}

export interface ReflectionWithIndexSignatures {
	numberIndexType?: TypeReflection
	stringIndexType?: TypeReflection
}

export interface SignatureReflection extends BaseReflection {
	kind: ReflectionKind.Signature
	parameters: Reflection[]
	typeParameters?: TypeParameterReflection[]
	returnType: TypeReflection
}
