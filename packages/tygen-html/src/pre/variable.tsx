import * as React from 'react'

import { VariableReflection, ParameterReflection } from '@tygen/reflector'
import { TypePre } from './type'
import { PrettyCode } from './prettier'
import { css } from 'linaria'

export class VariablePre extends PrettyCode<{ reflection: VariableReflection }> {
	render() {
		const reflection = this.props.reflection
		this.keyword('let', /let\s/, <LetKeyword />)
		return (
			<React.Fragment>
				let{' '}
				{this.id(
					reflection.name,
					<VariableName key={reflection.id || reflection.name} reflection={reflection} />
				)}
				: <TypePre reflection={reflection.type} />
			</React.Fragment>
		)
	}
}

export class ParameterPre extends PrettyCode<{ reflection: ParameterReflection }> {
	render() {
		const reflection = this.props.reflection
		return (
			<React.Fragment>
				{this.id(
					reflection.name,
					<VariableName key={reflection.id || reflection.name} reflection={reflection} />
				)}
				: <TypePre reflection={reflection.type} />
			</React.Fragment>
		)
	}
}

export class VariableName extends React.Component<{
	reflection: VariableReflection | ParameterReflection
}> {
	render() {
		const { reflection } = this.props
		return (
			<a className={NameStyle} href="#">
				{reflection.name}
			</a>
		)
	}
}

export function LetKeyword() {
	return <span style={{ color: '#444' }}>let </span>
}

const NameStyle = css`
	color: #2e86de;
	font-weight: bold;
`
