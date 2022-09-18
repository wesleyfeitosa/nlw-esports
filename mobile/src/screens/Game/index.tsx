import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCarProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

export function Game() {
  const [duos, setDuos] = useState<DuoCarProps[]>([]);
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function loadGames() {
      const response = await fetch(
        `http://192.168.0.14:3333/games/${game.id}/ads`
      );
      const data = await response.json();

      setDuos(data);
    }

    loadGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} resizeMode="cover" />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} />

        <Heading title={game.title} subTitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
