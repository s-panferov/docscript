import * as React from 'react'
import { Reflection } from '@tygen/reflector'
import { RefLink } from './ref-link'
import { css } from 'linaria'

export class BaseTypes extends React.Component<{ types?: Reflection[]; title?: string }> {
	render() {
		const { title, types } = this.props
		if (!types) {
			return null
		}

		return (
			<div className={BaseTypesBody}>
				<div className={ExtendsKeyword}>{title || 'Extends'}:</div>
				<ul className={List}>
					{types.map((type, i) => {
						return (
							<li key={type.id || i}>
								<RefLink reflection={type} />
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

const List = css`
	margin: 0;
	margin-top: 10px;
`

const BaseTypesBody = css`
	margin-bottom: var(--items-space);
`

const ExtendsKeyword = css`
	color: #888;
	font-size: 14px;
`
