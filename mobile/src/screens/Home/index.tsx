import { Image, View, FlatList } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Heading
        title="Encontre o seu duo!"
        subTitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        contentContainerStyle={styles.contentList}
        data={GAMES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(game) => game.id}
        renderItem={({ item }) => <GameCard data={item} />}
      />
    </View>
  );
}
