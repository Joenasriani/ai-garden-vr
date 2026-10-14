# AI Garden VR

An experimental Three.js/WebXR creature scene with particle effects, keyboard interactions and XP progression.

## Current status

Incomplete JavaScript prototype. The source contains scene and interaction components, but startup and module errors prevent it from being described as a working VR experience.

## Implemented source components

- A Three.js scene with a perspective camera and hemisphere lighting
- WebXR renderer configuration and a VR entry button
- A geometric creature with blinking eyes and a reaction animation
- Six helper creatures with hovering, boundary movement and proximity reactions
- Particle effects for interaction feedback
- In-memory XP, level thresholds and temporary badge objects
- Positional audio loading hooks

These are source-code components. Their presence does not establish successful browser or headset execution.

## Keyboard interaction hooks

| Key | Source behavior |
| --- | --- |
| `f` | Adds 5 XP, triggers a creature reaction, spawns particles and requests a seed sound |
| `t` | Adds 10 XP, triggers a creature reaction, spawns particles and requests a training sound |

The labels describe the interaction concept. These handlers do not feed tokens or training examples into `AISim`.

VR controller input is not implemented. The keyboard hooks are marked as examples to replace with controller interactions.

## AI scope

`ai_sim.js` defines an `AISim` class with two arrays:

- `tokens`, populated by `feedTokens`
- `examples`, populated by `addExample`

It does not train a model, run inference, change model weights, call an AI provider or implement autonomous learning. The project name should not be read as evidence of an AI training system or a validated VR learning environment.

## Known code blockers

- `app.js` calls `renderer.setAnimationLoop(render)` before `init()` creates the renderer.
- `sounds.js` and `progression.js` reference `THREE` without importing it.
- The XR render path reads `renderer.xr.getFrame().deltaTime` rather than calculating elapsed time through an explicit timing mechanism. That path needs correction and runtime verification.

These issues are documented here; this README update does not repair the application code.

## Local inspection

There is no package installation or build step. After resolving the code blockers, serve the files through a local HTTP server:

```bash
git clone https://github.com/Joenasriani/ai-garden-vr.git
cd ai-garden-vr
python3 -m http.server 8080
```

Open `http://localhost:8080/` in a browser.

The source imports Three.js 0.152.2 and its VR button module from unpkg. External module resolution and network access must work for the page to load. Immersive VR requires a compatible WebXR browser and headset, with HTTPS for remote hosting or a permitted localhost environment.

## Source layout

- `index.html`: page container and module entry
- `app.js`: scene initialization, render loop and keyboard hooks
- `creature.js`: main creature geometry and animation
- `helpers.js`: helper creature movement and proximity reactions
- `particles.js`: particle creation and lifetime updates
- `progression.js`: XP, levels and badge objects
- `sounds.js`: positional audio loading
- `ai_sim.js`: in-memory token and example storage
- `style.css`: page styles
- `audio/`: referenced audio assets

## Verification

This README was checked against the source code. Browser execution, audio playback and headset compatibility have not been tested in this review.

Credit: Joe Nasr

Public work index: https://joe-nasr-signals.vercel.app/
