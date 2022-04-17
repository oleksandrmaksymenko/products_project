import {componentsType} from 'src/components/Popup/componentsType';

export const popupData = <T>(props: T) => {
  return {
    componentType: componentsType(props),
  };
};
