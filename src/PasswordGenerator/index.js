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

    pairEquals = (length)=>{
        //get all numbers less than length
        let prevNums = [];
        let targetLen = length - 1
        for(let i = 1; i< targetLen; i++) {prevNums.push(i)};
        //find numbers that can be added to get targetLen 
        let final = [];
        function subsetSum(numbers, target, partial) {
        var s, n, remaining;
        partial = partial || [];
        // sum partial
        s = partial.reduce(function (a, b) { return a + b; }, 0);
        // check if the partial sum is equals to target
        if (s === target && partial.length === 2 && !partial.includes(2) && !partial.includes(1) ) {
             final.push([...partial]);  
            }
        if (s >= target) return;  
        for (var i = 0; i < numbers.length; i++) {
            n = numbers[i];
            remaining = numbers.slice(i + 1);
            subsetSum(remaining, target, partial.concat([n]));
        }
        }
        subsetSum(prevNums,targetLen);
        return final
    }

    generateNewPassword = (length) =>{
        let adjectives, nouns = [];
        const req = new XMLHttpRequest();
        console.log(length)
        req.open('GET',  window.location + 'data/en_adjectives.txt', false);
        req.send(null);
        if (req.status === 200)
            adjectives = req.responseText.split(/\r?\n|\r/);
        
        req.open('GET',  window.location + 'data/en_nouns.txt', false);
        req.send(null);
        if (req.status === 200)
            nouns = req.responseText.split(/\r?\n|\r/);
        //get pairs of numbers that add up to length -1 (I use length-1 instead of length because % is counted in final length)
        const pairs = this.pairEquals(length);
        //randomly choose one of the permutations.
        const chosenPair = pairs[Math.floor(Math.random()*pairs.length) ];
        //Extract array of words with appropriate lengths that match pair
        let adjectivesWithLength = adjectives.filter(item=>{return item.length === chosenPair[1] });
        let nounsWithLength = nouns.filter(item=>{return item.length === chosenPair[0] });
        //get random indexes from get random index from above arrays
        const rand1 = Math.floor((Math.random() * adjectivesWithLength.length) );
        const rand2 = Math.floor((Math.random() * nounsWithLength.length) );
        
        this.setPasswordState(adjectivesWithLength[rand1]+ "%" + nounsWithLength[rand2])
    }

    render() {
        return (
            <View text={this.state.generatedPassword} handler={this.generateNewPassword}/>
        );
    }
}

export default PasswordGenerator;