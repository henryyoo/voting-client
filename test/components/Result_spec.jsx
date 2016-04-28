import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {List,Map} from 'immutable';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} from 'react-addons-test-utils';
import {Result} from '../../src/components/result';

describe('result', () => {
  it('should render two divs with entry name and tally', ()=>{
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting': 5 , '28 Days Later':4});
    const component = renderIntoDocument(<Result pair = {pair} tally = {tally} />);
    const divs = scryRenderedDOMComponentsWithClass(component, 'entry');

    expect(divs.length).to.equal(2);
    expect(divs[0].textContent).to.contain('Trainspotting');
    expect(divs[1].textContent).to.contain('28 Days Later');

    expect(divs[0].textContent).to.contain('5');
    expect(divs[1].textContent).to.contain('4');

  });

  it('should invoke a callback function when next is clicked', () => {
    let nextInvoked =false;
    const next = () => nextInvoked = true;
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Result pair = {pair} tally = {Map()} next = {next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('should declare a winner', () => {
    const pair = List.of('Trainspotting', '28 Days Later');

    const component = renderIntoDocument(
      <Result winner = "Trainspotting" pair = {pair} tally = {Map()} />
    )

    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner).to.be.ok
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
