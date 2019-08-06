import React, {Component} from 'react';

/**
 * Created by Doa on 5-8-2019.
 */
const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null
        };

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                })
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    };
};

export default asyncComponent;