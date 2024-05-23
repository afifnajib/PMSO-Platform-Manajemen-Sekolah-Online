<script setup>
import { computed, watch, ref } from "vue";
import { useLayout } from "./composables/layout";
import ScrollPanel from "primevue/scrollpanel";

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    "layout-theme-light": layoutConfig.darkTheme.value === "light",
    "layout-theme-dark": layoutConfig.darkTheme.value === "dark",
    "layout-overlay": layoutConfig.menuMode.value === "overlay",
    "layout-static": layoutConfig.menuMode.value === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive.value &&
      layoutConfig.menuMode.value === "static",
    "layout-overlay-active": layoutState.overlayMenuActive.value,
    "layout-mobile-active": layoutState.staticMenuMobileActive.value,
    "p-ripple-disabled": layoutConfig.ripple.value === false,
  };
});
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar />
    <div class="layout-sidebar">
      <ScrollPanel
        style="width: 300px; height: calc(100vh - 5rem); margin-right: -18px"
        :pt="{
          wrapper: {
            style: { 'border-right': '10px solid var(--surface-ground)' },
          },
          bary: 'bg-primary-200 opacity-100 hover:bg-primary-300 focus:bg-primary-300',
          barx: 'overflow-x-hidden',
        }"
      >
        <AppSidebar />
      </ScrollPanel>
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <NuxtPage />
      </div>
      <AppFooter />
    </div>
    <AppConfig />
    <div class="layout-mask"></div>
  </div>
  <Toast />
</template>

<style lang="scss" scoped></style>
