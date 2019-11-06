import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/'

const EditUserButton = props => {
  const [renderForm, setRenderForm] = useState(false)
  const [formState, setFormState] = useState(props.singleUser[props.source])

  const handleChange = e => {
    setFormState({})
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      props.singleUser[props.source] = formState
      await props.updateUserThunk(props.singleUser)
      setRenderForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="edit-button">
      {renderForm ? (
        <button className="edit-button" onClick={() => setRenderForm(false)}>
          Emoji needed
        </button>
      ) : (
        <button className="edit-button" onClick={() => setRenderForm(true)}>
          Emoji needed
        </button>
      )}
    </div>
  )
}

export default connect(({singleUser}) => ({singleUser}), {updateUserThunk})(
  EditUserButton
)
