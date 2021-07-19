import React, { useState, useEffect } from 'react'
import { TextField, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Verification(props: any) {

    const classes = useStyles();
    const { phonenumber, validatemsg } = props
    
    const [otp, setOtp] = useState(new Array(6).fill(""));


    const handleVerifyCode = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = event.target.value;
        console.log(value, index);

        setOtp([...otp.map((d, ind) => (ind == index) ? value : d)])
    }
    props.otpchild(otp.join(''))


    return (
        <div>
            <form className={classes.form} noValidate>
                <h2>
                    Please enter verification code
                </h2>

                <Grid container spacing={3}>
                    {

                        otp.map((data, index) => {
                            return (
                                <Grid item xs key={index} >
                                    <TextField 
                                    name='otp' 
                                    variant="outlined"
                                    value={data}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVerifyCode(e, index)}
                                    inputProps={{ maxLength: 1 }} />
                                </Grid>
                            )
                        })
                    }

                </Grid>
                <p>{validatemsg}</p>
                <p>A code has been sent to {phonenumber} via SMS</p>
                <p><Link href="#" variant="body2">
                    RESEND CODE
                </Link></p>

                <Link href="#" variant="body2">
                    REGISTER WITH ONOTHER NUMBER
                </Link>

            </form>
        </div>
    )

}


export default Verification

