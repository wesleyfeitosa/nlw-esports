import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', {
      id,
      title,
      bannerUrl,
    });
  }

  useEffect(() => {
    async function loadGames() {
      const response = await fetch('http://192.168.0.14:3333/games');
      const data = await response.json();

      setGames(data);
    }

    loadGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre o seu duo!"
          subTitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(game) => game.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
