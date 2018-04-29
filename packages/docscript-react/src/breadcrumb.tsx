import React from 'react'
import { Reflection } from '@docscript/reflector'
import { parseId } from './helpers'
import styled from 'styled-components'
import { Join } from './ui/join'
import { hrefFromId } from './ref-link'

export class Breadcrumb extends React.Component<{ reflection: Reflection }> {
	render() {
		const { reflection } = this.props
		const { id } = reflection

		if (!id) {
			return
		}

		const links = [] as React.ReactNode[]
		const regexp = /(->|::|\/|$)/g

		const pkg = id.match(/(.*?)->(.*?)(->|$)/)!

		const pkgHref = hrefFromId(pkg[0])
		links.push(
			<BreadcrumbLink key={pkg[0]} href={pkgHref.href}>
				{pkg[1]}
			</BreadcrumbLink>
		)

		let rest = id.slice(pkg[0].length)
		let lastRef: string = pkg[0]

		let res: RegExpExecArray | null
		while ((res = regexp.exec(rest))) {
			if (res.index === 0) {
				break
			}

			// package always goes with a version
			let subId = pkg[0] + rest.slice(0, res.index)

			const href = hrefFromId(subId, lastRef)
			lastRef = subId

			links.push(
				<BreadcrumbLink key={subId} href={href.href}>
					{href.name}
				</BreadcrumbLink>
			)

			if (res.index >= rest.length - 1) {
				break
			}
		}

		return (
			<BreadcrumbBody>
				<Join joinWith={i => <BreadcrumbSep key={i}>/</BreadcrumbSep>}>{links}</Join>
			</BreadcrumbBody>
		)
	}
}

export function createLink(...parts: string[]) {
	return '/' + parts.join('/')
}

const BreadcrumbBody = styled.span`
	font-size: 14px;
`
const BreadcrumbLink = styled.a``
const BreadcrumbSep = styled.span`
	padding: 0 2px;
	color: #ccc;
`
