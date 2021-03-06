import { AsyncStorage } from "react-native";

export const storeData = async (key, value) => {
    console.log(`saving `, key, ": ", value);

    try {
        if (typeof (value !== "string")) {
            value = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(`error saving data ${key}:${value} -> ${error}`);
        return error;
    }
};

export const fetchData = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log(`fetching `, key, ": ", value);
        return value;
    } catch (error) {
        console.log(`error fetching data ${key} -> ${error}`);
    }
};
export const clear = () => AsyncStorage.clear();

export const unstring = value => {
    if (value !== null) {
        if (value[value.length - 1] == '"' && value[0] == '"') {
            return value.slice(1, -1);
        }
        return value;
    }
};
export const seeAllValues = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
                console.log({ [store[i][0]]: store[i][1] });
                return true;
            });
        });
    });
};
