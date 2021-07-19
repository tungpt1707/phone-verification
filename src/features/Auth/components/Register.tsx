import React, { useState } from 'react'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../../../firebase';
import Verification from './Verification'
import * as Yup from 'yup'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    FastField,
} from 'formik';
import InputField from '../../../custom-fields/InputField';
import DropdownInputField from '../../../custom-fields/DropdownInputField';
import { red } from '@material-ui/core/colors';

interface MyFormValues {
    country: string;
    phoneNumber: string
}

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

function Register() {
    const classes = useStyles();

    const countrycodes = [
        {
            value: '+65',
        },
        {
            value: '+84',
        },
    ]

    const [phonenumber, setPhonenumber] = useState('');
    const [validatemsg, setValidatetmsg] = useState('')
    const initialValues: MyFormValues = { country: '+65', phoneNumber: '' };

    const validationSchema = Yup.object().shape({
        country: Yup.string().required('This is a required field.'),
        phoneNumber: Yup.number().required('This is a required field.')
    });

    const [isCodeShow, setIsCodeShow] = useState(false);

    const handleOtpValue = (value: string) => {       
        if (value.length < 6) return        
        let code = value;       
        (window as any).confirmationResult.confirm(code).then((result: any) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user);
            setValidatetmsg("User signed in successfully.");
        }).catch((error: any) => {
            console.log(error.message);
            setValidatetmsg(error.message)
        });

    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {                
                const phonenumber = values.country + values.phoneNumber
                setPhonenumber(phonenumber);              

                const verifier = new firebase.auth.RecaptchaVerifier(
                    "recaptcha-container",
                    {
                        'size': 'invisible',
                    });
                firebase.auth().signInWithPhoneNumber(phonenumber, verifier).then((e) => {
                    (window as any).confirmationResult = e;
                    console.log("Sent OTP");
                    setIsCodeShow(true);
                }).catch(function (error) {
                    console.log("SMS not sent", error);
                    verifier.clear();
                });;
            }}>
            {formikProps => {
                //do something here
                const { values, errors, touched } = formikProps
                console.log({ values, errors, touched });

                return (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div id='recaptcha-container'></div>
                        {!isCodeShow &&
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    Let's get started
                                </Typography>
                                <Form className={classes.form}>
                                    <FastField
                                        name="country"
                                        label="Country"
                                        type="number"
                                        component={DropdownInputField}
                                        options={countrycodes}
                                    />
                                    <FastField
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type="number"
                                        component={InputField}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        // onClick={handleSubmit}
                                        id="sign-in-button"
                                        type="submit"
                                    >
                                        VERIFY NUMBER
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                ALREADY HAVE AN ACCOUNT?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                LOGIN
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            </div>
                        }
                        {isCodeShow && <Verification otpchild={handleOtpValue} phonenumber={phonenumber} validatemsg ={validatemsg}/>}
                       
                    </Container>
                )
            }}
        </Formik>

    )
}


export default Register

