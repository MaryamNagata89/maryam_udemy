import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="title"
              name="title"
              type="text"
              component={this.renderField}
            />
            <Field
              label="title"
              name="body"
              type="body"
              component={this.renderField}
            />
          </div>

          <div>
            <input
              type="submit"
              value="submit"
              disabled={pristine || submitting}
            />
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
const validate = (values) => {
  const errors = {};

  if (!values.title) errors.title = 'Enter Title please';
  if (!values.body) errors.body = 'Enter Body please';
  return errors;
};
const mapDispatchToProps = { postEvent };

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew));
