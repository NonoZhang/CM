
import React from 'react';


class TreeNode extends  React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            selected: false
        }

        this.expandIcon= 'glyphicon glyphicon-circle-arrow-down';
        this.collapseIcon= 'glyphicon glyphicon-minus';
        this.emptyIcon= 'glyphicon';
        this.nodeIcon= 'glyphicon glyphicon-stop';

        this.color= undefined;
        this.backColor= undefined;
        this.borderColor= undefined;
        this.onhoverColor= '#F5F5F5'; // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
        this.selectedColor= '#FFFFFF';
        this.selectedBackColor= '#428bca';

        this.enableLinks= false;
        this.highlightSelected= true;
        this.showBorder= true;
        this. showTags= false;

    }


    toggleExpanded(id, event) {
        this.setState({ expanded: !this.state.expanded });
        event.stopPropagation();
    }

    toggleSelected(id, event) {
        this.setState({ selected: !this.state.selected });
        event.stopPropagation();
    }

    render() {


      //--------------------------------------------------------------
      //var parent = this.props.parent;
      var node = this.props.node;

      var options = this;

      var handleClick =  this.props.handleClick;
      var style;
      if (!this.props.visible) {

        style = {
          display: 'none'
        };
      }
      else {

        if (options.highlightSelected && this.state.selected) {
          style = {
            color: options.selectedColor,
            backgroundColor: options.selectedBackColor
          };
        }
        else {
          style = {
            color: node.color || options.color,
            backgroundColor: node.backColor || options.backColor
          };
        }

        if (!options.showBorder) {
          style.border = 'none';
        }
        else if (options.borderColor) {
          style.border = '1px solid ' + options.borderColor;
        }
      }

      var indents = [];
      for (var i = 0; i < this.props.level-1; i++) {
        indents.push(<span className='indent'></span>);
      }

      var expandCollapseIcon;
      if (node.nodes) {
        if (!this.state.expanded) {
          expandCollapseIcon = (
            <span className={options.expandIcon}
                  onClick={this.toggleExpanded.bind(this, node)}>
            </span>
          );
        }
        else {
          expandCollapseIcon = (
            <span className={options.collapseIcon}
                  onClick={this.toggleExpanded.bind(this, node)}>
            </span>
          );
        }
      }
      else {
        expandCollapseIcon = (
          <span className={options.emptyIcon}></span>
        );
      }

      var nodeIcon = (
        <span className='icon'>
          <i className={node.icon || options.nodeIcon}></i>
        </span>
      );

      var nodeText;
      if (options.enableLinks) {
        nodeText = (
          <a href={node.href} onClick={this.props.handleClick} /*style="color:inherit;"*/>
            {node.text}
          </a>
        );
      }
      else {
        nodeText = (
          <span onClick={this.props.handleClick.bind(null,node.text,node.type)} >{node.text}</span>

        );
      }

      var badges;
      if (options.showTags && node.tags) {
        badges = node.tags.map(function (tag) {
          return (
            <span className='badge'>{tag}</span>
          );
        });
      }

      var children = [];
      if (node.nodes) {
        var _this = this;
        node.nodes.forEach(function (node) {
          children.push(<TreeNode node={node}
                                  level={_this.props.level+1}
                                  visible={_this.state.expanded && _this.props.visible}
                                  handleClick={handleClick}
                                   />);
        });
      }

      return(
        <li className='list-group-item'
            style={style}
            onClick={this.toggleSelected.bind(this, node)}
            key={node}>
          {indents}
          {expandCollapseIcon}
          {nodeIcon}
          {nodeText}
          {badges}
          {children}
        </li>
      );



      //--------------------------------------------------------------
    }
}

module.exports = TreeNode;