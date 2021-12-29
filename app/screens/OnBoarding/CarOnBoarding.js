import React from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
// constants
import { images, theme } from "../../constants";


// theme
const { COLORS, FONTS, SIZES } = theme;
const onBoardings = [
    {
        title: "FIND YOUR DESTINATION",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: images.onboarding4
    },
    {
        title: "LOCATE \n YOUR ROUTE !",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: images.onboarding5
    },
    {
        title: "ENJOY \n YOUR TAXI",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: images.onboarding6
    }
];


const CarOnBoarding = () => {
    const [completed, setCompleted] = React.useState(false);
    const [Value, setValue] = React.useState(false);


    const scrollX = new Animated.Value(0);


    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) >= 1) {
                setCompleted(true);
                console.log("true");
            }
            else {
                setCompleted(false);
            }
            console.log(Math.floor(value / SIZES.width));
            //ToastAndroid.show(Math.floor(value / SIZES.width), ToastAndroid.SHORT);
        });

        return () => {
            console.log("Listener Removed");
            scrollX.removeListener()
        };
    }, []);

    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
            >
                {onBoardings.map((item, index) => (
                    <View key={index}
                        style={{ width: SIZES.width }} >
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center', backgroundColor: "#fbcc30", height: "60%"
                            }}
                        >
                            {console.log(item.img + "img")}
                            {item.img === images.onboarding4 ?
                                <Image source={item.img} resizeMode='contain'
                                    style={{ width: "100%", height: "100%", top: "10.5%" }} />
                                : <Image source={item.img} resizeMode='contain'
                                    style={{ width: "80%", height: "80%", }} />}

                        </View>
                        <View style={{

                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingTop: "10%",
                            padding: "20%"
                        }}>

                            <Text style={{ ...FONTS.h1, color: COLORS.gray, textAlign: 'center' }}>{item.title}</Text>
                            <Text
                                style={{
                                    ...FONTS.body3, textAlign: 'center', marginTop: SIZES.base,
                                    color: COLORS.gray
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                        {/* Button */}
                        {completed ?
                            <View style={{ height: "100%", width: "100%" }}>
                                <TouchableOpacity

                                    style={{
                                        //opacity: completed ? 0.5 : 0,
                                        // display: completed ? 'flex' : 'none',
                                        //position: 'absolute',
                                        //right: "30%",
                                        bottom: "5.5%",
                                        left: "30%",
                                        width: "40%",
                                        height: "4.5%",
                                        justifyContent: 'center',
                                        borderRadius: 15,
                                        backgroundColor: "#ff8266"
                                    }}
                                    onPress={() => { console.log("Button on pressed") }}
                                >
                                    <Text style={{ ...FONTS.h4, color: COLORS.white, textAlign: 'center', }}>{"Signup with Email"}</Text>
                                </TouchableOpacity>

                            </View>
                            : <View>
                                <Text style={{ bottom: "100%", alignItems: 'center', justifyContent: "center", textAlign: 'center', fontSize: 20 }}>Existing user? Login Now</Text>

                            </View>}

                    </View>
                ))}
            </Animated.ScrollView>)
    }
    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={styles.dotsContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base * 3],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: "50%", height: dotSize }]}
                        />
                    );
                })}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View>
                {renderDots()}
            </View>
        </SafeAreaView>
    )
}
export default CarOnBoarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    imageAndTextContainer: {
        width: SIZES.width
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '20%' : '16%',

    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding / 2,
        marginBottom: SIZES.padding * 3,
        height: SIZES.padding,
        width: 100
    },
    dot: {
        borderRadius: 5,
        backgroundColor: "#ff8266",
        marginHorizontal: SIZES.radius / 2,

    }
    ,
    vis: {
        display: 'flex'
    }
    ,
    notvis: {
        display: 'none'
    }
});