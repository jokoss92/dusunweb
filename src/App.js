import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    listBuah: [],
    buah: '',
    filter: ''
  }
  add = ()=>{
    const buah={
      nama: this.state.buah,
      status: ''
    }
    // console.log(buah);
    this.setState({
      listBuah: [...this.state.listBuah, buah],
      buah:''
    },()=>{
      localStorage.setItem('listBuah',JSON.stringify(this.state.listBuah))
    });
  }
  coret = (id)=>{
    const data = this.state.listBuah;
    const bh = data[id];
    if(bh===undefined) return;
    let tag ="";
    if(bh.status===""){
      tag = "done"
    }
    const nbh = {
      nama: bh.nama,
      status: tag
    }
    // console.log(bh);
    data.splice(id,1,nbh);
    this.setState({
      listBuah:data
    },()=>{
      localStorage.setItem('listBuah',JSON.stringify(this.state.listBuah))
    });
  }
  delete = (id)=>{
    const data = this.state.listBuah;
    data.splice(id,1);
    this.setState({
      listBuah:data
    },()=>{
      localStorage.setItem('listBuah',JSON.stringify(this.state.listBuah))
    });
  }
  handleChange = (event) => {
    const buahInput = event.target.value;
    // console.log(buah);
    this.setState({
      "buah": buahInput
    })
  }
  handleSelect = (event) => {
    this.setState({filter:event.target.value});
  }
  handleKeyPress = (e)=>{
    if(e.key === 'Enter'){
      this.add();
    }
  }
  componentDidMount(){
    const data = localStorage.getItem('listBuah');
    if(data){
      const listBuah = JSON.parse(data);
      this.setState({
        listBuah: listBuah
      });
    }
  }
  render() {
    return (
      <div>

      <h1>Todo List</h1>
      <div class="input-group mb-3">        
        <input 
            class="form-control"
            type="text" 
            value={this.state.buah}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}/>
        <div class="input-group-prepend">
          <button onClick={this.add} class="btn btn-outline-success btn-sm" type="button">Add</button>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Filter</label>
        </div>
        <select class="custom-select" onChange={this.handleSelect} value={this.state.filter} >
          <option value="All" selected>All</option>
          <option value="">Do</option>
          <option value="done">Done</option>
        </select>
      </div>
      <ul class="list-group list-group-flush">
        {this.state.listBuah.filter(bh=>{
          if(this.state.filter==="All") return bh;  
          return bh.status === this.state.filter;
        }).map((buah,id)=>{
          return <li class="list-group-item" onClick={()=>this.coret(id)}> <span class={buah.status}>{buah.nama}</span>
          <button 
            onClick={()=>this.delete(id)}
            class="btn btn-outline-danger btn-sm float-right">X</button>
          </li>
        })}
      </ul>
      
    </div>
    );
  }
}

export default App;
