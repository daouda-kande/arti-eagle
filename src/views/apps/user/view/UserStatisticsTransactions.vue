<script setup>
const statistics = [
  {
    title: 'Absences',
    stats: '2',
    statsMax: '7',
    icon: 'tabler-chart-pie-2',
    color: 'primary',
    verb: ' justifées ',
  },
  {
    title: 'Evaluations',
    stats: '3',
    statsMax: '5',
    icon: 'tabler-users',
    color: 'info',
    verb: ' faites ',
  },
  {
    title: 'Activités',
    stats: '8',
    statsMax: '15',
    icon: 'tabler-shopping-cart',
    color: 'error',
    verb: ' achevées ',
  },
  {
    title: 'Formations',
    stats: '2',
    statsMax: '6',
    icon: 'tabler-currency-dollar',
    color: 'success',
    verb: ' cours ',
  },
]
</script>

<template>
  <VCard title="Vue d'ensemble">
    <template #append>
      <span class="text-sm text-disabled">Mise à jour : 13/03/2023</span>
    </template>

    <VCardText>
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
              class="me-3"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
            </VAvatar>

            <div class="d-flex flex-column">
              <span>
                <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
                <span class="text-caption">
                  {{ item.verb }}
                </span>
                <span class="text-h6 font-weight-medium">{{ item.statsMax }}</span>
              </span>
              <span class="text-caption">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
