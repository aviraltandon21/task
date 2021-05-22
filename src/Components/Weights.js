import React from 'react'
import { IndividualWeight } from './IndividualWeight'

export const Weights = ({weights,deleteWeight,editModal}) => {
    
    return weights.map(weight=>(
        <IndividualWeight weight={weight} key={weight.id} deleteWeight={deleteWeight}
        editModal={editModal} />
    ))
}

export default Weights