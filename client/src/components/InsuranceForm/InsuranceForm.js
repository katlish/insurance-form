import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spinner } from 'react-bootstrap';
import { validationSchema } from './Validations';
import { useFormik } from 'formik';
import { localStorageKey } from '../../constants/main';

const InsuranceForm = ({ values, submitHandler }) => {
	const blurHandler = (e) => {
		try {
			formik.handleBlur(e);
			localStorage.setItem(
				localStorageKey,
				JSON.stringify({
					...formik.values,
					[e.target.id]: e.target.value,
				}),
			);
		} catch (e) {
			throw e;
		}
	};

	const formik = useFormik({
		initialValues: values,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setStatus, resetForm }) => {
			const userDetails = {
				...values,
				birthdate: values.birthdate + ' 00:00:00',
			};
			setStatus(null);
			try {
				await submitHandler(userDetails);
				setStatus({
					type: 'success',
					text: 'Success',
				});
				localStorage.removeItem(localStorageKey);
				resetForm();
			} catch (e) {
				setStatus({
					type: 'danger',
					text: e.message || e.response.data.message,
				});
			}
		},
	});

	return (
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
				<Form.Label>Gender</Form.Label>
				<div className="d-inline-flex align-items-center">
					<Form.Check
						type="radio"
						label="male"
						id="male"
						className="mr-2"
						checked={formik.values.gender === 'male'}
						onBlur={blurHandler}
						onChange={() => formik.setFieldValue('gender', 'male')}
					/>
					<Form.Check
						type="radio"
						label="female"
						id="female"
						onBlur={blurHandler}
						checked={formik.values.gender === 'female'}
						onChange={() => formik.setFieldValue('gender', 'female')}
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
					type="text"
					isInvalid={formik.touched.income && formik.errors.income}
					isValid={formik.touched.income && !formik.errors.income}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.income}
				</Form.Control.Feedback>
			</Form.Group>
			<div className="d-flex justify-content-end align-items-center">
				{formik.status && (
					<div className={`text-${formik.status.type} mr-auto`}>
						{formik.status.text}
					</div>
				)}
				{formik.isSubmitting && (
					<Spinner animation="border" variant="info" className="mr-2" />
				)}
				<Button
					disabled={formik.isSubmitting}
					variant="success"
					onClick={formik.handleSubmit}
				>
					Submit
				</Button>
			</div>
		</Form>
	);
};

InsuranceForm.propTypes = {
	values: PropTypes.object,
	submitHandler: PropTypes.func,
};

InsuranceForm.defaultProps = {
	values: {
		zipcode: '',
		gender: 'male',
		birthdate: '',
		income: '',
	},
};

export default InsuranceForm;
