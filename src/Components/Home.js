import React,{useState} from 'react'
import {Header} from './Header'
import {auth, db} from '../Config/Config'
import Weights from './Weights'
import Modal from './Modal'
import firebase from 'firebase'
export const Home = ({currentUser,weights,deleteWeight,editModal,weight,updateWeightHandler}) => {

    const [addWeight, setaddWeight]=useState('');
    const [WeightError, setWeightError]=useState('');

    const handleWeightSubmit=(e)=>{
        e.preventDefault();
        auth.onAuthStateChanged(user=>{
          if(user){
            db.collection('weight of ' + user.uid).add({
              Weight: addWeight + " kg",
              created: firebase.firestore.FieldValue.serverTimestamp()
            }).then(setaddWeight('')).catch(err=>setWeightError(err.message))
          }
          else{
            console.log('no user is signed in');
          }
        })
      }
    
    return (
        <>
        <div className='wrapper'>
          <Header currentUser={currentUser}/>
          <br></br>
          <br></br>
          <div className='container'>
            <form autoComplete='off' className='form-group'
            onSubmit={handleWeightSubmit}>
            {currentUser&&<>
              <input type="text" placeholder="Enter Weight in Kgs"
                className='form-control' required
                onChange={(e)=>setaddWeight(e.target.value)} value={addWeight}
              />
              <br></br>
              <div style={{width: 100+'%',
              display: 'flex',justifyContent: 'flex-end'}}>
                <button type="submit" className='btn btn-success'
                  style={{width: 100+'%'}}>
                   ADD
                </button>
              </div>
              {WeightError&&<div className='error-msg'>{WeightError}</div>}
            </>}
            {!currentUser&&<>
              <input type="text" placeholder="Enter Weight in Kgs"
                className='form-control' required disabled
              />
              <br></br>
              <div style={{width: 100+'%',
              display: 'flex',justifyContent: 'flex-end'}}>
                <button type="submit" className='btn btn-success'
                disabled style={{width: 100+'%'}}>
                   ADD
                </button>
              </div>
              <div className='error-msg'>
                Please register your account or login to use application
              </div>
            </>}
            
            </form>
            <Weights weights={weights} deleteWeight={deleteWeight} editModal={editModal}/>
            <br></br>
            <br></br>
            </div>
            </div>
            {weight&&<Modal weight={weight} editModal={editModal}
            updateWeightHandler={updateWeightHandler}
            />}
            </>
    )
}

export default Home