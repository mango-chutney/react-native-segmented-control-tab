import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Platform
} from 'react-native'
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes';

import PropTypes from 'prop-types';

const handleTabPress = (index, multiple, selectedIndex, onTabPress) => {
    if (multiple) {
        onTabPress(index);
    }
    else if (selectedIndex !== index) {
        onTabPress(index);
    }
};


const TabOption = ({
    isTabActive, index, text,
    firstTabStyle, lastTabStyle,
    tabStyle, activeTabStyle,
    tabTextStyle, activeTabTextStyle,
    onTabPress,
}) => {
    return (
        <TouchableOpacity style={[
            styles.tabStyle,
            tabStyle,
            isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
            firstTabStyle,
            lastTabStyle]}
            onPress={() => onTabPress(index)}
            activeOpacity={1}>
            <Text style={[
                styles.tabTextStyle,
                tabTextStyle,
                isTabActive ? [styles.activeTabTextStyle, activeTabTextStyle] : {}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const SegmentedControlTab = ({
    multiple, selectedIndex, selectedIndices, values,
    borderRadius, tabsContainerStyle,
    tabStyle, activeTabStyle,
    tabTextStyle, activeTabTextStyle,
    onTabPress,
}) => {
    const makeFirstTabStyle = index => {
        return Platform.select({
            'ios': Object.assign(
                selectedIndex !== 0 ? { borderRightWidth: 1 } : {},
                index === 0 ? {
                    borderRightWidth: 0,
                    borderTopLeftRadius: borderRadius,
                    borderBottomLeftRadius: borderRadius,
                } : {}),
            'android': index === 0
                ? [{
                    borderTopLeftRadius: borderRadius,
                    borderBottomLeftRadius: borderRadius,
                }] : {},
        });
    };

    const makeLastTabStyle = index => {
        return Platform.select({
            'ios': Object.assign(
                selectedIndex !== values.length - 1
                    ? { borderLeftWidth: 1 } : {},
                index === values.length - 1
                    ? {
                        borderLeftWidth: 0,
                        borderTopRightRadius: borderRadius,
                        borderBottomRightRadius: borderRadius,
                    } : {}),
            'android': index === values.length - 1
                ? [{
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                }]
            : {},
        });
    };

    return (
        <View
            style={[styles.tabsContainerStyle, tabsContainerStyle]}
            removeClippedSubviews={false}>
            {
                values.map((item, index) => {
                    return (
                        <TabOption
                            key={index}
                            index={index}
                            isTabActive={multiple ? selectedIndices.includes(index) : selectedIndex === index}
                            text={item}
                            onTabPress={(index) => handleTabPress(index, multiple, selectedIndex, onTabPress)}
                            firstTabStyle={makeFirstTabStyle(index)}
                            lastTabStyle={makeLastTabStyle(index)}
                            tabStyle={[
                                tabStyle,
                                (index !== 0
                                 && index !== values.length - 1
                                 && Platform.OS === 'android')
                                    ? { marginHorizontal: -1 }
                                : {}
                            ]}
                            activeTabStyle={activeTabStyle}
                            tabTextStyle={tabTextStyle}
                            activeTabTextStyle={activeTabTextStyle} />
                    );
                })
            }
        </View>
    );
};

SegmentedControlTab.propTypes = {
    values: PropTypes.array,
    multiple: PropTypes.bool,
    onTabPress: PropTypes.func,
    selectedIndex: PropTypes.number,
    selectedIndices: PropTypes.arrayOf(PropTypes.number),
    tabsContainerStyle: StyleSheetPropType(ViewStylePropTypes),
    tabStyle: StyleSheetPropType(ViewStylePropTypes),
    activeTabStyle: StyleSheetPropType(ViewStylePropTypes),
    tabTextStyle: Text.propTypes.style,
    activeTabTextStyle: Text.propTypes.style,
    borderRadius: PropTypes.number
}

SegmentedControlTab.defaultProps =  {
    values: ['One', 'Two', 'Three'],
    multiple: false,
    selectedIndex: 0,
    selectedIndices: [0],
    onTabPress() { },
    tabsContainerStyle: {},
    tabStyle: {},
    activeTabStyle: {},
    textStyle: {},
    activeTextStyle: {},
    borderRadius: 5
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    tabStyle: {
        paddingVertical: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0076FF',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    activeTabStyle: {
        backgroundColor: '#0076FF'
    },
    tabTextStyle: {
        color: '#0076FF'
    },
    activeTabTextStyle: {
        color: 'white'
    }
})

export default SegmentedControlTab
