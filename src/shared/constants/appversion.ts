import DeviceInfo from 'react-native-device-info';

export const getCurrentAppVersion = () => {
  const v_code = DeviceInfo.getBuildNumber();
  const v_name = DeviceInfo.getVersion();
  return {version_code: v_code, version_name: v_name};
};