import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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
  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push('/');
  }
  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
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
          </div>
          <div>
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
              disabled={pristine || submitting || invalid}
            />

            <Link to="/">Cancel</Link>
            <Link to="/" onClick={this.onDeleteClick}>
              Delete
            </Link>
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
const mapDispatchToProps = { deleteEvent };

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'eventShowForm' })(EventsShow));
