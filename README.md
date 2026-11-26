# Friends RPG — Server Field Guide

A responsive, static RPG-style player wiki for the Minecraft Fabric 1.20.1 Friends RPG server.

## Run locally
No build tools or package installation required.

1. Extract the ZIP.
2. Open `index.html` in a modern browser.

For a local web server (recommended):
```bash
python -m http.server 8000
```
Then open http://localhost:8000.

## Publish with GitHub Pages
1. Create a **public** GitHub repository.
2. Upload the contents of this folder (not the enclosing ZIP folder).
3. Open **Settings → Pages**.
4. Set deployment source to **Deploy from a branch**, choose `main` and `/ (root)`.
5. Save. GitHub Pages will publish the site.

## What's included
- RPG-inspired responsive landing page with animated visual elements.
- Searchable and filterable mod codex.
- Mod detail popups with mod-page, guide-search and YouTube links.
- Boss encounter overview.
- Suggested player progression.
- Dimension, structure and multiplayer-mechanics sections.
- Equipment/buildcraft overview.
- No backend, no account system, no external JavaScript libraries.

## Accuracy notes
This is a first public-facing guide based on the server information confirmed in the project conversation. It is **not yet a verified full export of the live `mods/` directory**.

- Mod entries marked `Confirmed in server context` need a fresh server-folder audit for exact filenames and versions.
- Some exact class content, loot tables, armor stats, weapon damage, ore spawn ranges, entity drops and config-specific mechanics are intentionally not invented.
- Use REI and in-game tooltips for exact recipes and item stats.
- **Better Nether is removed** from the current pack and is explicitly shown as removed. Its biomes, mobs, structures and loot are not described as active content.
- The boss list includes the four Bosses of Mass Destruction encounters. AdventureZ is described at mod level pending an exact version/config content audit.

## Updating content
- Edit `data.js` to add, remove or update mod entries.
- Edit `data-bosses.js` to update boss entries.
- `index.html`, `styles.css` and `app.js` control layout, styling and behavior.

## Suggested next data audit
To turn this into a fully exhaustive wiki, export the live server `mods/` filenames and versions, then inspect the exact installed JAR metadata and configs. From that source, populate:
- every entity and boss with spawn conditions, attacks and drops;
- every dimension and biome;
- armor, weapons, tools, accessories and item stats;
- ores, generation heights and processing chains;
- recipes, enchantments and progression dependencies;
- server-specific mechanics and config rules.


## Ranked Compendium

The site includes an interactive ranking hub for weapons, armor, tools, ores, accessories, magic, bosses, mobs, and world progression.

**Accuracy note:** numeric rankings currently cover vanilla baselines only. Modded item and difficulty rankings are marked pending verification rather than filled with invented stats. The modded catalogue needs the exact server mod JARs/configuration and, for some items, in-game tooltips or registry data. Add verified entries to `data-rankings.js`.

Each category's `basis` is displayed above its table. Keep separate rankings for different roles or metrics when a single universal order would be misleading.


## Expanded mod catalog (research build)

The ranked compendium now includes researched reference catalogues for:

- Simply Swords: 57 unique weapon/form entries, using Awakening 8 base damage × attack speed as a transparent comparison index. Abilities and build synergy are described separately; this is not a universal power ranking.
- Mythic Metals: named metal/material families from the 1.20.1 reference index. Their order is a practical progression guide, not a claim about exact ore rarity or tier.
- BetterEnd: 25 named biomes and the documented Thallasium, Terminite, Aeternium and Crystalite material progression.
- Artifacts: a broad item-name catalogue from a 1.20.1 showcase reference; effects and exact Fabric build coverage still need JAR verification.
- AdventureZ: known boss and creature names from its 1.20.1 guide.
- Bosses of Mass Destruction: four bosses, default health values, structures and summon requirements. Health order is not encounter-difficulty order.

## Source links used for researched entries

- Simply Swords unique weapon catalogue and mechanics: https://www.minecraft-guides.com/mod/simply-swords/wiki/unique-weapons/
- Mythic Metals 1.20.1 item/recipe reference: https://mc-wiki.net/mythicmetals/
- Mythic Metals 0.19.12+1.20.1 release: https://modrinth.com/mod/mythicmetals/version/0.19.12%2B1.20.1
- BetterEnd 1.20.1 biomes, recipes and material guide: https://mcmodwiki.com/betterend/1.20.1
- AdventureZ 1.20.1 item and encounter guide: https://mc-wiki.net/adventurez/
- Artifacts mod description: https://modrinth.com/mod/artifacts
- Bosses of Mass Destruction 1.7.5 item list and summoning notes: https://mcmodwiki.com/bosses-of-mass-destruction/1.20.1
- Bosses of Mass Destruction default boss HP and arenas: https://www.minecraft-guides.com/mod/bosses-of-mass-destruction/

## Important completeness limitation

This ZIP only contained the website source, not the live server's mod JARs or config directory. Therefore it is not technically possible to promise every item, block, recipe, spell, entity, loot table, world-generation feature or server-specific stat across all installed mods from this ZIP alone. The expanded entries above are the fullest researched public-reference pass possible from the known mod list, and unknown/config-dependent facts remain labelled rather than fabricated. A true exhaustive export must parse the exact server JARs and configs (including data packs and generated registries).
