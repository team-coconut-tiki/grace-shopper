import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {
  updateUserThunk,
  adminDeleteUserThunk,
  updateOtherUserThunk
} from '../store/'

const EditUserButton = props => {
  const user = props.isSameUser ? props.currentUser : props.otherUser
  const [renderForm, setRenderForm] = useState()
  const [formState, setFormState] = useState(user[props.source])

  useEffect(
    () => {
      setFormState(user[props.source])
    },
    [user[props.source]]
  )

  const handleChange = e => {
    setFormState(e.target.value)
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const payload = {...user, [props.source]: formState}
      props.isSameUser
        ? await props.updateUserThunk(payload)
        : await props.updateOtherUserThunk(payload)
      console.log(user)
      console.log(props.otherUser)
      setRenderForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  // function useToggle (default) {
  //   const [value, setValue] = React.useState(default)
  //   return [value, () => setValue(!value)]
  // }

  // function useInput (default) {
  //   const [value, setValue] = React.useState(default)
  //   return { value: value, onChange: event => setValue(event.target.value) }
  // }
  return (
    <div className="edit-user-button">
      {renderForm ? (
        <>
          <div className="user-edit-form-container">
            <form onSubmit={handleSubmit}>
              <input
                name="form"
                type="text"
                className="user-edit-form input"
                onChange={handleChange}
              />
              <button type="submit" className="button" onClick={handleSubmit}>
                Submit
              </button>
              <button
                type="button"
                className="edit-user-button button"
                onClick={() => setRenderForm(false)}
              >
                <span className="icon">
                  <i className="fas fa-chevron-up" />
                </span>
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
            <span className="icon">
              <i className="fas fa-edit" />
            </span>
            <span className="icon">
              <i className="fas fa-chevron-down" />
            </span>
          </button>
        </>
      )}
    </div>
  )
}

export default connect(
  ({currentUser, otherUser}) => ({currentUser, otherUser}),
  {updateUserThunk, adminDeleteUserThunk, updateOtherUserThunk}
)(EditUserButton)
