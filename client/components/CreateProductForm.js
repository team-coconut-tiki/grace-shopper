import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllCategories, addNewProduct, fetchProduct} from '../store'

const CreateProductForm = props => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.list)
  const productToUpdate = useSelector(
    state => state.singleProduct.selectedProduct
  )
  const categoriesMapped = categories.map(
    category => (category = category.type)
  )

  const productId = props.match.params.id //if is update
  const thisProductsCategories = productToUpdate.categories
    ? productToUpdate.categories.map(category => (category = category.type))
    : false

  useEffect(
    () => {
      dispatch(fetchProduct(productId))
    },
    [productId]
  )

  useEffect(
    () => {
      dispatch(getAllCategories())
    },
    [categories.length]
  )

  const initialState = {
    title: '',
    description: '',
    priceInCents: 0,
    quantity: 0,
    imageUrl: '',
    categories: []
  }

  let thisState = productId
    ? {
        title: productToUpdate.title,
        description: productToUpdate.description,
        priceInCents: productToUpdate.priceInCents,
        quantity: productToUpdate.quantity,
        imageUrl: productToUpdate.imageUrl,
        categories: thisProductsCategories
      }
    : initialState
  const [form, setForm] = useState(thisState)

  useEffect(() => setForm(thisState), [productToUpdate])

  const handleChange = evt => {
    if (categoriesMapped.includes(evt.target.name)) {
      if (evt.target.checked) {
        setForm({...form, categories: [...form.categories, evt.target.name]})
      } else {
        setForm({
          ...form,
          categories: form.categories.filter(category => {
            return category !== evt.target.name
          })
        })
      }
    } else {
      setForm({...form, [evt.target.name]: evt.target.value})
    }
    console.log('form', form)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    dispatch(addNewProduct(form))
    setForm(initialState)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="box">
        <h1 className="title">Add a New Product</h1>

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

        <div className="control columns is-multiline">
          {categories.map(category => (
            <label className="column is-one-quarter" key={category.id}>
              <input
                type="checkbox"
                name={category.type}
                onChange={handleChange}
                checked={form.categories.includes(category.type)}
              />{' '}
              {category.type}
            </label>
          ))}
        </div>

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

        <div className="control">
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </>
  )
}

export default CreateProductForm