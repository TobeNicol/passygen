import React from 'react';
import { Row, Col, Button, Range } from 'react-materialize';

const PasswordGeneratorView = (props) => {
    const {
        text,
        handler
    } = props;

  const range= React.createRef();
    return (
        <div>
            <Row>
                <Col s={12}>
                    <p id="#your-password">{text}</p>
                </Col>
                <Col s={12}>
                    <p> Password length:</p>
                    <Range ref={range} max="20" min="10"/>
                </Col>
                <Col s={12}>
                <Button waves="light" style={{marginRight: '5px'}} onClick={()=>{
                    console.log(range.current._range.value)
                    handler(range.current._range.value)
                    
                    }}>
                    Generate
                </Button>
                </Col>
            </Row>
        </div>
    );
}

export default PasswordGeneratorView;