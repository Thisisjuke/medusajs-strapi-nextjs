import * as React from "react";

const CloseIcon = () => (
  <svg width="1.5em" height="1;5em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path></svg>
)

export const ClosePopup = ({closeModal}) => {

  return(
    <div onClick={closeModal} style={{position: 'absolute', 'top': '12px', 'right': '12px', cursor: 'pointer'}}>
      <CloseIcon />
    </div>
  )
}
