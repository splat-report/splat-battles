<template>
  <div>
    <div v-if="flow.loginUrl">
      <p>
        Copy the url of 「この人にする」("Select this account") and enter the
        url
      </p>
      <p>
        <NuxtLink :to="flow.loginUrl" target="_blank" rel="noopener noreferrer"
          >NSO login</NuxtLink
        >
      </p>

      <form @submit.prevent="fetchSessionToken">
        <input type="text" v-model="sessionUrl" />
        <button type="submit">proceed</button>
      </form>
    </div>

    <hr />
    <div>
      <code>{{ JSON.stringify(flow, null, 2) }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "session-token", sessionToken: string): void;
}>();

const sessionUrl = ref("");

const { flow, startLogin, setSessionTokenCodeFromUrl, getSessionToken } =
  useLoginFlow();

await startLogin();

watch(sessionUrl, () => {
  setSessionTokenCodeFromUrl(sessionUrl.value);
});

watch(
  () => flow.value.sessionToken,
  (sessionToken) => {
    emit("session-token", sessionToken);
  }
);

function fetchSessionToken() {
  getSessionToken();
}
</script>
