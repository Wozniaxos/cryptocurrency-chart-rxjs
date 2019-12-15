import React, { Component } from 'react';
import { ethereumSource, bitcoinSource } from './RX/source';
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, DiscreteColorLegend } from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

const legend = [
  { title: 'Ethereum price', color: 'blue'},
  { title: 'Bitcoin price', color: 'orange'}
]

export default class CryptoCurrencyChart extends Component {
  state = {
    ethereum: [],
    bitcoin: []
  }

  componentDidMount() {
    ethereumSource.subscribe(({ timestamp, value }) => {
      const date = new Date(timestamp).toLocaleTimeString();

      this.setState(({ ethereum }) => {
        return ethereum.length === 30 
          ? { ethereum: [...ethereum.slice(1), { x: date, y: value }] }
          : { ethereum: [...ethereum, { x: date, y: value }] };
      })
    });
    bitcoinSource.subscribe(({ timestamp, value }) => {      
      const date = new Date(timestamp).toLocaleTimeString();

      this.setState(({ bitcoin }) => {
        return bitcoin.length === 30 
          ? { bitcoin: [...bitcoin.slice(1), { x: date, y: value }] }
          : { bitcoin: [...bitcoin, { x: date, y: value }] };
      })
    });
  }

  render() {
    return (
      <div>
        <XYPlot height={500} width={1280} xType='ordinal'>
          <YAxis title='Price' />
          <XAxis title='Date' tickLabelAngle={-15}/>
          <LineSeries data={this.state.ethereum} color='blue'/>
          <LineSeries data={this.state.bitcoin} color='red'/>
          <HorizontalGridLines animation />
          <DiscreteColorLegend items={legend}/>
        </XYPlot>
      </div>
    )
  }
}