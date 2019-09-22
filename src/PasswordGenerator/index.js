import React from 'react';
import View from './view';

class PasswordGenerator extends React.Component {
    state = {
        generatedPassword: "SumPass4y0u"
    };

    constructor(props) {
        super(props);

        this.generateNewPassword = this.generateNewPassword.bind(this);
    }

    setPasswordState = (password) => this.setState({ generatedPassword: password });

    generateNewPassword() {
        let adjectives, nouns = [];
        const req = new XMLHttpRequest();

        req.open('GET',  window.location + 'data/en_adjectives.txt', false);
        req.send(null);
        if (req.status === 200)
            adjectives = req.responseText.split(/\r?\n|\r/);
        
        req.open('GET',  window.location + 'data/en_nouns.txt', false);
        req.send(null);
        if (req.status === 200)
            nouns = req.responseText.split(/\r?\n|\r/);


        const rand1 = Math.floor((Math.random() * adjectives.length) + 1);
        const rand2 = Math.floor((Math.random() * nouns.length) + 1);
        const adjective = adjectives[rand1];
        const noun = nouns[rand2];

        this.setPasswordState(adjective + "%" + noun);
    }

    render() {
        return (
            <View text={this.state.generatedPassword} handler={this.generateNewPassword}/>
        );
    }
}

export default PasswordGenerator;