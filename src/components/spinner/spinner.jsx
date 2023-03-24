import React from 'react'
import spinner from '../../assets/gif/Spinner.gif'

const Spinner = () => {
    return (
        <React.Fragment>
            <img src={spinner} alt="" className='d-block m-auto' style={{ width: "200px" }} />
        </React.Fragment>
    )
}
export default Spinner