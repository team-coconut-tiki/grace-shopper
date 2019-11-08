import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateUserThunk, deleteUserThunk} from '../store/'

function useToggle (default) {
  const [value, setValue] = React.useState(default)
  return [value, () => setValue(!value)]
}

function useInput (default) {
  const [value, setValue] = React.useState(default)
  return { value: value, onChange: event => setValue(event.target.value) }
}

function PersonForm (props) {
  const age = useInput("")
  const name = useInput("")

  return (
    <form onSubmit={event => {
      event.preventDefault()
      axios.post('/users', {name: name.value, age: age.value})
    }}>
      <input name="name" {...name} />
      <input name="age" {...age}/>
    </form>
  )
}

const EditUserButton = props => {
  const [renderForm, toggleForm] = useToggle(false)
  const [renderForm, setRenderForm] = useState()
  // REVIEW: talk me through this
  const [formState, setFormState] = useState(props.singleUser[props.source])

  const handleChange = e => {
    setFormState(e.target.value)
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      //props.singleUser[props.source] = formState
      //const payload = {}

      payload[props.source] = formState
      await props.updateUserThunk(payload)
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

export default connect(({singleUser}) => ({singleUser}), {
  updateUserThunk,
  deleteUserThunk
})(EditUserButton)
