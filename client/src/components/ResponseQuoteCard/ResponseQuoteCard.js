import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, ListGroup } from 'react-bootstrap';

const ResponseQuoteCard = ({ price, coverage, term, carrier, carrier_logo}) => {
    const clickHandler = () => {
        window.location.reload();
    }
    
    return (
        <Card style={{ width: '18rem' }} className="mx-auto">
            <Card.Img variant="top" src={carrier_logo} className="p-3"/>
            <Card.Body>
                <Card.Title>{carrier}</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>{`Price: ${price}`}</ListGroup.Item>
                    <ListGroup.Item>{`Coverage: ${coverage}`}</ListGroup.Item>
                    <ListGroup.Item>{`Term: ${term}`}</ListGroup.Item>
                </ListGroup>
                <div className="d-flex py-3">
                    <Button variant="primary" onClick={clickHandler} className="mx-auto">Close</Button>
                </div>
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
