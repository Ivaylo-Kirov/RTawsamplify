import React from 'react';
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`

class App extends React.Component {

  todoMutation = async () => {
    const todoDetails = {name: 'Second todo', description: 'wow'};
    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    console.log(JSON.stringify(newTodo));
  }

  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    console.log(JSON.stringify(allTodos));
  }


  render() {
    return(
      <div>
        <button onClick={this.listQuery}>GraphQL Query</button>
        <button onClick={this.todoMutation}>GraphQL Mutation</button>
      </div>
    );
  }
}

export default App;
