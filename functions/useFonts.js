import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      "MontserratMD": require("../assets/fonts/MontserratMD.ttf"),
      "Futura": require("../assets/fonts/futur.ttf"),
      "Gabarito": require("../assets/fonts/Gabarito.ttf"),
      "Helvetica": require('../assets/fonts/Helvetica.ttf'),
      "Coolvetica": require('../assets/fonts/coolvetica.ttf'),
      "SFPro": require('../assets/fonts/sfPro.otf'),
    });
};