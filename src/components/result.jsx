import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './winner';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const Result = React.createClass({
  mixins:[PureRenderMixin],
  getPair: function(){
    return this.props.pair || [];
  },
  getVote: function(entry){
    if(this.props.tally && this.props.tally.has(entry)){
      return this.props.tally.get(entry);
    }
    return 0;
  },
  render: function(){
    return this.props.winner ? <Winner winner={this.props.winner} ref="winner" /> :
    <div className="result">
        <div className = 'tally'>
        {
          this.getPair().map(entry =>
            <div className="entry" key={entry}>
              <h1>{entry}</h1>
              <div className="voteCount">
                {this.getVote(entry)}
              </div>
            </div>
          )
        }
      </div>
      <div className = 'management' >
        <button ref='next'
                className = 'next'
                onClick={this.props.next}>
          Next
        </button>

      </div>
    </div>
  }
});

function mapStateToProps(state){
  return {
    pair : state.getIn(['vote','pair']),
    winner: state.get('winner'),
    tally: state.getIn(['vote', 'tally'])
  };
}

export const ResultContainer = connect(mapStateToProps,actionCreators)(Result);
