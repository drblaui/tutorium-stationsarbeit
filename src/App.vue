<script setup lang="ts">
</script>
<template>
  <v-app>
    <v-main>
      <Suspense>
        <router-view :key="$route.fullPath"/>
      </Suspense>
      <v-footer app align="center">
        <v-row justify="center">
          <v-col align="center">
            <a href="https://github.com/drblaui/tutorium-stationsarbeit" target="_blank">Source Code</a>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-app>
</template>

