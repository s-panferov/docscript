import * as React from 'react'
import * as theme from '../theme'

import { Route, SearchResult } from '../../state'
import SmartLink from '../smart-link'
import Hotkeys from '../hotkeys'
import Link from '../link'

import { connect, DispatchProps, actions } from '../../redux'

require('./index.css')
const block = theme.block('search')

export interface SearchReduxProps extends DispatchProps {
	searchActive?: boolean
	searchQuery?: string
	searchResults?: SearchResult
	searchInProgress?: boolean
	searchIndexReady?: boolean
}

export interface SearchProps extends React.CommonProps {
	htmlProps?: React.HTMLAttributes
	route: Route
}

@connect(
	({
		searchActive,
		searchQuery,
		searchResults,
		searchInProgress,
		searchIndexReady
	}): SearchReduxProps => {
		return { searchActive, searchQuery, searchResults, searchInProgress, searchIndexReady }
	}
)
export default class Search extends React.Component<SearchProps & SearchReduxProps, void> {
	static contextTypes = theme.themeContext

	handlers: any

	constructor(props, context) {
		super(props, context)
		this.toggleSearch = this.toggleSearch.bind(this)
		this.onChange = this.onChange.bind(this)
		this.handlers = {}
	}

	getClassName() {
		return block(theme.resolveTheme(this), {}).mix(this.props.className)
	}

	render() {
		return (
			<Hotkeys className={block('hotkeys')} handlers={this.handlers}>
				<div className={this.getClassName()}>
					<div className={block('toggle')} onClick={this.toggleSearch}>
						<img className={block('icon')} src={require('./icon.svg')} />
					</div>
					{this.props.searchActive && (
						<div className={block('main')}>
							<div className={block('input')}>
								<input
									placeholder="Type to search"
									className={block('control').toString()}
									autoFocus={true}
									value={this.props.searchQuery}
									onChange={this.onChange}
								/>
							</div>
							<div className={block('results')}>
								{this.props.searchResults && this.renderSearchResults()}
							</div>
						</div>
					)}
				</div>
			</Hotkeys>
		)
	}

	renderSearchResults() {
		let { searchResults } = this.props
		return searchResults.map((selfRef: any) => {
			return (
				<div
					key={`${selfRef.pkg}//${selfRef.path}#${selfRef.semanticId}`}
					className={block('result')}>
					<SmartLink
						route={selfRef}
						render={(route: Route, linkProps) => {
							return (
								<div className={block('result-inner')}>
									<Link htmlProps={linkProps} className={block('result-link')}>
										{selfRef.semanticId}
									</Link>
									<div className={block('result-hint')}>
										from {route.pkg}:{'//'}
										{route.path}
									</div>
								</div>
							)
						}}
					/>
				</div>
			)
		})
	}

	onChange(e: React.FormEvent) {
		if (!this.props.searchInProgress && this.props.searchIndexReady) {
			let val = (e.target as any).value
			this.props.dispatch(actions.changeSearchQuery(val))
		}
	}

	toggleSearch() {
		this.props.dispatch(actions.toggleSearch())
	}
}
