import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';


function DropdownInputField(props: any) {

    const { field, label, options } = props
    const { name } = field

    return (
        <div>
            <TextField
                fullWidth
                select
                id={name}
                label={label}
                {...field}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
                options={options}
            >
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </TextField>
        </div>
    )
}

DropdownInputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array
}

DropdownInputField.defaultProps = {
    type: 'text',
    label: '',
    options: []
}

export default DropdownInputField

