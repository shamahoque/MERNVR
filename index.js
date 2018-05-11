import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  VrButton,
  asset,
  NativeModules
} from 'react-360'
import Entity from 'Entity'
const {AudioModule} = NativeModules

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
      },
      vrObjects: [],
      hide: 'none',
      collectedNum: 0,
      collectedList: []
    }
  }
  componentDidMount = () => {
    let vrObjects = this.state.game.answerObjects.concat(this.state.game.wrongObjects)
    this.setState({vrObjects: vrObjects})
    Environment.setBackgroundImage(
      {uri: this.state.game.world}
    )
  }
  setModelStyles = (vrObject, index) => {
    return {
            display: this.state.collectedList[index] ? 'none' : 'flex',
            color: vrObject.color,
            transform: [
              {translateX: vrObject.translateX},
              {translateY: vrObject.translateY},
              {translateZ: vrObject.translateZ},
              {scale: vrObject.scale},
              {rotateY: vrObject.rotateY},
              {rotateX: vrObject.rotateX},
              {rotateZ: vrObject.rotateZ}
            ]
          }
  }
  collectItem = vrObject => event => {
    let match = this.state.game.answerObjects.indexOf(vrObject);
    if (match != -1) {
      let updateCollectedList = this.state.collectedList;
      let updateCollectedNum = this.state.collectedNum + 1;
      updateCollectedList[match] = true;
      AudioModule.playOneShot({
          source: asset('collect.mp3'),
      });
      this.setState({collectedList: updateCollectedList, collectedNum: updateCollectedNum});
    } else {
      AudioModule.playOneShot({
        source: asset('clog-up.mp3'),
      });
    }
  }
  render() {
    return (
      <View>
        {this.state.vrObjects.map((vrObject, i) => {
            return (<VrButton onClick={this.collectItem(vrObject)} key={i}>
                      <Entity style={this.setModelStyles(vrObject, i)}
                        source={{
                          obj: {uri: vrObject.objUrl},
                          mtl: {uri: vrObject.mtlUrl}
                        }}
                      />
                    </VrButton>
                  )
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
    completeMessage: {
      margin: 0.1,
      height: 1.5,
      backgroundColor: 'green',
      transform: [ {translate: [0, 0, -5] } ]
    },
    congratsText: {
      fontSize: 0.5,
      textAlign: 'center',
      marginTop: 0.2
    },
    collectedText: {
      fontSize: 0.2,
      textAlign: 'center'
    },
    button: {
      margin: 0.1,
      height: 0.5,
      backgroundColor: 'blue',
      transform: [ { translate: [0, 0, -5] } ]
    },
    buttonText: {
      fontSize: 0.3,
      textAlign: 'center'
    }
})

AppRegistry.registerComponent('MERNVR', () => MERNVR);
