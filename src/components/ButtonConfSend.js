import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ButtonConfSend extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={styles.caption}>Continuar</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF6400",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 5
    },
    caption: {
        color: "#fff",
        fontSize: 20
    }
});
