<script setup lang="ts">
</script>
<template>
  <v-app>
    <v-main>
      <Suspense>
        <router-view :key="$route.fullPath"/>
      </Suspense>
    </v-main>
  </v-app>
</template>

