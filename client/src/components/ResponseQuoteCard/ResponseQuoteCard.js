import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, ListGroup } from 'react-bootstrap';

//TODO: handle delay in img
const ResponseQuoteCard = ({ price, coverage, term, carrier, carrier_logo}) => {
    const clickHandler = () => {
        window.location.reload();
    }
    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={carrier_logo} />
            <Card.Body>
                <Card.Title>{carrier}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>{`Price: ${price}`}</ListGroup.Item>
                    <ListGroup.Item>{`Coverage: ${coverage}`}</ListGroup.Item>
                    <ListGroup.Item>{`Term: ${term}`}</ListGroup.Item>
                </ListGroup>
                <Button variant="primary" onClick={clickHandler}>Close</Button>
            </Card.Body>
        </Card>
    );
}

ResponseQuoteCard.propTypes = {
    price: PropTypes.number, 
    coverage: PropTypes.number, 
    term: PropTypes.number, 
    carrier: PropTypes.string, 
    carrier_logo: PropTypes.string
};

export default ResponseQuoteCard;
