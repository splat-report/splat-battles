<template>
  <p class="commit mb-1">{{ COMMIT_REF.substring(0, 7) }}</p>
  <hr class="mb-4 clear-both border-slate-500" />
  <p>
    Related:
    <a href="https://session-token.splat.report">session-token.splat.report</a>
  </p>
  <div>
    <h2>/x-battles</h2>
    <code>https://[thissite]/x-battles?sessionToken=...</code>
    <div class="overflow-hidden max-h-96">
      <img
        src="~/assets/images/x-battles.png"
        class="border-2 border-slate-600 m-2 max-w-[8rem]"
      />
    </div>
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
  @apply block text-xs;
}

h2 {
  @apply text-xl font-bold;
}
a:hover {
  @apply underline;
}
</style>

<script setup lang="ts">
const {
  public: { COMMIT_REF },
} = useRuntimeConfig();
</script>
