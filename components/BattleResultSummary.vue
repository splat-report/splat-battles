<template>
  <div class="detail">
    <div
      :class="{
        [`judgement-${judgementType}`]: true,
        exceptional: isExceptionalJudgement,
      }"
    >
      <div :title="detail.judgement">
        <div class="font-spla text-[0.7rem]">
          <p
            v-if="detail.knockout === 'WIN'"
            class="text-[color:var(--color-yellow)]"
          >
            KNOCKOUT!
          </p>
          <p
            v-else-if="
              !isExceptionalJudgement && ['WIN', 'LOSE'].includes(judgementType)
            "
          >
            Score:
            <span class="text-[0.9rem]">{{ detail.myTeam.result?.score }}</span>
          </p>
          <p v-else>
            <span v-if="judgementType === 'WIN'">WIN</span>
            <span v-if="judgementType === 'LOSE'">LOSE</span>
            <span v-else-if="judgementType === 'DRAW'">DRAW</span>
          </p>
        </div>
      </div>
    </div>
    <div class="opacity-80 mr-2">
      <img :src="detail.player.weapon.image.url" class="weapon" />
    </div>

    <div>
      <p class="stage">{{ abbreviateStageName(detail.vsStage.name) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stage {
  @apply font-serif text-sm select-all;

  @apply w-max opacity-60;
  letter-spacing: -0.1em;
  transform: scale(0.8, 1);
  transform-origin: left;
}

.detail p {
  margin: 2px;
  padding: 2px;
}

.detail code {
  margin: 2px;
  padding: 2px;
}

.detail {
  background: #3a414a;
  display: flex;
  align-items: center;
}

%judgement {
  @apply font-spla text-xs select-none;

  width: 7em;

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  &.exceptional {
    color: gainsboro;
    opacity: 0.5;
  }
}

.judgement-WIN {
  @extend %judgement;
  color: var(--color-yellow);
}

.judgement-LOSE {
  @extend %judgement;
  color: azure;
  opacity: 0.7;
}

.judgement-DRAW {
  @extend %judgement;
  color: gainsboro;
  opacity: 0.5;
}

.irregular-judgement {
  color: gray;
}

.weapon {
  @apply h-6 bg-black rounded-full;
}
</style>

<script setup lang="ts">
import { HistoryDetail } from "~/nintendo-types/alias";
import { isBankaraChallenge, isXMatch } from "~/ours/splat/history";
import { abbreviateStageName } from "~/ours/splat/stage";

const props = defineProps<{
  detail: HistoryDetail;
}>();

const judgementType = computed(() => {
  switch (props.detail.judgement) {
    case "WIN":
    case "DEEMED_WIN":
    case "EXEMPTED_WIN":
      return "WIN";
    case "LOSE":
    case "DEEMED_LOSE":
    case "EXEMPTED_LOSE":
      return "LOSE";
    case "DRAW":
      return "DRAW";
    default:
      console.error(
        "Must not reach here. unknown judgement",
        props.detail.judgement
      );
      return "UNEXPECTED";
  }
});

const isExceptionalJudgement = computed(() => {
  const x = props.detail.judgement;
  return x.startsWith("DEEMED_") || x.startsWith("EXEMPTED_");
});

const isModeBankaraChallenge = computed(() => isBankaraChallenge(props.detail));
const isModeX = computed(() => isXMatch(props.detail));
</script>
