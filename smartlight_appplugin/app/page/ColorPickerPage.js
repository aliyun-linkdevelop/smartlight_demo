import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ColorPicker, Navbar } from '@bone/bone-mobile-ui';
import { clearTimeout } from 'timers';

const { toHSV, fromHSV } = ColorPicker;

function fromRGB(rgb) {
    return { r: rgb.R, g: rgb.G, b: rgb.B };
}

export default class ColorPickerPage extends Bone.Page {
    state = {
        color: toHSV(fromRGB(Bone.navigation.state.currentColor)),
        oldColor: toHSV(fromRGB(Bone.navigation.state.currentColor)),
    };

    setLightColor(color) {
        if (this.lightTimer) {
            window.clearTimeout(this.lightTimer);
            this.lightTimer = null;
        }
        this.lightTimer = window.setTimeout(() => {
            let rgb = fromHSV(color).rgb;
            console.log('set light color', rgb);
            const path = '/thing/device/properties/set';
            const options = {
                protocol: 'https',
                gateway: 'api.link.aliyun.com',
                version: '1.1.0',
                data: {
                    "productKey": Bone.navigation.state.ProductKey || '',
                    "deviceName": Bone.navigation.state.DeviceName || '',
                    "properties": {
                        "RGBColor": { R: rgb.r, G: rgb.g, B: rgb.b }
                    }
                }
            };
            APIGateway.request(path, options).then((res) => {
            })
            this.setState({ oldColor: color });
        }, 100);
    }

    onBackButtonPress() {
        Bone.navigation.pop();
    }

    render() {
        const { color, oldColor } = this.state;
        return (<View style={styles.body}>
            <Navbar
                titleContent='设置灯的颜色'
                leftButtonContent='返回'
                onLeftButtonPress={this.onBackButtonPress}
            />
            <View style={styles.body}>
                <ColorPicker
                    oldColor={oldColor}
                    color={color}
                    onColorChange={(color) => {
                        this.setState({ color });
                        this.setLightColor(color);
                    }}
                    onColorSelected={(color) => {
                    }}
                    onOldColorSelected={color => console.log(fromHSV(color))}
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#efeef1',
    },
});
