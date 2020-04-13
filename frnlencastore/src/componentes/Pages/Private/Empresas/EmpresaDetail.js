import React, {Component} from 'react';
import Page from '../../Page';
import { Redirect } from 'react-router-dom';
import {saxios} from '../../../Utilities/Utilities';

import './EmpresaDetail.css';
export default class EmpresaDetail extends Component{
  constructor(){
    super();
    this.state = {}
    this.addMoreStock = this.addMoreStock.bind(this);
  }
  //Encontrar producto
  componentDidMount()
  {
    const id = this.props.match.params.id;
    saxios.get(
      `/api/empresa/empresa/${id}`
    )
    .then((data)=>{
      this.setState(data.data);
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  //Funcion agregar stock
  addMoreStock(e){
    e.preventDefault();
    e.stopPropagation();
    const id = this.props.match.params.id;
    saxios.put(
      `/api/empresa/empresa/stock/${id}`,
      {stock: 1}
    )
      .then((data) => {
        this.setState(data.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }
  //Renderizar pantalla
  render(){
      const id = this.props.match.params.id;
      if(!(id && true)){
        return (<Redirect to="/empresa"/>)
      }
      var {usernames, useremail, userrtn} = this.state;
      return (
        <Page pageTitle={usernames} auth={this.props.auth}>
          <span className="detailitem">{usernames}</span>
          <span className="detailitem">{useremail}</span>
          <span className="detailitem">{userrtn}</span>
          <fieldset>
          <button onClick={this.addMoreStock}>Add One more Stock +</button>
          </fieldset>
        </Page>
      )
  }
}
