/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/views/layout/Layout";
import routerView from "@/views/layout/RouterView";

const trainWorkRouter = {
  path: "/trainWork",
  component: Layout,
  meta: {
    title: "trainWork",
    icon: "icon",
    noCache: true,
    // roles: [0]
  },
  children: [
    {
      path: "dailyReport",
      component: () => import("@/views/trainWork/DailyReport"),
      name: "DailyReport",
      meta: { title: "dailyReport", }
    },
    {
      path: "scoreRegister",
      component: () => import("@/views/trainWork/ScoreRegister"),
      name: "ScoreRegister",
      meta: { title: "scoreRegister",  }
    },
  ]
};

export default trainWorkRouter;
//trainRegister