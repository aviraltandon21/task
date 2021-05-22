import React,{useState} from 'react'
import { Icon } from 'react-icons-kit'
import {xCircle} from 'react-icons-kit/feather/xCircle'
import {auth, db} from '../Config/Config'
import firebase from 'firebase'

export const Modal = ({weight, editModal,updateWeightHandler}) => {

    const [editWeight, setEditWeight]=useState(weight.Weight);

    const handleClose=()=>{
       editModal(null);
    }

    const handleEditWeightSubmit=(e)=>{
        e.preventDefault();
        handleClose();
        updateWeightHandler(editWeight, weight.id);
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('weight of ' + user.uid).doc(weight.id).update({
                    Weight: editWeight,
                    created: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
            else{
                console.log('user is not signed in at modal.js to update weight');
            }
        })
    }

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='header'>
                    <div className='update-text'>Made some progress ? Update your weight</div>
                    <div className='close-btn'
                    onClick={handleClose}>
                        <Icon size={28} icon={xCircle}
                            style={{color: 'rgb(165, 2, 2)'}}
                        />
                    </div>
                </div>
                <div className='container-fluid'>
                    <form autoComplete="off" className='form-group'
                    onSubmit={handleEditWeightSubmit}>
                        <input type="text" className='form-control'
                            required placeholder="Update your weight"
                            value={editWeight} onChange={(e)=>setEditWeight(e.target.value)}
                        />
                        <br></br>
                        <button type="submit" className='btn btn-success btn-lg'>
                           UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal