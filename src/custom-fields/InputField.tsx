import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import { ErrorMessage } from 'formik';


InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
}
InputField.defaultProps = {
    type: 'text',
    label: ''
}
function InputField(props: any) {
    const { field, form, label, type } = props
    const { name, value, onChange, onBlur } = field
    const { errors, touched } = form
    console.log({errors, touched });
    
    const showErrors = errors[name] && touched[name]
    const helperText = errors[name]
    
    return (
        <div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={name}
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}               
                error= {showErrors}
                helperText={helperText}
            />

            
        </div>
    )
}



export default InputField

