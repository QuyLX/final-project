import React from 'react';
import { Row, Col, Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteProfile, updateMark } from '../../../actions/profile';



const UserData = ({ profiles, user, history, deleteProfile, updateMark }) => {
    const onFinish = (values, id) => {
        updateMark(values, id, history);
    };
    const profileUser = profiles.filter(profile => profile.person._id !== user._id).map((profile) =>
        <Row key={profile._id}>
            <Col span={4}>{profile.person.account}</Col>
            <Col span={4}>{profile.email}</Col>
            <Col span={4}>{profile.phone}</Col>
            <Col span={4}>{profile.fullName}</Col>
            <Col span={4}>
                <Form name="nest-messages" onFinish={(values) => { onFinish(values, profile._id) }} >
                    <Form.Item label="Mark">
                        <Form.Item
                            name='first-mark'
                            style={{ display: 'inline-block' }}
                        >
                            <Input placeholder="First Mark" />
                        </Form.Item>
                        <Form.Item
                            name='second-mark'
                            style={{ display: 'inline-block' }}
                        >
                            <Input placeholder="Second mark" />
                        </Form.Item>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                Update Mark
                            </Button>
                        </Form.Item>
                    </Form.Item>
                </Form>
                {profile.mark}
            </Col>
            <Col span={4}>
                <Button onClick={() => { deleteProfile(profile._id) }} type="primary" danger>
                    Delete
                </Button>
            </Col>
        </Row>)
    return (
        <>
            {profileUser}
        </>
    )
}

UserData.propsTypes = {
    profiles: PropTypes.array,
    deleteProfile: PropTypes.func.isRequired,
    updateMark: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profiles: state.profile.profiles,
    user: state.auth.user
})
export default withRouter(connect(mapStateToProps, { deleteProfile, updateMark })(UserData));
