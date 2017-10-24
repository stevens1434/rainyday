import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class EditBankData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    }
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  deleteTransaction(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    let currentState = this.state.records;
    let trans = this.state.records[i]._id;
    let a = this;
    axios.put('/bankRecords', {
      data: trans
    }).then(function (response) {
      currentState.splice(i, 1);
      a.setState({
        records: currentState
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

  categoryChange(e) {
    e.preventDefault();
    let i = e.target.getAttribute('data-key');
    let Category = e.target.getAttribute('data-value');
    let currentState = this.state.records;
    console.log("currentState: ", this.state.records);
    let individState = this.state.records[i];
    let categState = this.state.records[i].Category = Category;
    individState.Category = categState
    let trans = this.state.records[i]._id;
    let a = this;
    axios.put('/bankRecords/change', {
      data: trans,
      Category: Category
    }).then(function (response) {
      a.setState({
        records: currentState,
      })
    }).catch(function (error) {
      console.log("error: ", error);
    })
  }

  componentDidMount() {

    fetch('/bankRecords')
      .then(response => response.json())
      .then(response => this.setState({records: response}))
    }


  render() {

    return (
        this.state.records.map((records, index) => (

          <section className="row z-depth-1" key={index}>
            
             
                <div className='col s3'>{records.TransDate} {records.PostedDate} {records.Category}</div>
                <div className='col s3'>{records.Description}</div>
                <div className='col s3'>{records.Amount}</div>
                <div className='col s2'> 
                  <select class="browser-default">
                  <label>Catigorize!</label>
                  <option value="" disabled selected data-value="Entertainment" data-key={index} onClick={this.categoryChange}>Choose your Category</option>
                  <option value="1">Entertainment</option>
                  <option value="2">Transportation</option>
                  <option value="3"> Dinning out</option>
                  <option value="3">Clothing</option>
                </select>
                </div>
               
  

                <div className="waves-effect waves-light btn red col s1 " data-key={index} onClick={this.deleteTransaction}>Delete</div>
              
          </section>  ))

    );
  }
}
export default EditBankData;
