import React from 'react'
import { Icon } from 'react-icons-kit'
import {edit2} from 'react-icons-kit/feather/edit2'
import {trash} from 'react-icons-kit/feather/trash'

export const IndividualWeight = ({weight,deleteWeight,editModal}) => {

    const handleDelete=()=>{
        deleteWeight(weight.id);
    }

    const handleEditModal=()=>{
        editModal(weight);
    }

    return (
        <div className='weight'>
            <div>
                {weight.Weight}
            </div>
            <div className='actions-div'>
                <div onClick={handleEditModal} id={weight.id} data-id={weight.id}>
                   <Icon size={18} icon={edit2}/>
                </div>
                <div className='delete-btn' onClick={handleDelete}>
                   <Icon size={18} icon={trash}/>
                </div>
            </div>
        </div>
    )
}

export default IndividualWeight