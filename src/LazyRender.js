import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { isValidElementType } from 'react-is';

class LazyRender extends Component {
    static displayName = 'React.Formutil.LazyRender';
    static propTypes = {
        $component: PropTypes.elementType.isRequired,
        $pruneProps: PropTypes.arrayOf(PropTypes.string)
    };
    static defaultProps = {
        $pruneProps: []
    };

    static pruneProps = ({ ...props }) => {
        props.$pruneProps.forEach(key => {
            delete props[key];
        });

        return props;
    };

    shouldComponentUpdate(nextProps) {
        const pureNextProps = LazyRender.pruneProps(nextProps);
        const pureProps = LazyRender.pruneProps(this.props);

        return !isEqual(pureNextProps, pureProps);
    }

    render() {
        const { $component, $pruneProps, ...props } = this.props;

        if (isValidElementType($component)) return createElement($component, props);

        return null;
    }
}

export default LazyRender;
