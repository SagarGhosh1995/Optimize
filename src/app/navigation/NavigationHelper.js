import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}


export function reset(...args) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'home' },
                ],
            })
        );
    }
}