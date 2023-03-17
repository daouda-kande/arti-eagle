<script setup>
import { useSkins } from '@core/composable/useSkins';
import { useThemeConfig } from '@core/composable/useThemeConfig';

// @layouts plugin
import { AppContentLayoutNav } from '@layouts/enums';

const LayoutWithHorizontalNav = defineAsyncComponent(() => import('./components/LayoutWithHorizontalNav.vue'))
const LayoutWithVerticalNav = defineAsyncComponent(() => import('./components/LayoutWithVerticalNav.vue'))
const { width: windowWidth } = useWindowSize()
const { appContentLayoutNav, switchToVerticalNavOnLtOverlayNavBreakpoint } = useThemeConfig()

// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint(windowWidth)

const { layoutAttrs, injectSkinClasses } = useSkins()

injectSkinClasses()
</script>

<template>
  <template v-if="appContentLayoutNav === AppContentLayoutNav.Vertical">
    <LayoutWithVerticalNav v-bind="layoutAttrs" />
  </template>
  <template v-else>
    <LayoutWithHorizontalNav v-bind="layoutAttrs" />
  </template>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
