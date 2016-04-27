import FakeObjectDataListStore from './FakeObjectDataListStore'
import FixedDataTable from 'fixed-data-table'
import React from 'react'
import CustomTextCell from './CustomTextCell'
import SimpleButton from '../SimpleButton/SimpleButton'
import request from 'superagent'


const {Table, Column, Cell} = FixedDataTable;
// const {Cell} = SpreadsheetComponent
// import 'fixed-data-table'
import 'fixed-data-table/dist/fixed-data-table.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class DataListWrapper {

  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}
const columnNames = ['firstName', 'lastName', 'city', 'street']


class FilterExample extends React.Component {
  constructor(props) {
    super(props)

    this._dataList = new FakeObjectDataListStore(5);
    this.state = {
      filteredDataList: this._dataList,
      filterBy: "",
      buttonGit: false,
      dbClick:false
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleClick(requestPath,event){
    request
      .get(requestPath)
      .end(function (err, res) {
        console.log(res)
      });
    this.setState({
      buttonGit: !this.state.buttonGit
    })
  }

  // handleChange(e) {
  //   this.setState({
  //     dbClick:!this.state.dbClick
  //   })
  //   alert('it is db')
  // }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList
      });

    }


    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index)
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
      filterKeyWord: filterBy
    })
  }

  render (){
    var {filteredDataList, filterKeyWord} = this.state
    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
        <br />

        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>
          {columnNames.map(function(columnName){
            return <Column
              header={<Cell>{columnName}</Cell>}
              cell={<CustomTextCell data={filteredDataList} keyword={filterKeyWord} col={columnName}/>}
              fixed={true}
              width={150}
            />
          })}
        </Table>
        <br />
        <SimpleButton buttonName="Create Project" buttonposition="0cm 0cm 0cm 0cm" handleClick={this.handleClick.bind(this, '/git/init')}/>
        <SimpleButton buttonName="save" buttonposition="0cm 0cm 0cm 2cm" handleClick={this.handleClick.bind(this, '/git/commit')}/>

      </div>
    );
  }
}

module.exports = FilterExample;

