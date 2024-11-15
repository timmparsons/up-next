import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';

const imageStyle = { width: 25, height: 25 };
export const providers = {
  Netflix: {
    logo: <Fontisto name="netflix" size={18} color="black" />,
  },
  'HBO Max': {
    logo: (
      <Image
        style={imageStyle}
        source={{ uri: 'https://img.icons8.com/ios/50/1A1A1A/hbo-max.png' }}
      />
    ),
  },
  'Amazon Prime': {
    logo: (
      <Image
        style={imageStyle}
        source={{ uri: 'https://img.icons8.com/ios/50/1A1A1A/amazon-prime-video.png' }}
      />
    ),
  },
  Amazon: {
    logo: (
      <Image
        style={imageStyle}
        source={{ uri: 'https://img.icons8.com/ios/50/1A1A1A/amazon-prime-video.png' }}
      />
    ),
  },
  'Amazon Prime Video': {
    logo: (
      <Image
        style={imageStyle}
        source={{ uri: 'https://img.icons8.com/ios/50/1A1A1A/amazon-prime-video.png' }}
      />
    ),
  },
  Hulu: { logo: <MaterialCommunityIcons name="hulu" size={20} color="black" /> },
  'Disney+': {
    logo: (
      <Image
        style={imageStyle}
        source={{ uri: 'https://img.icons8.com/ios/50/1A1A1A/disney-plus.png' }}
      />
    ),
  },
  'Apple TV+': {
    logo: (
      <Image
        style={imageStyle}
        source={{ uri: 'https://img.icons8.com/ios/50/1A1A1A/apple-tv.png' }}
      />
    ),
  },
};