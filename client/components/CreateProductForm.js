import React from 'react'

const CreateProductForm = () => {
  return (
    <div className="container">
      <h1 className="title">Add a New Product</h1>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Special new coconut"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="What a great new coconut!"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Price (in cents)</label>
        <div className="control has-icons-left">
          <input className="input" type="number" placeholder="10000" value="" />
          <span className="icon is-small is-left">
            <i className="fas fa-dollar-sign" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Number in inventory</label>
        <div className="control has-icons-left">
          <input className="input" type="number" placeholder="50" value="" />
          <span className="icon is-small is-left">
            <i className="fas fa-hashtag" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Categories</label>
        <div className="control">
          <div className="select">
            <select>
              <option>Luau</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Image URL</label>
        <div className="control">
          <input className="input" type="text" placeholder="coconut.png" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateProductForm
