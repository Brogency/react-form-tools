import React from 'react';
import _ from 'lodash';
import BaobabPropTypes from 'baobab-prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { BranchMixin } from 'baobab-react-mixins';
import { FormComponentMixin } from '../mixins';

export default React.createClass({
    displayName: 'Radio',

    mixins: [BranchMixin, FormComponentMixin, PureRenderMixin],

    propTypes: {
        value: React.PropTypes.any,
        cursor: BaobabPropTypes.cursor,
        onChange: React.PropTypes.func,
    },

    cursors(props, context) {
        return {
            value: this.getCursor(props, context),
        };
    },

    getDefaultProps() {
        return {
            onChange: _.identity,
        };
    },

    onChange() {
        const value = this.props.value;
        const previousValue = this.state.value;

        if (value === previousValue) {
            return;
        }

        this.setValue(value, () => {
            this.setDirtyState();
            this.props.onChange(value, previousValue);
        });
    },

    isChecked() {
        return _.isEqual(this.props.value, this.state.value);
    },

    render() {
        const props = {
            type: 'radio',
            checked: this.isChecked(),
            onChange: this.onChange,
            onKeyPress: this.processKeyPress,
        };

        return (
            <input {...this.props} {...props} />
        );
    },
});
