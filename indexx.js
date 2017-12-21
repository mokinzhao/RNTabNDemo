import { AppRegistry } from 'react-native'
import Basic from './src/component/Basic/'
// import Dynamic from './components/Dynamic/'
 import LoadMinimal from './src/component/LoadMinimal/'
 import Phone from './src/component/Phone/'
// import PhotoView from './src/component/PhotoView/' // not working
 import Swiper from './src/component/Swiper/'  // working but no title displayed
 import SwiperNumber from './src/component/SwiperNumber/' // working but no title displayed
AppRegistry.registerComponent('CloudCarHome', () => LoadMinimal);
