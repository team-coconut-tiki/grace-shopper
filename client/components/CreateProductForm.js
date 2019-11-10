import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllCategories, addNewProduct} from '../store'

const CreateProductForm = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.list)
  const categoriesMapped = categories.map(
    category => (category = category.type)
  )
  useEffect(
    () => {
      dispatch(getAllCategories())
    },
    [categories.length]
  )

  const [form, setForm] = useState({
    title: '',
    description: '',
    priceInCents: 0,
    quantity: 0,
    imageUrl: '',
    categories: []
  })

  const handleChange = evt => {
    if (categoriesMapped.includes(evt.target.name)) {
      setForm({...form, categories: [...form.categories, evt.target.name]})
    } else {
      setForm({...form, [evt.target.name]: evt.target.value})
    }
    console.log('handle change', form)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(addNewProduct(form))
    setForm({
      title: '',
      description: '',
      priceInCents: 0,
      quantity: 0,
      imageUrl: '',
      categories: []
    })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Add a New Product</h1>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              name="title"
              type="text"
              placeholder="Special new coconut"
              value={form.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              placeholder="What a great new coconut!"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Price (in cents)</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="number"
              placeholder="10000"
              name="priceInCents"
              value={form.priceInCents}
              onChange={handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-dollar-sign" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Number in inventory</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="number"
              placeholder="50"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-hashtag" />
            </span>
          </div>
        </div>

        <div className="field">
          <div className="control columns is-multiline">
            {categories.map(category => (
              <label className="column is-one-quarter" key={category.id}>
                <input
                  type="checkbox"
                  name={category.type}
                  onChange={handleChange}
                />{' '}
                {category.type}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="coconut.png"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProductForm
