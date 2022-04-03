import data from './data.json';
import React, { Component } from 'react';
import Opciones from './Opciones.js';
import SeleccionAnterior from './SeleccionAnterior';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historial: [],
            contador: 0,
            seleccionPrevia: '',
        };
    }

    componentDidUpdate(prevState) {
        if (prevState.contador !== this.state.contador) {
            this.state.historial.push(this.state.seleccionPrevia);
        }
    }

    handleClick = (e) => {
        const id = e.target.id;
        if (this.state.contador >= 7) {
            alert('Fin de la historia.');
        } else if (id === 'A' && this.state.seleccionPrevia !== 'A') {
            this.setState({
                contador: this.state.contador + 1,
                seleccionPrevia: 'A',
            });
        } else if (id === 'A' && this.state.seleccionPrevia === 'A') {
            this.setState({
                contador: this.state.contador + 2,
            });
        } else if (id === 'B' && this.state.seleccionPrevia === 'A') {
            this.setState({
                contador: this.state.contador + 3,
                seleccionPrevia: 'B',
            });
        } else if (id === 'B') {
            this.setState({
                contador: this.state.contador + 2,
                seleccionPrevia: 'B',
            });
        }
    };

    render() {
        return (
            <div className="disenio">
                <h1 className="historia">{data[this.state.contador].historia}</h1>
                <Opciones
                    handleClick={this.handleClick}
                    opcionA={data[this.state.contador].opciones.a}
                    opcionB={data[this.state.contador].opciones.b}
                />
                <SeleccionAnterior
                    seleccionPrevia={this.state.seleccionPrevia}
                    historial={this.state.historial.map(
                        (e, index) => (
                            <li key={index}>{e}</li>
                        ),
                        data[this.state.contador].id
                    )}
                />
            </div>
        );
    }
}

export default Main;
