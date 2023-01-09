<template>
  <p class="commit">{{ COMMIT_REF.substring(0, 7) }}</p>
  <hr />
  <div class="clear-both mt-8">
    <code>https://[thissite]/x-battles?sessionToken=...</code>
    <p>
      Your session token can be taken from <a href="">...</a>
    </p>
  </div>
  <p class="my-8">
    <a href="feedback">Feedback form</a>
  </p>
</template>

<style scoped lang="scss">
.commit {
  @apply float-right;
  @apply text-[0.5rem] opacity-50;
  @apply select-all;
  @apply before:content-['['] after:content-[']'];
}
code {
  @apply block;
}
</style>

<script setup lang="ts">
const {  public: { COMMIT_REF }} = useRuntimeConfig();
</script>
