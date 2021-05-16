import React from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'

const Inputmask: React.FC<InputProps> = props => {
  return (
    <ReactInputMask maskChar={null} alwaysShowMask={false} {...props}>
      {(innerProps: InputProps) => <input {...innerProps} />}
    </ReactInputMask>
  )
}

export default Inputmask
