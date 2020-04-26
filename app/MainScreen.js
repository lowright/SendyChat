import React, {Component} from 'react';

import Navigation from './route/routerChat'
import { LoaderScreen } from 'react-native-ui-lib';

class MainScreen extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { isLoading: true }
  }
  
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  render(){
    if (this.state.isLoading) {
      return <LoaderScreen />;
    } else {
      return <Navigation/>
    }
  }

}

export default MainScreen
