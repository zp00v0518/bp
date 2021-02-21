import {
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDrawer
} from 'element-plus';

import atoms from './atoms';

const components = [
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDrawer
];

Object.keys(atoms).forEach((key) => {
  const item = atoms[key];
  item.name = key;
  item.componentName = key;
  components.push(item);
});
export default components;
