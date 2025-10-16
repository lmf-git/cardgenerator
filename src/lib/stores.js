import { writable } from 'svelte/store';

// Main card data store
export const cardData = writable({
  name: '',
  version: 1,
  difficulty: 0,
  cardType: 'character',
  controlValue: 0,
  resourceSymbols: [],
  textBox: '',
  hasBlock: true,
  blockZone: '',
  blockModifier: 0,
  handSize: 7,
  maxVitality: 20,
  vitalStats: { gender: '', height: '', weight: '', bloodType: '' },
  attackZone: '',
  speed: 0,
  damage: 0,
  keywords: [],
  universe: '',
  cardArt: null,
  rarity: '',
  setNumber: '',
  setName: '',
  cardNumber: '',
  artist: '',
  // Font settings
  nameFont: 'ITCBenguiatStd',
  nameFontType: 'local',
  typeFont: 'ITCBenguiatStd',
  typeFontType: 'local'
});

// Print settings store
export const printSettings = writable({
  cardWidth: 63, // mm
  cardHeight: 88, // mm
  resolution: 300, // DPI
  bleedSize: 3, // mm
  showBleed: true,
  showCropMarks: false,
  copiesPerPage: 1,
  bleedMargin: 3, // mm
  spaceBetween: 6, // mm
});