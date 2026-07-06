export const LIGHT_THEME_PRESET = {
  layoutTheme: "themedefault",
  topbarTheme: "gredient1",
  sidebarTheme: "gredient1",
  footerTheme: "gredient1",
};

export const DARK_THEME_PRESET = {
  layoutTheme: "theme7",
  topbarTheme: "dark",
  sidebarTheme: "dark",
  footerTheme: "dark",
};

export const applyBodyDarkClass = (isDark) => {
  if (isDark) {
    document.body.classList.add("dark-mode");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.documentElement.setAttribute("data-theme", "light");
  }
};
