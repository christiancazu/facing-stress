const Test = () => import('@/pages/test/index')
const Result = () => import('@/pages/test/result')
const Form = () => import('@/pages/test/form')

export default {
  path: '/test',
  name: 'test',
  component: Test,
  redirect: { name: 'test.form' },
  children: [
    { path: '', name: 'test.form', component: Form },
    { path: 'result', name: 'test.result', component: Result }
  ]
}
