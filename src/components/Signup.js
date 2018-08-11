import React from "react"
import modal from './Modal'
import { Input, Button } from './StyledComponents'

const handleClick = (e, cb, credentials) => {
  e.preventDefault()
  cb(credentials)
}

const handleChange = (cb, inputType, input) => {
  cb(inputType, input)
}

const Signup = ({
  signup,
  closeModal,
  username,
  password,
  showModal,
  addText,
  clear
}) => {

  const enterInput =
    (e) =>
      e.key === 'Enter'
      && handleClick(e, signup, { username, password })

  return modal({
    showModal,
    handleClose: () => closeModal('signup')
  })(
    <div>
      <div className="modal-title">SIGNUP</div>
      <Input
        value={username}
        onChange={e => handleChange(addText, "username", e.target.value)}
        placeholder="Username"
        type="text"
        required
        onKeyPress={enterInput}
      />
      <Input
        value={password}
        onChange={e => handleChange(addText, "password", e.target.value)}
        placeholder="Password"
        type="password"
        required
        onKeyPress={enterInput}
      />
      <Button
        onClick={e => {
          handleClick(e, signup, { username, password })
          clear()
        }}
      >
        Submit
      </Button>
    </div>
  )
}

export default Signup