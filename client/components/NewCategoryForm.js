import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addNewCategoryThunk} from '../store'

const NewCategoryForm = props => {
  const dispatch = useDispatch()
  const initialState = {
    type: ''
  }
  const [form, setForm] = useState(initialState)
  const handleChange = evt => {
    setForm({...form, [evt.target.name]: evt.target.value})
  }
  const handleSubmit = evt => {
    evt.preventDefault()

    dispatch(addNewCategoryThunk(form))
    // setForm(initialState)
    props.history.push(`/all-products-admin`)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="box">
        <h1 className="title">Add a New Category</h1>

        <label className="label">Category Name</label>
        <div className="control">
          <input
            className="input"
            name="type"
            type="text"
            placeholder="Special new category"
            value={form.type}
            onChange={handleChange}
          />
        </div>

        <div className="control">
          <button type="submit" className="button is-success">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default NewCategoryForm
