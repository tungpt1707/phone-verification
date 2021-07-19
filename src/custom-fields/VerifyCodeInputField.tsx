import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Grid, Link } from '@material-ui/core';
import { number } from 'yup';
function VerifyCodeInputField(props: any) {
    
    return (
        <div>
           test
        </div>
    )
}

VerifyCodeInputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,    
    numberofbox : PropTypes.array
}
VerifyCodeInputField.defaultProps= {
    numberofbox : []
}
export default VerifyCodeInputField

