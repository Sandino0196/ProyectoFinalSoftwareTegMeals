import React, {Component} from 'react';
import Page from '../../Page';
import { Redirect } from 'react-router-dom';
import {saxios} from '../../../Utilities/Utilities';

import './PlatilloDetail.css';
export default class PLatilloDetail extends Component{
  constructor(){
    super();
    this.state = {}
    this.addMoreStock = this.addMoreStock.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  //Encontrar producto
  componentDidMount()
  {
    const prodId = this.props.match.params.id;
    saxios.get(
      `/api/platillos/platillos/${prodId}`
    )
    .then((data)=>{
      console.log(data);
      this.setState(data.data);
      console.log(this.state);
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
      `/api/platillos/platillos/stock/${prodId}`,
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
      var {pid,sku,desccorta, desclong, precio,categoria, empresa,estado,fecha} = this.state;
      return (
        <Page pageTitle={desccorta} auth={this.props.auth}>
          <span className="detailitem">{desccorta}</span>
          <span className="detailitem">{desclong}</span>
          <span className="detailitem">{precio}</span>
          <span className="detailitem">{empresa}</span>
          <fieldset>
          <button onClick={this.addMoreStock}>Add One more Stock +</button>
          </fieldset>
        </Page>
      )
  }
}
