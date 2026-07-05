import { useNavigation } from '@react-navigation/native';

export function useProfileLogic() {
  const navigation = useNavigation<any>();

  const handleNavigateToProfile = () => {
    navigation.navigate('Home');
  };

  return {
    handleNavigateToProfile,
  };
}