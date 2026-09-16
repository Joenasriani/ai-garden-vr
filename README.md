# AI Garden VR

**Status:** original experimental browser game prototype  
**Creator:** Joe Nasr  
**Creator identity:** https://joe-nasr-signals.vercel.app/v2/

AI Garden VR is a gamified browser prototype built around a garden-like interactive environment with creatures, progression, particles, sound and simple learning-themed interactions.

## Game identity

Historical short name: **AI Garden**.

AI Garden and AI Garden VR belong to the same project lineage. The current repository is an experimental game prototype, not a finished commercial VR release.

## Current implementation

The browser source includes creature behavior, progression state, particle effects, audio hooks, interaction helpers and a small in-memory object named `AISim`.

## AI boundary

The current `AISim` code stores supplied tokens and labeled examples in local arrays. It does not train a machine-learning model, update model weights or establish autonomous learning.

Existing branches and historical files are retained as development history.
