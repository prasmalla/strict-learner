<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span>{{ new Date().getFullYear() }}</span>
      <v-spacer />
      <router-link v-if="!isLoggedIn" to="/login">
        Login
      </router-link>
      <button v-else type="button" class="logoutButton" @click="logout">
        Logout
      </button>
    </v-footer>
  </v-app>
</template>

<script>
import { authComputed } from '../plugins/utils'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'start',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'notes',
          to: '/notes'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'strictlearn.in'
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
    async logout() {
      try {
        await this.$fireAuth.signOut()
        this.$router.push('/')
      } catch {}
    }
  }
}
</script>
