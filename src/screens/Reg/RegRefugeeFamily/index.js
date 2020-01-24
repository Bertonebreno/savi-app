import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    BackHandler
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "react-native-paper";
import { fetchData, seeAllValues, unstring } from "../../../storage";
import MemberList from "../../../components/MembersList";
import { getMembersFromFamily } from "../../../services/backendIntegrations";

export default function RegRefugeeFamily({ navigation }) {
    const [members, setMembers] = useState([]);
    const registrateDependent = () => {
        navigation.navigate("RegistrationRefugee");
    };
    const handleBackButton = async () => {
        console.log("handling back button");
        let lastScreen = await fetchData("lastScreen");
        lastScreen = unstring(lastScreen);
        navigation.navigate(lastScreen);
    };
    const getAndSetMembers = async () => {
        let members = await getMembersFromFamily();

        console.log(`members :${members}`);

        setMembers(members);
    };
    useEffect(() => {
        seeAllValues();
        console.log("RegRefugeeFamily: useEffect");
        getAndSetMembers();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    }, []);

    return (
        <View
            style={{ backgroundColor: "#FFF" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                flexDirection: "column"
            }}
        >
            <View
                style={{
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    height: hp("25%")
                }}
            >
                <Image
                    resizeMethod="auto"
                    source={require("../../../assets/images/savi.png")}
                    resizeMode="contain"
                    style={style.LogoSavi}
                />
                <Text style={style.RegFamilyTitle}>Registrar Família</Text>
            </View>
            <View style={{ alignSelf: "center", height: hp("65%") }}>
                <MemberList members={members}></MemberList>

                <Button
                    mode="outlined"
                    style={style.addMember}
                    onPress={() => {
                        registrateDependent();
                    }}
                >
                    Adicionar membro da Família
                </Button>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Button
                    mode="text"
                    icon="chevron-left"
                    style={{
                        //height: hp('6%'),
                        width: wp("28%"),
                        marginLeft: wp("5%"),
                        marginBottom: hp("2%"),
                        alignSelf: "flex-end"
                    }}
                    onPress={() => {
                        navigation.navigate("MapScreen");
                    }}
                >
                    <Text
                        onPress={async () => {
                            const lastScreen = await fetchData("lastScreen");
                            if (typeof lastScreen == "string") {
                                navigation.navigate(lastScreen);
                            }
                        }}
                        style={{ color: "#707070", fontSize: 12 }}
                    >
                        Voltar
                    </Text>
                </Button>
                <Button
                    mode="contained"
                    style={{
                        //height: hp('6%'),
                        width: wp("28%"),
                        marginRight: wp("5%"),
                        marginBottom: hp("2%"),
                        alignSelf: "flex-end"
                    }}
                    onPress={() => navigation.navigate("MapScreen")}
                >
                    <Text style={{ color: "#ffffff", fontSize: 12 }}>
                        Finalizar
                    </Text>
                </Button>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    LogoSavi: {
        width: wp("50%"),
        height: hp("8%"),
        marginTop: hp("5%"),
        alignSelf: "center"
    },
    RegFamilyTitle: {
        fontSize: RFPercentage(4),
        //marginLeft: wp("5%"),
        marginTop: hp("2%"),
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000",
        marginBottom: hp("1%")
    },
    member: {
        fontSize: RFPercentage(3),
        //marginLeft: wp("5%"),
        marginTop: hp("2%"),
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000",
        marginBottom: hp("1%")
    },
    addMember: {
        width: wp("95%")
    }
});
