import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class StoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    light_theme: false
    };
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
        return (
          <TouchableOpacity style={styles.container} onPress={() => {
            this.props.navigation.navigate('StoryScreen', {story: this.props.story})
          }}>
          <SafeAreaView style={styles.droidSafeArea} />

            <View style={this.state.light_theme ? styles.cardContainer : styles.cardContainerLight}>
                    <View style={styles.authorContainer}>
                            <View style={styles.storyImage}>
                            <Image
                source={require("../assets/post.jpeg")}
                style={styles.storyImage}
              ></Image>
                            </View>
                            <Text style={this.state.light_theme ? styles.storyTitleText : styles.storyTitleTextLight}>
                  {this.props.story.title}
                </Text>
                <Text style={this.state.light_theme ? styles.storyAuthorText : styles.storyAuthorTextLight}>
                  {this.props.story.author}
                </Text>
                <Text style={this.state.light_theme ? styles.descriptionText : styles.descriptionTextLight}>
                  {this.props.story.description}
                </Text>
                            <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <Text style={styles.likeText}>12k</Text>
                </View>
              </View>
                        </View>
                    </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    cardContainer: {
      margin: RFValue(13),
      backgroundColor: "#2f345d",
      borderRadius: RFValue(20)
    },
    cardContainerLight: {
      margin: RFValue(13),
      backgroundColor: "white",
      borderRadius: RFValue(20),
      shadowColor: 'rgb(0,0,0)',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 2
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    storyImage: {
      resizeMode: "contain",
      width: "95%",
      alignSelf: "center",
      height: RFValue(250)
    },
    titleContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center"
    },
    storyTitleText: {
      fontSize: RFValue(25),
      color: "white"
    },
    storyTitleTextLight: {
      fontSize: RFValue(25),
      color: "black"
    },
    storyAuthorText: {
      fontSize: RFValue(18),
      color: "white"
    },
    storyAuthorTextLight: {
      fontSize: RFValue(18),
      color: "black"
    },
    descriptionText: {
      fontSize: 13,
      color: "white",
      paddingTop: RFValue(10)
    },
    descriptionTextLight: {
      fontSize: 13,
      color: "black",
      paddingTop: RFValue(10)
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: RFValue(10)
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#eb3948",
      borderRadius: RFValue(30)
    },
    likeText: {
      color: "white",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    }
  });