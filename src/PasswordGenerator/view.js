import React from 'react';
import { Row, Col, Button } from 'react-materialize';

const PasswordGeneratorView = (props) => {
    const {
        text,
        handler
    } = props;

    return (
        <div>
            <Row>
                <Col s={12}>
                    <p id="#your-password">{text}</p>
                </Col>
                <Col s={12}>
                <Button waves="light" style={{marginRight: '5px'}} onClick={handler}>
                    Generate
                </Button>
                </Col>
            </Row>
        </div>
    );
}

export default PasswordGeneratorView;