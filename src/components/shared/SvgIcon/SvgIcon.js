import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import svgIcons from './icons.svg';
import './SvgIcon.styl';

export default class SvgIcon extends PureComponent {
	static propTypes = {
		icon: PropTypes.string,
		htmlAttr: PropTypes.object,
	};

	static defaultProps = {
		htmlAttr: {},
	};

	render() {
		const { icon, htmlAttr: { className, ...attr } } = this.props;

		return (
			<svg className={classNames('svgIcon', className)} {...attr}>
				<use xlinkHref={`${svgIcons}#icon-${icon}`} />
			</svg>
		);
	}
}