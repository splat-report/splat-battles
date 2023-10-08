<script setup lang="ts">
const props = defineProps<{
  history: any,
}>();

const myLeaguePower = computed(() => {
  return Math.floor(props.history.leagueMatchHistoryGroup.myLeaguePower);
});
</script>

<template>
  <div>
    <span class="text-sm" >
      <img src="~/assets/icons/icon-event.svg" class="h-8" />
      {{ history.leagueMatchHistoryGroup.leagueMatchEvent.name }}
    </span>
    <div>
      <WidgetsBattleRulesIcon :rule="history.leagueMatchHistoryGroup.vsRule" class="align-bottom" />
      <span class="ml-1 text-sm">{{ history.leagueMatchHistoryGroup.teamComposition }}</span>
      <span class="ml-1 font-mono">{{ myLeaguePower }}</span>
    </div>
    <div v-for="detail in props.history.historyDetails.nodes" :key="detail.id">
      <BattleResultSummary :detail="detail" />
    </div>
  </div>
</template>
