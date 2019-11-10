import React from 'react'
import {Link} from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div className="box">
      <h2 className="title is-4">Admin Panel</h2>
      <Link
        className="button is-success is-outlined is-rounded level"
        to="/users"
      >
        <strong>All Users</strong>
      </Link>
      <Link
        className="button is-success is-outlined is-rounded level"
        to="/orders"
      >
        <strong>All Orders</strong>
      </Link>
      <Link
        className="button is-success is-outlined is-rounded level"
        to="/create-product"
      >
        <strong>Create Product</strong>
      </Link>
      <Link
        className="button is-success is-outlined is-rounded level"
        to="/all-products-admin"
      >
        <strong>All Products Admin</strong>
      </Link>
    </div>
  )
}

export default AdminPanel
