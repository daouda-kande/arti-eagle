<script setup>
const props = defineProps({
  budgetData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <VCard
    :subtitle="budgetData.subtitle"
  >
    <VCardText>
      <VList class="card-list">
        <VListItem>
          <template #prepend>
            <VAvatar
              size="28"
              :image="budgetData.avatarImg"
            />
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ budgetData.title }}
          </VListItemTitle>

          <template #append>
            <span class="font-weight-semibold me-3">{{ budgetData.stats }}%</span>
            <VProgressCircular
              :model-value="budgetData.stats"
              :color="budgetData.progress"
              width="3"
            />
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 30px;
}
</style>
