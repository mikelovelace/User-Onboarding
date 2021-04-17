import React from 'react'

export default function Users(props) {

  const { values } = props

  if (!values) {
    return <h3>Working fetching your User&apos;s details...</h3>
  }

  return (
    <div>
      <h2>Name: {values.username}</h2>
      <p>Email: {values.email}</p>
      <p>Role: {values.role}</p>
      <p>Gender: {values.gender}</p>
    </div>
  )
}