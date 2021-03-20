import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spinner } from 'react-bootstrap';
import { validationSchema } from './Validations';
import { useFormik } from 'formik';


// TODO: clear form after submit
//TODO: ask how to handle toggle gender?

const InsuranceForm = ({values, submitHandler, localStorageKey}) => {
	const [formValues, setformValues] = useState(values);
	//TODO: why cant insert [formValues] as a dependency in useEffect ? 
	useEffect(() => {
		const savedValues = window.localStorage.getItem(localStorageKey);
		if (savedValues) {
			setformValues(JSON.parse(savedValues));
		}
	}, [localStorageKey]);

	const blurHandler = (e) => {
		try {
			formik.handleBlur(e);
			let currentFormVal = formValues;
			currentFormVal[e.currentTarget.id] = e.currentTarget.value;
			setformValues(currentFormVal);
			window.localStorage.setItem(localStorageKey, JSON.stringify(currentFormVal));
		}catch(e){
			throw e;
		}
	}
	
    const formik = useFormik({
        initialValues: formValues,
        validationSchema,
		enableReinitialize: true,
        onSubmit: async (values, { setStatus, resetForm }) => {
			const userDetails = {
				...values,
				gender: values.gender ? "female" : "male",
				birthdate: values.birthdate + ' 00:00:00'
			}
            setStatus(null);
            try {
				await submitHandler(userDetails);
                setStatus({
                    type: 'success',
				});
				window.localStorage.removeItem(localStorageKey);
				resetForm({});
				setformValues({});
            } catch (e) {
                console.log('e', e);
                setStatus({
                    type: 'danger',
                    text: e.response.data.message,
                });
            }
        },
	});

	return (
        <>
         {formik.isSubmitting && <Spinner animation="border" variant="info" />}
         <Form noValidate>
			<Form.Group controlId="zipcode">
				<Form.Label>Zipcode</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={blurHandler}
					value={formik.values.zipcode}
					placeholder="type here"
					type="text"
					isInvalid={formik.touched.zipcode && formik.errors.zipcode}
					isValid={formik.touched.zipcode && !formik.errors.zipcode}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.zipcode}
				</Form.Control.Feedback>
			</Form.Group>
            <Form.Group className="d-flex flex-column">
				<Form.Label >Gender</Form.Label>
                <div className="d-inline-flex">
                    <Form.Label>Male</Form.Label>
                    <Form.Switch 
                        id="gender"
                        type="switch"
                        label="Female"
                        onChange={formik.handleChange}
                    />
                </div>
			</Form.Group>
            <Form.Group controlId="birthdate">
				<Form.Label>Birthdate</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={blurHandler}
					value={formik.values.birthdate}
					type="date"
					isInvalid={formik.touched.birthdate && formik.errors.birthdate}
					isValid={formik.touched.birthdate && !formik.errors.birthdate}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.birthdate}
				</Form.Control.Feedback>
			</Form.Group>
            <Form.Group controlId="income">
				<Form.Label>Income</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={blurHandler}
					value={formik.values.income}
					type="number"
					isInvalid={formik.touched.income && formik.errors.income}
					isValid={formik.touched.income && !formik.errors.income}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.income}
				</Form.Control.Feedback>
			</Form.Group>
            <Button
                disabled={formik.isSubmitting}
                variant="success"
                onClick={formik.handleSubmit}
            >
                Submit
            </Button>
		</Form>
        </>
		
	);
};

InsuranceForm.propTypes = {
    values: PropTypes.object,
    submitHandler: PropTypes.func
};

InsuranceForm.defaultProps = {
	values: {
		zipcode: '', 
        gender: true,  
        birthdate: '',  
        income: ''
	},
};

export default InsuranceForm;
