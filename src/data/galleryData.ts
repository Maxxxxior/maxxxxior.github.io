import type { TranslationKey } from "../locales/i18nData";

export interface SpriteItem {
    src: string;
    alt: string;
    type: 'spriteIcon' | 'spriteModel';
    descKey: TranslationKey;
}

export interface SpriteGroup {
    titleKey: TranslationKey;
    sprites: SpriteItem[];
}

export const GALLERY_DATA: SpriteGroup[] = [
    {
        titleKey: 'axe',
        sprites: [
            { src: 'assets/sprites/icons/32x32/Axe.png', alt: 'Axe', type: 'spriteIcon', descKey: 'axeDescriptionIcon' },
            { src: 'assets/sprites/icons/32x32/AxeCross.png', alt: 'Axe Cross', type: 'spriteIcon', descKey: 'axeDescriptionIcon2' },
            { src: 'assets/sprites/models/64x64/AxeModel.png', alt: 'Axe Model', type: 'spriteModel', descKey: 'axeDescriptionModel' },
        ]
    },
    {
        titleKey: 'sword',
        sprites: [
            { src: 'assets/sprites/icons/32x32/StraightSword.png', alt: 'Straight Sword', type: 'spriteIcon', descKey: 'swordStraightIcon' },
            { src: 'assets/sprites/icons/32x32/StraightRunicSword.png', alt: 'Straight Runic Sword', type: 'spriteIcon', descKey: 'swordStraightRunicIcon' },
            { src: 'assets/sprites/icons/32x32/ShortStraightSword.png', alt: 'Short Straight Sword', type: 'spriteIcon', descKey: 'swordShortStraightIcon' },
            { src: 'assets/sprites/icons/32x32/ShortGuardStraightSword.png', alt: 'Short Guard Straight Sword', type: 'spriteIcon', descKey: 'swordShortGuardStraightIcon' },
            { src: 'assets/sprites/icons/32x32/SharpenedBroadSword.png', alt: 'Sharpened Broad Sword', type: 'spriteIcon', descKey: 'swordSharpenedBroadIcon' },
            { src: 'assets/sprites/icons/32x32/SerratedSword.png', alt: 'Serrated Sword', type: 'spriteIcon', descKey: 'swordSerratedIcon' },
            { src: 'assets/sprites/icons/32x32/MediumGuardStraightSword.png', alt: 'Medium Guard Straight Sword', type: 'spriteIcon', descKey: 'swordMediumGuardStraightIcon' },
            { src: 'assets/sprites/icons/32x32/LongGuardStraightSword.png', alt: 'Long Guard Straight Sword', type: 'spriteIcon', descKey: 'swordLongGuardStraightIcon' },
            { src: 'assets/sprites/icons/32x32/BrokenSword.png', alt: 'Broken Sword', type: 'spriteIcon', descKey: 'swordBrokenIcon' },
            { src: 'assets/sprites/icons/32x32/BroadSword.png', alt: 'Broad Sword', type: 'spriteIcon', descKey: 'swordBroadIcon' },
            { src: 'assets/sprites/icons/32x32/VShapedMediumGuardStraightSword.png', alt: 'V-Shaped Medium Guard Straight Sword', type: 'spriteIcon', descKey: 'swordVShapedMediumGuardStraightIcon' },

            { src: 'assets/sprites/models/64x64/BroadSwordModel.png', alt: 'Broad Sword Model', type: 'spriteModel', descKey: 'swordBroadModel' },
            { src: 'assets/sprites/models/64x64/BrokenSwordModel.png', alt: 'Broken Sword Model', type: 'spriteModel', descKey: 'swordBrokenModel' },
            { src: 'assets/sprites/models/64x64/SerratedRunicSwordModel.png', alt: 'Serrated Runic Sword Model', type: 'spriteModel', descKey: 'swordSerratedRunicModel' },
            { src: 'assets/sprites/models/64x64/SharpenedBroadSwordModel.png', alt: 'Sharpened Broad Sword Model', type: 'spriteModel', descKey: 'swordSharpenedBroadModel' },
            { src: 'assets/sprites/models/64x64/ShortSwordModel.png', alt: 'Short Sword Model', type: 'spriteModel', descKey: 'swordShortModel' },
            { src: 'assets/sprites/models/64x64/StraightRunicSwordModel.png', alt: 'Straight Runic Sword Model', type: 'spriteModel', descKey: 'swordStraightRunicModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordCGuardModel.png', alt: 'Straight Sword C Guard Model', type: 'spriteModel', descKey: 'swordStraightCGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordLittleGuardModel.png', alt: 'Straight Sword Little Guard Model', type: 'spriteModel', descKey: 'swordStraightLittleGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordLongestGuardModel.png', alt: 'Straight Sword Longest Guard Model', type: 'spriteModel', descKey: 'swordStraightLongestGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordLongGuardModel.png', alt: 'Straight Sword Long Guard Model', type: 'spriteModel', descKey: 'swordStraightLongGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordMediumGuardModel.png', alt: 'Straight Sword Medium Guard Model', type: 'spriteModel', descKey: 'swordStraightMediumGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordNoGuardModel.png', alt: 'Straight Sword No Guard Model', type: 'spriteModel', descKey: 'swordStraightNoGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordShortGuardModel.png', alt: 'Straight Sword Short Guard Model', type: 'spriteModel', descKey: 'swordStraightShortGuardModel' },
            { src: 'assets/sprites/models/64x64/StraightSwordVGuardModel.png', alt: 'Straight Sword V Guard Model', type: 'spriteModel', descKey: 'swordStraightVGuardModel' }
        ]
    },
    {
        titleKey: 'shield',
        sprites: [
            { src: 'assets/sprites/models/64x64/WoodenShieldModel.png', alt: 'Wooden Shield', type: 'spriteModel', descKey: 'shieldWoodenModel' }
        ]
    },
    {
        titleKey: 'pickaxe',
        sprites: [
            { src: 'assets/sprites/icons/32x32/Pickaxe.png', alt: 'Pickaxe', type: 'spriteIcon', descKey: 'pickaxeIcon' },
            { src: 'assets/sprites/models/64x64/PickaxeModel.png', alt: 'Pickaxe Model', type: 'spriteModel', descKey: 'pickaxeModel' }
        ]
    },
    {
        titleKey: 'spear',
        sprites: [
            { src: 'assets/sprites/icons/32x32/Spear.png', alt: 'Spear', type: 'spriteIcon', descKey: 'spearIcon' },
            { src: 'assets/sprites/models/64x64/SpearModel.png', alt: 'Spear Model', type: 'spriteModel', descKey: 'spearModel' }
        ]
    },
    {
        titleKey: 'halberd',
        sprites: [
            { src: 'assets/sprites/icons/32x32/Halberd.png', alt: 'Halberd', type: 'spriteIcon', descKey: 'halberdIcon' },
            { src: 'assets/sprites/models/64x64/HalberdModel.png', alt: 'Halberd Model', type: 'spriteModel', descKey: 'halberdModel' }
        ]
    },
    {
        titleKey: 'arrow',
        sprites: [
            { src: 'assets/sprites/models/64x64/ArrowModel.png', alt: 'Arrow Model', type: 'spriteModel', descKey: 'arrowModel' }
        ]
    },
    {
        titleKey: 'backpack',
        sprites: [
            { src: 'assets/sprites/icons/32x32/Backpack.png', alt: 'Backpack', type: 'spriteIcon', descKey: 'backpackBaseIcon' },
            { src: 'assets/sprites/icons/32x32/Backpack-tier1.png', alt: 'Backpack Tier 1', type: 'spriteIcon', descKey: 'backpackTier1Icon' },
            { src: 'assets/sprites/icons/32x32/Backpack-tier2.png', alt: 'Backpack Tier 2', type: 'spriteIcon', descKey: 'backpackTier2Icon' },
            { src: 'assets/sprites/icons/32x32/Backpack-tier3.png', alt: 'Backpack Tier 3', type: 'spriteIcon', descKey: 'backpackTier3Icon' }
        ]
    },
    {
        titleKey: 'log',
        sprites: [
            { src: 'assets/sprites/icons/32x32/Log.png', alt: 'Log', type: 'spriteIcon', descKey: 'logIcon' }
        ]
    }
];