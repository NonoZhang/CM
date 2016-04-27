/**
 * Created by developer on 16-4-27.
 */
import React, {PropTypes} from 'react'
import {Cell} from 'fixed-data-table'
import {Input} from 'react-bootstrap'

class CustomTextCell extends React.Component {

  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    col: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired,
    // handleChange: PropTypes.object.isRequired
  };

  render () {
    const {
      rowIndex,
      data,
      col,
      keyword,
    } = this.props
    let text = <Cell>
      <Input type="text" defaultValue={data.getObjectAt(rowIndex)[col]}/>
    </Cell>

    if (keyword) {
      let pattern = new RegExp(keyword.replace(/\W\s/g, ''), 'i')
      let match = pattern.exec(data.getObjectAt(rowIndex)[col])
      let dataText = data.getObjectAt(rowIndex)[col]

      text = match ?
        <Cell>
          {dataText.slice(0, match.index)}
          <span style={{ color: 'red' }}>
              {data.getObjectAt(rowIndex)[col].slice(match.index, match.index + keyword.length)}
          </span>
          {data.getObjectAt(rowIndex)[col].slice(match.index + keyword.length, -1)}
        </Cell>
        : <Cell>{data.getObjectAt(rowIndex)[col]}</Cell>
    }
    return (
      <div>
        {text}
      </div>
    )
  }

}

export default CustomTextCell
