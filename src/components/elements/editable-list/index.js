import React, { Component } from 'react';

import './style.less';

class EditableItem extends Component {

  state = {
    editing: false,
    text: '',
    loading: false
  }

  onClick() {
    !this.state.loading && this.setState({editing: true, text: this.props.item.title})
  }

  onBlur(event) {
    this.setState({editing: false})
    this.save(event.target.value);
  }

  save(value) {
    if(typeof this.props.onUpdate === 'function') {
      this.setState({loading: true, editing: false});
      return this.props.onUpdate({ ...this.props.item, title: value}).then(value => {
        console.log("Saved ok");
      }).catch((err) => {
        console.log("Error saving");
      }).finally(()=>{
        this.setState({loading: false});
      }); 
    } else {
      return Promise.resolve({ ...this.props.item, title: value});
    }
  }

  onKeyPress(event) {
    if(event.keyCode == 13) {
      this.onBlur(event);
    }
  }

  onChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    const { editing, text } = this.state
    const { title } = this.props.item;
    return (
      <span onClick={this.onClick.bind(this)}>
        { editing ? <input type="text" autoFocus defaultValue={text} onKeyPress={this.onKeyPress.bind(this)} onBlur={this.onBlur.bind(this)} /> : title }
      </span>
    )
  }
}

class SubList extends Component {

  render() {
    const { items } = this.props;

    return (
      <ul>
        {
          items.map(item=> (<li key={item._id}>
            <EditableItem item={item} onUpdate={this.props.onUpdateItem}></EditableItem>
            {item.children.length ? <SubList onUpdateItem={this.props.onUpdateItem} items={item.children}></SubList> : ''}
          </li>))
        }
      </ul>
    )
  }
}

class EditableList extends Component {

  render() {
    const { items } = this.props;

    return (
      <SubList onUpdateItem={this.props.onUpdateItem} items={items}></SubList>
    )
  }
}

export default EditableList;
