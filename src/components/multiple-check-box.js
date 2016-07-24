import React from 'react';
import _ from 'lodash';
import { FormComponentMixin } from '../mixins';
import { BranchMixin } from 'baobab-react-mixins';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import BaobabPropTypes from 'baobab-prop-types';

export default React.createClass({
    displayName: 'MultiCheckBox',

    mixins: [BranchMixin, FormComponentMixin, PureRenderMixin],

    propTypes: {
        value: React.PropTypes.any.isRequired,
        cursor: BaobabPropTypes.cursor,
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            onChange: _.identity,
        };
    },

    cursors(props, context) {
        return {
            value: this.getCursor(props, context),
        };
    },

    onChange(event) {
        const wasChecked = this.isChecked();
        const isChecked = event.target.checked;

        if (isChecked === wasChecked) {
            return;
        }

        const value = isChecked ?
            _.concat(
                this.state.value, this.props.value
            ) :
            _.without(
                this.state.value, this.props.value
            );

        this.setValue(value, () => {
            this.setDirtyState();
            this.props.onChange(isChecked, !isChecked);
        });
    },

    isChecked() {
        return _.includes(this.state.value, this.props.value);
    },

    render() {
        const props = {
            type: 'checkbox',
            onChange: this.onChange,
            checked: this.isChecked(),
        };

        return (
            <input {...this.props} {...props} />
        );
    },
});
