import Vue from "vue";
import { Button, Tree, Input, Container, Aside, Header, Main, Loading, Avatar, Row, Col } from "element-ui";

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(Row);
import 'element-ui/lib/theme-chalk/row.css';
Vue.use(Col);
import 'element-ui/lib/theme-chalk/col.css';

Vue.use(Button);
import 'element-ui/lib/theme-chalk/button.css';
Vue.use(Tree);
import 'element-ui/lib/theme-chalk/tree.css';
Vue.use(Input);
import 'element-ui/lib/theme-chalk/input.css';
Vue.use(Container);
import "element-ui/lib/theme-chalk/container.css";
Vue.use(Aside);
import 'element-ui/lib/theme-chalk/aside.css';
Vue.use(Header);
import 'element-ui/lib/theme-chalk/header.css';
Vue.use(Main);
import 'element-ui/lib/theme-chalk/main.css';
Vue.use(Loading);
import 'element-ui/lib/theme-chalk/loading.css';
Vue.use(Avatar);
import 'element-ui/lib/theme-chalk/avatar.css';
// import "element-ui/lib/theme-chalk/index.css"
import "element-ui/lib/theme-chalk/base.css"
import 'element-ui/lib/theme-chalk/display.css';