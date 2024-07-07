import React from 'react'
import { useParams } from 'react-router-dom'

const UpdatePage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
     <div>
      <h1>Update Restaurant {id}</h1>
      {/* Form or other content for updating the restaurant */}
    </div>
    </>
  )
}

export default UpdatePage