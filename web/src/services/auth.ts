export const signIn = (): Promise<object> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ user: { name: '', email: '', token: '' } })
    }, 1000)
  })
}
