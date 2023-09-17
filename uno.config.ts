import {
  defineConfig,
  presetWebFonts,
  presetUno,
  transformerAttributifyJsx,
  transformerVariantGroup,
  transformerDirectives,
  presetIcons,
  presetAttributify
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({}),
    presetIcons(),
    presetAttributify()
  ],
  transformers: [
    transformerDirectives(),
    transformerAttributifyJsx(),
    transformerVariantGroup()
  ]
});
