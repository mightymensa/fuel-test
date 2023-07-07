<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-card>
    <ion-card-content>
      <div>
        <div class="result-heading-item">{{ header }}</div>
        <ion-icon class="info-icon" :icon="informationCircleOutline"> </ion-icon>
      </div>
      <div class="result-main-item">
        <span class="param-unit">{{ unit }}</span> {{ mainItem }}
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { IonCard, IonCardContent } from "@ionic/vue";
import { informationCircleOutline } from "ionicons/icons";

defineProps({
  type: {
    validator(value: string) {
      return ["display", "input"].includes(value);
    },
  },
  header: String,
  mainItem: Number,
  unit: String,
  unitSlot: {
    validator(value: string) {
      return ["start", "end"].includes(value);
    },
  },
  showMoreInfo: Boolean,
  moreInfo: String,
});
</script>

<style>
.result-main-item {
  /* --color: var(--ion-text-color, #000); */
  margin: 0px;
  padding: 10px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.info-icon {
  float: right;
  margin-top: -15px;
}

.result-heading-item {
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
}

.param-unit {
  font-size: 0.9rem;
  color: #444444;
}
</style>
