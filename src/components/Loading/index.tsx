import React from 'react';
import { ActivityIndicator } from 'react-native';
import Utils from '../../utils';

export default function Loading() {
    return (
        <ActivityIndicator size="large" animating={true} color={Utils.color.BrightTurquoise} />
    )
}