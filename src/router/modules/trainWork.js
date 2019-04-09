/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'
import routerView from '@/views/layout/RouterView'

const trainWorkRouter = {
  path: '/trainWork',
  component: Layout,
  name: 'TrainWork',
  redirect: '/trainWork/dailyReport',
  meta: {
    title: 'trainWork',
    icon: 'icon'
    // roles: [0]
  },
  children: [
    {
      path: 'dailyReport',
      component: () => import('@/views/trainWork/DailyReport'),
      name: 'DailyReport',
      meta: { title: 'dailyReport' }
    },
    {
      path: 'monthlyReportL1',
      component: () => import('@/views/trainWork/MonthlyReportL1'),
      name: 'MonthlyReportL1',
      meta: { title: 'monthlyReportL1' }
    },
    {
      path: 'assessment',
      component: () => import('@/views/trainWork/Assessment'),
      name: 'Assessment',
      meta: { title: 'assessment' }
    },
    {
      path: 'scoreRegister',
      component: () => import('@/views/trainWork/ScoreRegister'),
      name: 'ScoreRegister',
      meta: { title: 'scoreRegister' }
    },
    {
      path: 'scoreStatistics',
      component: routerView,
      name: 'ScoreStatistics',
      meta: { title: 'scoreStatistics' },
      redirect: '/trainWork/scoreStatistics/trainStatistics',
      children: [
        {
          path: 'trainStatistics',
          component: () => import('@/views/trainWork/scoreStatistics/TrainStatistics'),
          name: 'TrainStatistics',
          meta: { title: 'trainStatistics' }
        },
        {
          path: 'sportStatistics',
          component: () => import('@/views/trainWork/scoreStatistics/SportStatistics'),
          name: 'SportStatistics',
          meta: { title: 'sportStatistics' }
        }
      ]
    }
  ]
}

export default trainWorkRouter
// trainRegister
