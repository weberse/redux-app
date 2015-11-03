import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

// Action:

// const increaseAction = {type: 'increase'};

 function increaseAction(event, amount) {
  return {
    type: 'CHANGE_AMOUNT',
    amount: amount + 1
  };
}

var loadUsers = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'LOAD_USERS',
                message
            })
        }, 2000)
    }
}


function loadUsersSimple() {
  return {
    type: 'LOAD_USERS'
  }
}


// React component
class Counter extends React.Component {
  render(){
    const { amount, dispatch } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>{amount}</h3>
        <button onClick={e => dispatch(increaseAction(e, amount))}>Increase</button>
        <button onClick={e => dispatch(loadUsers('message'))}>Load</button>
      </div>
    );
  }
}


// Reducer:
function amount(state = 0, action) {
  switch(action.type){
    case 'CHANGE_AMOUNT':
      return action.amount
    default:
      return state;
  }
}

// Reducer:
function users(state = [], action) {
  switch(action.type){
    case 'LOAD_USERS':
      return {
        users: action.users
      }
    default:
      return state;
  }
}



// Store:

// let store = createStore(counter)

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let reducer = combineReducers({ users, amount })
let store = createStoreWithMiddleware(reducer);


// Map Redux state to component props
function mapStateToProps(state) {
  const {amount, users} = state;
  return {
    amount: amount,
    users: users
  };
}

// Connected Component:
let App = connect(mapStateToProps)(Counter);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
