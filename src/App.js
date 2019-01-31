import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className = "App">
        <h1>Dojo Dossier</h1><br></br>
        <h4>Welcome to the Dojo Dossier! Create profiles of various people or subjects, fictional or real,
          by filling in the form below. Then, describe about them by clicking on their respective tabs and
          adding whatever items you feel like!
        </h4>
        <Dossier/>
      </div>
    );
  }
}

class Dossier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      title: "",
      submit: false,
      name: ""
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.submit = this.submit.bind(this);
    this.setName = this.setName.bind(this);
  }

  handleTitle(event) {
    var title = event.target.value;
    this.setState({title: title});

    if (title.length > 3) {
      this.setState({submit: true});
    }
    else {
      this.setState({submit: false});
    }
  }

  submit(e) {
    e.preventDefault();
    this.setState({names: [...this.state.names, {name: this.state.title, items: [], active: false} ],
      title: "", submit: false});
  }

  setName(n) {
    this.state.names.map((name) => {
      return name.active = false;
    });
    n.active = true;
    this.setState({name: n});
  }

  render() {
    var dossier = this.state.names.map((name, i) => {
      return (
        <button className = {name.active ? "activetab" : "tab"} key = {i} 
          onClick = {() => this.setName(name)}>{name.name}</button>
      )
    });

    return (
      <div id = "main">
        <div id = "newform">
          <form onSubmit = {this.submit}>
            <input type = "text" name = "title" value = {this.state.title} onChange = {this.handleTitle}
            placeholder = "Title" size = "30"></input>

            <input type = "submit" className = "btn btn-primary" value = "Add New Tab"
            disabled = {!this.state.submit}></input>
          </form>

          <div id = "tabs">
            {dossier}
          </div>
          {this.state.name ? <Info name = {this.state.name}/> : null}
        </div>
      </div>
    )
  }
}

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      item: "",
      submit: false
    }

    this.handleItem = this.handleItem.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleItem(event) {
    var item = event.target.value;
    this.setState({item: item});

    if (item.length > 3) {
      this.setState({submit: true});
    }
    else {
      this.setState({submit: false});
    }
  }

  submit(e) {
    e.preventDefault();
    this.state.name.items.push(this.state.item);
    this.setState({item: "", submit: false});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name });
  }

  render() {
    var content;
    if (this.state.name.items != null) {
      content = this.state.name.items.map((item, j) => {
        return (
          <li key = {j}>{item}</li>
        )
      });
    }

    return (
      <div className = "tabcontent">
        <ul>
          {content}
        </ul>

        <form onSubmit = {this.submit}>
          <input type = "text" name = "title" value = {this.state.item} onChange = {this.handleItem}
          placeholder = "Enter the character's items here" size = "60"></input>

          <input type = "submit" className = "btn btn-secondary" value = "Add Item"
          disabled = {!this.state.submit}></input>
        </form>
      </div>
    )
  }
}

export default App;
