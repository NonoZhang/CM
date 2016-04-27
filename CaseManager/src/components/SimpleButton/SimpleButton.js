import React from 'react'

class SimpleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {buttonName, handleClick,buttonposition} = this.props;
    return (
      <div>
        <button type="button" className='btn btn-primary' style={{margin:buttonposition,float:'left'}} onClick={handleClick}>
          {buttonName}
        </button>
      </div>
    )
  }
}

export default SimpleButton
