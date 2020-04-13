import React, {Component} from 'react';
import Page from '../../Page';
import { Redirect } from 'react-router-dom';
import {saxios} from '../../../Utilities/Utilities';

import './PLatilloDetail.css';
export default class PLatilloDetail extends Component{
  constructor(){
    super();
    this.state = {}
    this.addMoreStock = this.addMoreStock.bind(this);
  }
  //Encontrar producto
  componentDidMount()
  {
    const prodId = this.props.match.params.id;
    saxios.get(
      `/api/platillos/platillos/${id}`
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
    const prodId = this.props.match.params.id;
    saxios.put(
      `/api/platillos/platillos/stock/${id}`,
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
        return (<Redirect to="/platillos"/>)
      }
      var {desccorta, precio, categoria, empresa} = this.state;
      return (
        <Page pageTitle={desccorta} auth={this.props.auth}>
          <span className="detailitem">{desccorta}</span>
          <span className="detailitem">{precio}</span>
          <span className="detailitem">{categoria}</span>
          <span className="detailitem">{empresa}</span>
          <fieldset>
          <button onClick={this.addMoreStock}>Add One more Stock +</button>
          </fieldset>
        </Page>
      )
  }
}
