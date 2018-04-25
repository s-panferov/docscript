import * as React from 'react'
import { PackageReflection } from '@docscript/reflector/src/reflection'
import { Markdown } from './markdown'
import { Toolbar } from './toolbar'
import { parseId } from './helpers'
import { Layout } from './layout'
import { Badge } from './badge'
import { Section } from './section'
import { RefLink } from './ref-link'
import { ReflectionView } from './view'
import { key } from './helper'

export class PackageView extends ReflectionView<PackageReflection> {
	render() {
		let { reflection } = this.props
		let ident = parseId(reflection.id!)

		let modules = (
			<Section key="struct" heading="Structure">
				{reflection.modules.map(module => {
					return <RefLink key={key(module)} reflection={module} />
				})}
			</Section>
		)

		return (
			<div>
				<Toolbar pkg={ident.pkg} version={ident.version} />
				<Layout sidebar={[modules]}>
					<h1>
						{reflection.manifest.name} <Badge>Package</Badge>
					</h1>
					<Section heading="README">
						<Markdown source={reflection.readme || 'The package has no README'} />
					</Section>
				</Layout>
			</div>
		)
	}
}
