import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment
} from 'react-360';

export default class MERNVR extends React.Component {
  constructor() {
    super()
    this.state = {
      game: {
        name: 'Space Exploration',
        world: 'https://s3.amazonaws.com/mernbook/vrGame/milkyway.jpg',
        answerObjects: [
          {
            objUrl: 'https://s3.amazonaws.com/mernbook/vrGame/planet.obj',
            mtlUrl: 'https://s3.amazonaws.com/mernbook/vrGame/planet.mtl',
            translateX: -50,
            translateY: 0,
            translateZ: 30,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 7,
            color: 'white'
          }
        ],
        wrongObjects: [
          {
            objUrl: 'https://s3.amazonaws.com/mernbook/vrGame/tardis.obj',
            mtlUrl: 'https://s3.amazonaws.com/mernbook/vrGame/tardis.mtl',
            translateX: 0,
            translateY: 0,
            translateZ: 90,
            rotateX: 0,
            rotateY: 20,
            rotateZ: 0,
            scale: 1,
            color: 'white'
          }
        ]
      }
    }
  }
  componentDidMount = () => {
    let vrObjects = this.state.game.answerObjects.concat(this.state.game.wrongObjects)
    this.setState({vrObjects: vrObjects})
    Environment.setBackgroundImage(
      {uri: this.state.game.world}
    )
  }
  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('MERNVR', () => MERNVR);
