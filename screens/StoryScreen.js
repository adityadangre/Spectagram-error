import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Speech from "expo-speech"
import firebase from "firebase";

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      light_theme: false
    };
  }
    async initiateTTS (title, author) {
        const current_color = this.state.speakerColor;
        this.setState({speakerColor: current_color === 'gray' ? '#EE8249' : 'gray'});
        if(current_color === 'gray'){
            Speech.speak(`${title} by ${author}`)
            Speech.stop();
        } else {
            Speech.stop();
        }
    }

    componentDidMount() {
      this.fetchUser();
    }
  
      fetchUser = () => {
        let theme;
        firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", (snapshot) => {
        theme = snapshot.val().current_theme
        this.setState({ light_theme: theme === "light" })
        })
        }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
      return (
        <View style={this.state.light_theme ?
          styles.container : styles.containerLight}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ?
styles.appTitleText : styles.appTitleTextLight}>SPECTAGRAM</Text>
            </View>
          </View>
          <View style={this.state.light_theme ? styles.storyContainer : styles.storyContainerLight}>
            <ScrollView style={this.state.light_theme ? styles.storyCard : styles.storyCardLight}>
              <Image
                source={require("../assets/image_1.jpg")}
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>

              <View style={styles.titleTextContainer}>
                  <Text style={this.state.light_theme ? styles.storyTitleText : styles.storyTextLight}>
                    {this.props.route.params.story.title}
                  </Text>
                  <Text style={this.state.light_theme ? styles.storyAuthorText : styles.storyAuthorTextLight}>
                    {this.props.route.params.story.author}
                  </Text>
                  <View style={styles.titleTextContainer}>
                  <Text style={this.state.light_theme ? styles.storyAuthorText : styles.storyAuthorTextLight}>
                    {this.props.route.params.story.created_on}
                  </Text>
                </View>
                </View>

                <View style={styles.iconContainer}>
                <TouchableOpacity 
                    onPress={() => this.initiateTTS(
                        this.props.route.params.story.title,
                        this.props.route.params.story.author,
                    )}
                    >
                  <Ionicons
                    name={this.state.speakerIcon}
                    size={RFValue(30)}
                    color={this.state.speakerColor}
                    style={{ margin: RFValue(15) }}
                  />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>12k</Text>
                </View>
              </View>
              
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(13),
      backgroundColor: "#15193c",
      borderRadius: RFValue(20),
      shadowColor: 'rgb(0,0,0)',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 2 
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontSize: RFValue(25),
    color: "white"
  },
  storyTitleTextLight: {
    fontSize: RFValue(25),
    color: "Black"
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    color: "white"
  },
  storyAuthorTextLight: {
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontSize: RFValue(15),
    color: "white"
  },
  moralText: {
    fontSize: RFValue(20),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});