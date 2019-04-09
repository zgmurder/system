/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'
import routerView from '@/views/layout/RouterView'

const trainOutlineRouter = {
  path: '/trainOutline',
  component: Layout,
  meta: {
    title: 'trainOutline',
    icon: 'icon',
    noCache: true,
    roles: [0]
  },
  children: [
    {
      path: 'trainStandard',
      component: () => import('@/views/trainOutline/TrainStandard'),
      name: 'TrainStandard',
      meta: {
        title: 'trainStandard'
      }
    },
    {
      path: 'trainSection',
      component: () => import('@/views/trainOutline/TrainSection'),
      name: 'TrainSection',
      meta: {
        title: 'trainSection'
      }
    },
    {
      path: 'trainStageTime',
      component: () => import('@/views/trainOutline/TrainStageTime'),
      name: 'TrainStageTime',
      meta: {
        title: 'trainStageTime'
      }
    },
    {
      path: 'armyRelated',
      component: routerView,
      name: 'ArmyRelated',
      redirect: '/trainOutline/armyRelated/course',
      meta: {
        title: 'armyRelated'
      },
      children: [
        {
          path: 'course',
          component: () => import('@/views/trainOutline/armyRelated/Course'),
          name: 'Course',
          meta: {
            title: 'course'
          }
        },
        {
          path: 'courseTime',
          component: () => import('@/views/trainOutline/armyRelated/CourseTime'),
          name: 'CourseTime',
          meta: {
            title: 'courseTime'
          }
        },
        {
          path: 'courseDistribution',
          component: () => import('@/views/trainOutline/armyRelated/CourseDistribution'),
          name: 'CourseDistribution',
          meta: {
            title: 'courseDistribution'
          }
        },
        {
          path: 'scoreStandard',
          component: routerView,
          name: 'ScoreStandard',
          redirect: '/trainOutline/armyRelated/scoreStandard/scoreStandard',
          meta: {
            title: 'scoreStandard'
          },
          children: [
            {
              path: 'orgSingleCourseScoreRule',
              component: () => import('@/views/trainOutline/armyRelated/scoreStandard/OrgSingleCourseScoreRule'),
              name: 'OrgSingleCourseScoreRule',
              meta: {
                title: 'orgSingleCourseScoreRule'
              }
            }
          ]
        }
      ]
    },
    {
      path: 'sportRelated',
      component: routerView,
      name: 'SportRelated',
      redirect: '/trainOutline/sportRelated/sportCourse',
      meta: {
        title: 'sportRelated'
      },
      children: [
        {
          path: 'sportCourse',
          component: () => import('@/views/trainOutline/sportRelated/SportCourse'),
          name: 'SportCourse',
          meta: {
            title: 'sportCourse'
          }
        },
        {
          path: 'sportTime',
          component: () => import('@/views/trainOutline/sportRelated/SportTime'),
          name: 'SportTime',
          meta: {
            title: 'sportTime'
          }
        },
        {
          path: 'sportAssessReq',
          component: () => import('@/views/trainOutline/sportRelated/SportAssessReq'),
          name: 'SportAssessReq',
          meta: {
            title: 'sportAssessReq'
          }
        },
        {
          path: 'sportCourseGroup',
          component: () => import('@/views/trainOutline/sportRelated/SportCourseGroup'),
          name: 'SportCourseGroup',
          meta: {
            title: 'sportCourseGroup'
          }
        }
      ]
    }
  ]
}

export default trainOutlineRouter
