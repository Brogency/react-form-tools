'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'ValidationError',

    contextTypes: {
        form: _react2.default.PropTypes.object.isRequired
    },

    propTypes: {
        fieldPath: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string.isRequired, _react2.default.PropTypes.array.isRequired]),
        className: _react2.default.PropTypes.string,
        alwaysShow: _react2.default.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            alwaysShow: false
        };
    },
    render: function render() {
        var form = this.context.form;

        var error = form.getValidationErrors(this.props.fieldPath);
        var isValid = !error;
        var isDirty = form.isDirty(this.props.fieldPath);
        var className = (0, _classnames2.default)(this.props.className, {
            _dirty: isDirty
        });
        if (isValid || !this.props.alwaysShow && !isDirty) {
            return null;
        }

        return _react2.default.createElement(
            'div',
            { className: className },
            error
        );
    }
});