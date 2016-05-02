'use strict';

import React from 'react';
import {findDom} from 'react-dom';
import TreeNode from './TreeNode'
import 'bootstrap/dist/css/bootstrap.min.css'
import './react-bootstrap-treeview.css'
import TableView from '../TableView/TableView'
const data = [
    {
        text: 'Parent 1',
        nodes: [
            {
                text: 'Child 1',
                nodes: [
                    {
                        text: 'Grandchild 1',
                        type:"tableview"
                    },
                    {
                        text: 'Grandchild 2',
                        type:"tableview"
                    }
                ]
            },
            {
                text: 'Child 2'
            }
        ]
    },
    {
        text: 'Parent 2'
    },
    {
        text: 'Parent 3'
    },
    {
        text: 'Parent 4'
    },
    {
        text: 'Parent 5'
    }
];

class MyTreeView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        type:"tableview",
        text:""
    };
    this.viewType ="tableview";

  }
  handleClick(text,type,event){
     if(type && type === "tableview")
     {
       this.setState({
         type:type,
         text:text
       })
     }
    else{
       this.setState({
         type:null,
         text:text
       })
     }
  }
  render(){
    var children = [];
    if (data) {
        data.map(function (node) {
          children.push(<TreeNode node={node}
                                level={1}
                                visible={true} handleClick ={this.handleClick.bind(this)}
                                />);

      }.bind(this));
    }

    var rightContent=[];
    console.log(this.state.type  +" == "+ this.viewType);
    if(this.state.type == this.viewType)
    {
      rightContent.push(<TableView/>);

    }
    else{
      rightContent.push(<span>{this.state.text} </span>);
    }




    return (
    <div className="container">
      <div className="row col-xs-4">
          <div id='treeview'>
            <ul className='list-group'>
              {children}
            </ul>
          </div>

      </div>
      <div className="row col-xs-8" >
        {rightContent}
      </div>
    </div>

    );
  }
}

module.exports = MyTreeView;

