import React, { Component } from 'react';
import './App.css'
import { FormControl, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import Icon from 'material-ui/Icon'


class App extends Component {

  state = {
    databases: [],
    platforms: [],
    currentlySelect: {},
    data: [],
    testCheck: true
  }

  componentDidMount = () => {
    let data = this.props.data
    for(let dbIndex in data) {
      data[dbIndex].checked = false
      data[dbIndex].expanded = false
      data[dbIndex].type = 'database'
      Object.defineProperty( data[dbIndex], 'children', Object.getOwnPropertyDescriptor(  data[dbIndex], 'platforms'))
      delete data[dbIndex].platforms;
      for(let platIndex in data[dbIndex].children) {
        data[dbIndex].children[platIndex].type = 'platform'
        data[dbIndex].children[platIndex].checked = false
      }
    }
    console.log(data)
    this.setState({
      data: data
    })
  }

  handleDatabaseChange = index => event => {
    // console.log(event.shiftKey)

    let data = this.state.data
    data[index].checked = event.target.checked

    let databases = this.state.databases
    let platforms = this.state.platforms

    if (event.target.checked) {
      databases.push(data[index].id)
      // propagate to all children
      for(let child in data[index].children) {
        // data[index].children
        data[index].children[child].checked = true
      }
    } else {
      let newIndex = databases.indexOf(data[index].id)
      if (newIndex !== -1) databases.splice(newIndex, 1)
      // propagate to all children
      for(let child in data[index].children) {
        // data[index].children
        data[index].children[child].checked = false
      }
    }

    this.setState({
      data: data,
      databases: databases,
      platforms: platforms
    })
  }

  handlePlatformChange = (dbIndex, platIndex) => event => {
    let currentObject = null
    let data = this.state.data

    if (event.shiftKey && Object.keys(this.state.currentObject).length !== 0) {
      let oldIndex = this.state.currentObject.platformIndex
      let start = (oldIndex > platIndex) ? platIndex : oldIndex
      let stop = (oldIndex > platIndex) ? parseInt(oldIndex) + 1 : parseInt(platIndex) + 1
      for(let index = start; index < stop; index++) {
        data[dbIndex].children[index].checked = event.target.checked
      }
      currentObject = {
        platformIndex: platIndex,
        database: this.state.data[dbIndex].name
      }
    } else {
      currentObject = {
        platformIndex: platIndex,
        database: this.state.data[dbIndex].name
      }
      data[dbIndex].children[platIndex].checked = event.target.checked
      // data[dbIndex].checked = event.target.checked

    }

    let checkedChildren = data[dbIndex].children.filter((child) => child.checked === true)
    data[dbIndex].checked = checkedChildren.length !== 0 ? true : false
    
    this.setState({
      data: data,
      currentObject: currentObject
    })
  }

  expandParent = index => event => {
    let data = this.state.data
    data[index].expanded = !data[index].expanded
    this.setState({
      data
    })
  }

  renderParents = () => {
    let items = []
    this.state.data.map((item, i) => {
        items.push(
            <div key={`d${i}`}>
              {!item.expanded ? <Icon onClick={this.expandParent(`${i}`)} color="primary" className="tree-button">
                add_circle
              </Icon>
              :
              <Icon onClick={this.expandParent(`${i}`)} color="primary" className="tree-button">
                remove_circle
              </Icon>
              }
              <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.data[i].checked}
                          onClick={this.handleDatabaseChange(`${i}`)}
                          value="item"
                        />
                      }
                      label={`${this.state.data[i].name}`}
                    />
              </div>
            )
            if(item.expanded) {
              item.children.map((child, j) => {
                items.push (
                  <FormControlLabel
                        style={{marginLeft: '50px', marginTop: '-10px'}}
                        key={`p${j}d${i}`}
                        control={
                          <Checkbox
                            checked={this.state.data[i].children[j].checked}
                            onClick={this.handlePlatformChange(`${i}`, `${j}`)}
                            value="item"
                          />
                        }
                        label={`${child.name} (samples: ${child.sample_count})`}
                      />
                  )
              })
            }
    })

    return items
  }

  render() {

    return (
      <div className="App">
        <FormControl component="fieldset">
          {this.renderParents()}
        </FormControl>
      </div>
    );
  }
}

export default App;
