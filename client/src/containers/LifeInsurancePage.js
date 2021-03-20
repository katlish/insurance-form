import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header/Header';
import InsuranceForm from '../components/InsuranceForm/InsuranceForm';
import ResponseQuoteCard from '../components/ResponseQuoteCard/ResponseQuoteCard';
import { sendUserDetails } from '../API/API';


const LifeInsurancePage = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
    }, [response]);

    // TODO: how to handle catch?
    const sendDetails = async (details) => {
        try{
            const res = await sendUserDetails(details);
            if (res){
                setResponse(res);
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
    <>
        <Header title="Life Insurance Form" />
        <Container className="justify-content-md-center">
        {
            response ? (
            <ResponseQuoteCard 
                price={response.price}
                coverage={response.coverage}
                term={response.term}
                carrier={response.carrier}
                carrier_logo={response.carrier_logo}
            />
            ) : (
            <InsuranceForm 
                submitHandler={(values) => sendDetails(values)}
                localStorageKey='insuranceForm'
            />
        )
        }
        </Container>
    </>
    );
}

export default LifeInsurancePage;
