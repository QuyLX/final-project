import React, { Fragment } from 'react'
import {  Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertWarning from './Alert';
import UserData from '../components/contents/userManagement/UserData';
import { createUser } from '../actions/auth';


const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};

const UserListManagement = ({ createUser }) => {
  const onFinish = (values) => {
    createUser(values.user)
  };
  return (
    <Fragment>
      <Form {...layout} name="nest-messages" onFinish={onFinish} >
        <Form.Item
          name={['user', 'name']}
          label="Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'account']}
          label="Account"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'password']}
          label="Password"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'role']}
          label="Role"
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Add User
      </Button>
        </Form.Item>
      </Form>


      <AlertWarning />
      <UserData />
    </Fragment>
  )
}
UserListManagement.propTypes = {
  createUser: PropTypes.func.isRequired,
}


export default connect(null, { createUser })(UserListManagement);
