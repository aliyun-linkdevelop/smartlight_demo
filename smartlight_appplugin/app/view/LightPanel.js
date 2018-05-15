import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, SwitchItem, Navbar } from '@bone/bone-mobile-ui';
import { APIGateway } from '@bone/sdk-base';

export default class LightPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { lightOn: false };
    }

    componentDidMount() {
        this.getLightStatus();
    }

    // 获取智能灯当前的属性列表
    getLightStatus(callback) {
        const path = '/thing/device/properties/query';
        const options = {
            protocol: 'https',
            gateway: 'api.link.aliyun.com',
            version: '1.1.0',
            data: {
                "productKey": this.props.ProductKey || '',
                "deviceName": this.props.DeviceName || ''
            }
        };
        APIGateway.request(path, options).then((res) => {
            let data = res.data.reduce((p, v) => {
                p[v.attribute] = v.value;
                return p;
            }, {})
            this.setState({ lightOn: data.LightPower ? true : false, lightColor: data.RGBColor });
            callback && callback();
        })
    }

    // 设置智能灯的电源开关
    setLightStatus(on) {
        const path = '/thing/device/properties/set';
        const options = {
            protocol: 'https',
            gateway: 'api.link.aliyun.com',
            version: '1.1.0',
            data: {
                "productKey": this.props.ProductKey || '',
                "deviceName": this.props.DeviceName || '',
                "properties": {
                    "LightPower": on ? 1 : 0
                }
            }
        };
        APIGateway.request(path, options).then((res) => {
        })
    }

    // 打开设置智能灯颜色设置
    enterColorPickerPage() {
        this.getLightStatus(() => {
            Bone.navigation.push('/ColorPickerPage', {
                ProductKey: this.props.ProductKey,
                DeviceName: this.props.DeviceName,
                currentColor: this.state.lightColor
            });
        });
    }

    render() {
        return <View>
            <View>
                <SwitchItem
                    style={styles.switchItem}
                    themeColor="#1fc8a2"
                    title="电源"
                    value={this.state.lightOn}
                    changed={(on) => {
                        this.setState({ lightOn: on });
                        this.setLightStatus(on);
                    }}
                />
                <Button disabled={!this.state.lightOn} onPress={() => { this.enterColorPickerPage() }} style={styles.button} text="设置灯颜色" />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    button: {
    },
    switchItem: {
        marginTop: 20,
    },
});
