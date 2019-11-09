import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateUserThunk, deleteUserThunk} from '../store/'

const EditUserButton = props => {
  const user = props.user
  const [renderForm, setRenderForm] = useState()
  const [formState, setFormState] = useState(user[props.source])

  const handleChange = e => {
    setFormState(e.target.value)
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      user[props.source] = formState
      await props.updateUserThunk(user)
      setRenderForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="edit-user-button">
      {renderForm ? (
        <>
          <button
            type="button"
            className="edit-user-button"
            onClick={() => setRenderForm(false)}
          >
            Emoji needed
          </button>
          <div className="user-edit-form-container">
            <form onSubmit={handleSubmit}>
              <input
                name="form"
                className="user-edit-form"
                onChange={handleChange}
                value={formState}
              />
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            className="edit-user-button"
            onClick={() => setRenderForm(true)}
          >
            Emoji needed
          </button>
        </>
      )}
    </div>
  )
}

export default connect(
  ({currentUser, otherUser}) => ({currentUser, otherUser}),
  {updateUserThunk, deleteUserThunk}
)(EditUserButton)
