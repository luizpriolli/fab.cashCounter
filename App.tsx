import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Sound from 'react-native-sound';

const TokenCounter = ({ tokenType, tokenCount, setTokenCount, tokenImage, tokenSound }) => {
  // Carrega o arquivo de som
  let sound = new Sound(tokenSound, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
    // Agora o som está carregado e pronto para ser reproduzido
  });

  return (
    <View style={styles.tokenCounter}>
      <TouchableOpacity style={styles.buttonM} onPress={() => setTokenCount(Math.max(0, tokenCount - 1))}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.tokenImageWrapper}>
        <ImageBackground source={tokenImage} style={styles.tokenImage} resizeMode="contain">
          <Text style={styles.tokenText}>{tokenCount}</Text>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.buttonP} onPress={() => {
        setTokenCount(tokenCount + 1);
        sound.play((success) => {
          if (!success) {
            console.log('Sound did not play');
          }
        });
      }}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const TokensScreen = () => {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [copper, setCopper] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAB - Cash Counter</Text>
      <View style={styles.tokenContainer}>
        <TokenCounter 
          tokenType="Gold" 
          tokenCount={gold} 
          setTokenCount={setGold} 
          tokenImage={require('./assets/images/gold-token.jpg')}
          tokenSound={require('./assets/sounds/gold-sound.mp3')}
        />
        <TokenCounter 
          tokenType="Silver" 
          tokenCount={silver} 
          setTokenCount={setSilver} 
          tokenImage={require('./assets/images/silver-token.jpg')}
          tokenSound={require('./assets/sounds/silver-sound.mp3')}
        />
        <TokenCounter 
          tokenType="Copper" 
          tokenCount={copper} 
          setTokenCount={setCopper} 
          tokenImage={require('./assets/images/copper-token.jpg')}
          tokenSound={require('./assets/sounds/copper-sound.mp3')}
        />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <TokensScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2A33',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  tokenCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10,

  },
  tokenImageWrapper: {
    width: '100%', // Tamanho da área da imagem de fundo
    aspectRatio: 1, // Mantém a proporção da imagem
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  
  },
  tokenImage: {
    width: '100%',
    height: '100%',
  },
  tokenText: {
    color: 'red',
    fontSize: 38,
    fontWeight: 'bold',
    position: 'absolute',
    left: '45%',
    top: "45%",
  },
  buttonP: {
    backgroundColor: 'transparent', 
    padding: 25,
    position: 'absolute',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    right: '5%',
    zIndex:2,
    height: '70%',
    verticalAlign: "middle"
  },
  buttonM: {
    backgroundColor: 'transparent', 
    padding: 25,
    position: 'absolute',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    left: '5%',
    zIndex:2,
    height: '70%'
  },
  buttonText: {
    color: 'white',
    fontSize: 26,
  },
});

export default App;
