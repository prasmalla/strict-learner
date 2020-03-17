<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">
        Email:
      </label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">
        Password:
      </label>
      <input v-model="password" type="password" name="password" value />

      <button type="submit" name="button">
        Login
      </button>

      <p>{{ error }}</p>

      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        this.$router.push({ name: 'notes' })
      } catch {
        this.error = 'Invalid Credentials / Account Not Found'
      }
    }
  }
}
</script>

<style scoped></style>
