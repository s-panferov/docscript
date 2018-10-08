import {
	BaseReflection,
	ReflectionKind,
	Reflection,
	ReflectionWithExports,
	ReflectionWithGlobals,
	ReflectionLink,
	NotIncludedReflection,
	Identifier
} from './reflection'

export interface PackageReflection
	extends BaseReflection,
		ReflectionWithReadme,
		ReflectionWithExports,
		ReflectionWithGlobals,
		ReflectionWithStructure {
	kind: ReflectionKind.Package
	manifest: Manifest
	main?: Reflection
}

export interface ReflectionWithReadme {
	readme?: string
}

export interface ReflectionWithStructure {
	id?: Identifier
	modules: (ReflectionLink | NotIncludedReflection)[]
}

export interface FolderReflection
	extends BaseReflection,
		ReflectionWithReadme,
		ReflectionWithStructure {
	kind: ReflectionKind.Folder
	name: string
}

export interface Manifest {
	name: string
	version: string
	typings?: string
	main?: string
}
