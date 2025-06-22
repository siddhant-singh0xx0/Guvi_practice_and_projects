import React from 'react'

function Spinner() {
  return (
    <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button>
  )
}

export default Spinner