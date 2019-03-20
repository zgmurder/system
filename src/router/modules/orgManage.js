/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/views/layout/Layout";
import routerView from "@/views/layout/RouterView";

const orgManageRouter = {
  path: "/orgManage",
  component: Layout,
  meta: {
    title: "orgManage",
    icon: "icon",
    noCache: true,
    // roles: [0]
  },
  children: [
    {
      path: "organization",
      component: () => import("@/views/orgManage/Organization"),
      name: "Organization",
      meta: { title: "organization", }
    },
    {
      path: "soldier",
      component: () => import("@/views/orgManage/Soldier"),
      name: "Soldier",
      meta: { title: "soldier",  }
    },
  ]
};

export default orgManageRouter;
