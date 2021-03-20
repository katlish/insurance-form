import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'isNumber', function () {
    const reg = /^\d+$/;
	return this.matches(reg, 'The field should have digits only')
});

const validDate = (yearsFromNow) => {
	const now = new Date();
	now.setFullYear(now.getFullYear() - yearsFromNow);
	return now.toISOString().split('T')[0];
}

export const validationSchema = Yup.object({
	zipcode: Yup.string()
	.min(5)
	.max(5)
	.isNumber()
	.required('Zipcode is required'),
	birthdate: Yup.date()
	.required('Birthdate is required')
	.min(validDate(80), `You are too old. The latest valid date is ${validDate(80)}`)
	.max(validDate(18), `You are too young. The earliest valid date is ${validDate(18)}`),
    income: Yup.number()
    .min(25000)
    .required('Income is required')
});