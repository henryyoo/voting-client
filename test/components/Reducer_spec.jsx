import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../../src/reducer';

describe('reducer', ()=> {
  it('should take an action and return a new action', () =>{
    const initialState = Map();
    const action = {
      type:"SET_STATE",
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            "Trainspotting":1,
            "28 Days Later":0
          })
        })
      })
    };

    const newState = reducer(initialState, action);

    expect(newState).to.equal(fromJS({
      vote:{
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          "Trainspotting" :1,
          "28 Days Later" :0
        }
      }
    }));
  });

  it('should set the state with undefined initialState', () => {
    const action = {
      type:"SET_STATE",
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            "Trainspotting":1,
            "28 Days Later":0
          })
        })
      })
    };

    const newState = reducer(undefined, action);

    expect(newState).to.equal(fromJS({
      vote:{
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          "Trainspotting" :1,
          "28 Days Later" :0
        }
      }
    }));
  });

  it('should add an hasVoted when the user votes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', "28 Days Later"],
        tally: {
          "Trainspotting" : 1
        }
      }
    });

    const newState = reducer(initialState, {type:"VOTE", entry:"Trainspotting"});

    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', "28 Days Later"],
        tally: {
          "Trainspotting" : 1
        }
      },
      hasVoted: "Trainspotting"
    }));
  })

  it('should not change the state when voted with an invalid entry', () =>{
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', "28 Days Later"],
        tally: {
          "Trainspotting" : 1
        }
      }
    });

    const newState = reducer(initialState, {type:"VOTE", entry:"Sunshine"});

    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', "28 Days Later"],
        tally: {
          "Trainspotting" : 1
        }
      }
    }));
  });

  it('should reset the hasVoted when new pair is set', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', "28 Days Later"],
        tally: {
          "Trainspotting" : 1
        }
      },
      hasVoted : "Trainspotting"
    });

    const newState = reducer(initialState, {type:"SET_STATE" ,state: {
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire']
      }
    }
    });

    expect(newState).to.equal(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire']
      }
    }));
  })
});
