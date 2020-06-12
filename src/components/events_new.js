import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
        <TextField
          hintText={label}
          floatingLabelText={label}
          type={type}
          errorText={touched && error}
          {...input}
          fullWidth={true}
        />
      </div>
    );
  }
  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = { margin: 12 };
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
            <RaisedButton
              label="Submit"
              type="submit"
              style={style}
              disabled={pristine || submitting || invalid}
            />
            <RaisedButton
              label="Cancel"
              style={style}
              containerElement={<Link to="/" />}
            />
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
