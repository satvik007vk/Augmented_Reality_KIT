import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import CameraScreen from './CameraScreen';

function HomeScreen({ navigation }) {
  const [detectedId, setDetectedId] = useState(null);
  const [matchedItem, setMatchedItem] = useState(null);

  useEffect(() => {
    if (detectedId !== null) {
        const result = matchId(detectedId);
        if (result) {
            setMatchedItem(result); // Store the matched item instead of navigating
        }
    }
}, [detectedId]);

  return (
      <View style={styles.screenContainer}>
          <Text style={styles.title}>Welcome to Jordan Hall Guide</Text>
          <Text style={styles.title}>Were you wondering who are those people on the wall? You are on the right place!</Text>
          <CameraScreen onIdDetected={setDetectedId} />

          {/* Show detected name only if an item is matched */}
          {matchedItem && (
            <Text style={styles.detectedName} onPress={() => navigation.navigate('JordanHallScreen', matchedItem)}>
                click here for more of {matchedItem.name}
            </Text>
          )}
      </View>
  );
} 

// Fruit Screen
function JordanHallScreen({ route }) {
    return (
        <View style={styles.screenContainer}>
            <Image source={route.params.image} style={styles.fruitImage} />
            <Text style={styles.descriptionText}>{route.params.text}</Text>
        </View>
    );
}

// Custom Drawer Content with Fruit Images
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} style={styles.drawerContainer}>
            <Text style={styles.menuTitle}>Jordan Hall Guide</Text>
            <DrawerItem label="🏠 Home" onPress={() => props.navigation.navigate('Home')} />
            {content.map((item) => (
                <DrawerItem
                    key={item.id}
                    label={() => (
                        <View style={styles.menuItem}>
                            <Image source={item.image} style={styles.menuImage} />
                            <Text style={styles.menuText}>{item.name}</Text>
                        </View>
                    )}
                    onPress={() => props.navigation.navigate('JordanHallScreen', { image: item.image, text: item.text })}
                />
            ))}
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="JordanHallScreen" component={JordanHallScreen} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}




// funcs and data
const styles = StyleSheet.create({
  screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
  },
  input: {
      width: 200,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      textAlign: 'center',
  },
  fruitImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 20,
  },
  descriptionText: {
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 20,
  },
  detectedName: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "black"
},
  drawerContainer: {
      backgroundColor: '#fff',
  },
  menuTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      padding: 20,
      textAlign: 'center',
      color: '#f4511e',
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
  },
  menuImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 15,
  },
  menuText: {
      fontSize: 16,
      color: '#333',
  },
});
function matchId(id) {
  return content.find(item => item.id === id) || null;
}

const content = [
  {
    "id": 0,
    "name": "Johann Gottfried Tulla",
    "text": "Johann Gottfried Tulla (1770–1828) was a German hydraulic engineer best known for his project to straighten the Upper Rhine River. His work aimed to reduce flooding, improve navigation, and reclaim land for agriculture. The project significantly altered the river's course, decreasing its meandering paths and increasing flow speed, which had both positive and unintended ecological consequences. His contributions laid the groundwork for modern river engineering in Europe, influencing flood management and waterway navigation strategies for centuries to come.",
    "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSsrl8Hbt9dcQ8WjYtJqAtTzOAxzrcWklh4_554mgDvxfX5I-TSmvofKZbeScv2WxqRkje03YiE9QS3_4yfaKuqHQ"
  },
  {
    "id": 1,
    "name": "Wilhelm Jordan",
    "text": "Wilhelm Jordan (1842–1899) was a German mathematician and geodesist who made significant contributions to geodetic science, particularly in the adjustment of triangulation networks. He is best known for the Gauss–Jordan elimination method, a widely used algorithm in linear algebra for solving systems of equations. His work provided crucial advancements in surveying techniques, which played a pivotal role in cartography and geospatial analysis, forming the foundation of many modern geodetic computations.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/28/Jordan-wilhelm-geodaet-in-trommsdorff-paul-der-lehrkoerper-der-TH-hannover-1831-1931-hannover-1931-s067.jpg"
  },
  {
    "id": 2,
    "name": "Johannes van Mierlo",
    "text": "Johannes van Mierlo was a geodesist known for his research contributions at the Geodetic Institute at the Karlsruhe Institute of Technology. His work focused on improving measurement accuracy in geodesy and advancing techniques in surveying and cartography. Though details about his life remain scarce, his impact on geodetic science and education was significant in shaping methodologies used in modern geospatial studies.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdH7qqk9oCVcnFA4Ym8dvh_gI-LmyNaeKKNQ&s"
  },
  {
    "id": 3,
    "name": "Günter Schmitt",
    "text": "Günter Schmitt is a German engineer and businessman, serving as the managing partner of Schmitt Gruppe, a company specializing in logistics and transportation services. His expertise in business operations, supply chain logistics, and transportation infrastructure has played a key role in expanding and modernizing logistical solutions for global trade and commerce. Under his leadership, the company has grown to be a major player in the industry, optimizing transportation efficiency through innovative technologies and strategic partnerships.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVTHwrVlT_tRlIp1KbCbjQjQL6JMZMjR6YQ&s"
  },
  {
    "id": 4,
    "name": "Matthias Haid",
    "text": "Matthias Haid was a German geodesist active in the 19th century. He contributed significantly to geodetic measurements, particularly in the standardization of surveying techniques and mapping methodologies. His work played an essential role in advancing geospatial accuracy and was instrumental in laying the foundation for modern geodesy.",
    "image": require("./pics/matthias_haid.png")
  },
  {
    "id": 5,
    "name": "Bernhard Heck",
    "text": "Bernhard Heck is a German geodesist and professor known for his pioneering work in satellite geodesy and geodetic networks. His research has advanced precision in Earth observation and navigation systems, contributing significantly to the fields of geodetic deformation analysis and geodynamic research.",
    "image": "https://www.gik.kit.edu/img/heck.jpg"
  },
  {
    "id": 6,
    "name": "Heinrich Lichte",
    "text": "Heinrich Lichte was a German geodesist known for his substantial contributions to geodetic science. His research focused on the refinement of geodetic measurements and survey methodologies, which played a crucial role in modern mapping and land surveying efforts.",
    "image": require("./pics/heinrich_lichte.png")
  },
  {
    "id": 7,
    "name": "Heinz Draheim",
    "text": "Heinz Draheim was a German geodesist who made significant contributions to geodetic research and education. His work in theoretical and applied geodesy improved measurement accuracy, particularly in surveying and satellite geodesy.",
    "image": "https://iiif.deutsche-digitale-bibliothek.de/image/2/3da2509c-5f43-4e07-8743-51140d4007be/full/!306,450/0/default.jpg"
  },
  {
    "id": 8,
    "name": "Eugen Kuntz",
    "text": "Eugen Kuntz was a German cartographer and geodesist, best known for his work 'Kartennetzentwurfslehre: Grundlagen und Anwendungen,' which contributed significantly to cartographic projection techniques and geodetic science.",
    "image": require('./pics/eugen_kuntz.png')
  },
  {
    "id": 9,
    "name": "Hermann Maelzer",
    "text": "Hermann Maelzer was a German geodesist recognized for his contributions to geodetic science, particularly in the areas of triangulation and Earth measurement techniques.",
    "image": "https://www.iag-aig.org/img/5ced52efdce8d.png"
  },
  {
    "id": 10,
    "name": "Hans-Georg Wenzel",
    "text": "Hans-Georg Wenzel was a German geodesist known for his extensive work in precise geoid determination and satellite geodesy. His research played a key role in improving global positioning systems and understanding Earth's gravitational field, significantly influencing modern geospatial science.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Hans-Georg_Wenzel.jpg/220px-Hans-Georg_Wenzel.jpg"
  },
  {
    "id": 11,
    "name": "Martin Näbauer",
    "text": "Martin Näbauer was a German geodesist whose work focused on high-precision geodetic measurements and reference frame development. His contributions helped establish modern coordinate systems used in global positioning and cartography.",
    "image": "https://www.asg.ed.tum.de/fileadmin/_processed_/f/f/csm_naebauer_0918606a98.webp"
  },
  {
    "id": 12,
    "name": "Adolf Schlötzer",
    "text": "Adolf Schlötzer was a German geodesist who served at the Geodetic Institute of the Karlsruhe Institute of Technology from 1926 to 1952. His work focused on geodetic network adjustments and improving measurement accuracy, which greatly impacted the field of geospatial science.",
    "image": require('./pics/adolf_schloetzer.png')
  },
  {
    "id": 13,
    "name": "Heinrich Merkel",
    "text": "Heinrich Merkel was a German geodesist affiliated with the Geodetic Institute at the Karlsruhe Institute of Technology from 1938 to 1960. His research contributed to advancements in geodetic surveying techniques and played a critical role in the development of accurate land measurement practices.",
    "image": require("./pics/heinrich_merkel.png")
  }
];
