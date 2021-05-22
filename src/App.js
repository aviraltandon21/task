import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Home } from './Components/Home'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import {NotFound} from './Components/NotFound'
import {auth, db} from './Config/Config'

export class App extends Component {
  
  state={
    currentUser: null,
    weights:[],
    weight: null
  }

  componentDidMount(){
    // getting current user
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users').doc(user.uid).get().then(snapshot=>{
          this.setState({
            currentUser: snapshot.data().Name
          })
        })
      }
      else{
        console.log('user is not signed in for getting current user');
      }      
    })
    auth.onAuthStateChanged(user=>{
      if(user){
        const weightList = this.state.weights;
        db.collection('weight of ' + user.uid).orderBy("created", "desc").onSnapshot(snapshot=>{
          let changes = snapshot.docChanges();
          changes.forEach(change=>{
            if(change.type==='added'){
              weightList.push({
                id: change.doc.id,
                Weight: change.doc.data().Weight
              })
            }
            else if(change.type==='removed'){
              for(var i = 0; i<weightList.length; i++){
                if(weightList[i].id===change.doc.id){
                  weightList.splice(i,1);
                }
              }
            }
          
            this.setState({
              weights: weightList
            })
            // console.log(this.state.weights);
          })
        })
      }
      else{
        console.log('user is not signed in to retrive weights');
      }
    })
  }

  deleteWeight=(id)=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('weight of ' + user.uid).doc(id).delete();
      }
      else{
        console.log('user is not signed in to delete data');
      }
    })
  }

  editModal=(weight)=>{
    // console.log(weight.id);
    this.setState({
      weight: weight
    })
  }

  updateWeightHandler=(weight, id)=>{
    // console.log(id, weight);
    const weightList=this.state.weights;
    for(var i=0; i<weightList.length; i++){
      if(weightList[i].id===id){
        // console.log('id matched');
        weightList.splice(i,1,{id,Weight: weight});
        
      }
      this.setState({
        weights: weightList
      })
      
    }
    
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Home
          currentUser={this.state.currentUser}
          weights={this.state.weights}
          deleteWeight={this.deleteWeight}
          editModal={this.editModal}
          weight={this.state.weight}
          updateWeightHandler={this.updateWeightHandler}
          />}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>

          <Route path="" component={NotFound}/>
        </Switch>
      </Router>      
    )
  }
}

export default App