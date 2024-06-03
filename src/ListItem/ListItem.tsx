import React, { useState } from "react"

export const ListItem = (props: {
  desc: string
  id: string
  checked: boolean
}) => {
  const { desc, id, checked } = props

  return (
    <div className="list-item">
      <input className="list-item__checkbox" />
      <span className="list-item__description">{desc}</span>
      <div className="list-item__delete-button">Delete</div>
    </div>
  )
}
