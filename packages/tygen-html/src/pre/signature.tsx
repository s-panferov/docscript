import * as React from 'react'

import { SignatureReflection } from '@tygen/reflector'
import { ReflectionPre } from './index'
import { PrettyCode } from './prettier'
import { TypeArgumentsPre } from './type-parameters'
import { Join } from '../ui/join'
import { CommentView } from '../comment'
import { getKey } from '../ref-link'

export class SignaturePre extends PrettyCode<{
	reflection: SignatureReflection
	keyword?: string
}> {
	render() {
		const { reflection, keyword } = this.props
		const name =
			reflection.name === '__call' || reflection.name === '__type' ? '' : reflection.name
		return (
			<React.Fragment>
				{reflection.comments && this.doc(<CommentView inline reflection={reflection} />)}
				{reflection.abstract && 'abstract '}
				{reflection.static && 'static '}
				{keyword} {name}
				{reflection.typeParameters && (
					<TypeArgumentsPre types={reflection.typeParameters} />
				)}
				(
				<Join joinWith=",">
					{reflection.parameters.map((param, i) => {
						return <ReflectionPre key={getKey(param) || i} reflection={param} />
					})}
				</Join>
				): <ReflectionPre reflection={reflection.returnType} />
			</React.Fragment>
		)
	}
}
