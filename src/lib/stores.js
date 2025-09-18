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
  cardWidth: 2.5, // inches
  cardHeight: 3.5, // inches  
  resolution: 300, // DPI
  bleedSize: 0.125, // inches
  showBleed: true,
  showCropMarks: false
});