import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import InsuranceForm from '../InsuranceForm/InsuranceForm';
import ResponseQuoteCard from '../ResponseQuoteCard/ResponseQuoteCard';
import { sendUserDetails } from '../../API/API';
import { localStorageKey } from '../../constants/main';

const LifeInsurancePage = () => {
	const [data, setData] = useState(null);
	const sendDetails = async (details) => {
		const res = await sendUserDetails(details);
		setData(res);
	};
	const savedValues = JSON.parse(
		localStorage.getItem(localStorageKey),
	);
	return (
		<>
			<Header title="Life Insurance Form" />
			<Container className="justify-content-md-center py-5">
				{data ? (
					<ResponseQuoteCard 
						price={data?.price}
						coverage={data?.coverage}
						term={data?.term}
						carrier={data?.carrier}
						carrier_logo={data?.carrier_logo}
					/>
				) : (
					<Row className="justify-content-md-center">
						<Col md="6" sm="12">
							<InsuranceForm
								submitHandler={sendDetails}
								values={savedValues || undefined}
							/>
						</Col>
					</Row>
				)}
			</Container>
		</>
	);
};

export default LifeInsurancePage;
