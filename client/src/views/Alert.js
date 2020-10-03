import React from 'react'
import { connect } from 'react-redux';
import { Alert } from 'antd';

const AlertWarning = ({ alerts }) => (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <Alert style={{marginTop: 10}} key={alert.id} message={alert.msg} type={alert.alertType} showIcon />
    ))
)

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(AlertWarning)
