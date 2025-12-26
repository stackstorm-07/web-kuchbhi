export interface DemoUser {
  name: string
  phone: string
  email: string
}

const DB_KEY = 'demo_users'
const SESSION_KEY = 'user'

export const demoDb = {
  getUsers(): DemoUser[] {
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]')
  },

  saveUser(user: DemoUser) {
    const users = this.getUsers()
    const exists = users.find(u => u.email === user.email)
    if (!exists) {
      users.push(user)
      localStorage.setItem(DB_KEY, JSON.stringify(users))
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  },

  getCurrentUser(): DemoUser | null {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  },

  logout() {
    localStorage.removeItem(SESSION_KEY)
  }
}
