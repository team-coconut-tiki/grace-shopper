import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/'

const EditUserButton = props => {
  const [renderForm, setRenderForm] = useState()
  const [formState, setFormState] = useState(props.singleUser[props.source])

  const handleChange = e => {
    setFormState(e.target.value)
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
        <>
          <button
            type="button"
            className="edit-button"
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
            className="edit-button"
            onClick={() => setRenderForm(true)}
          >
            Emoji needed
          </button>
        </>
      )}
    </div>
  )
}

export default connect(({singleUser}) => ({singleUser}), {updateUserThunk})(
  EditUserButton
)
