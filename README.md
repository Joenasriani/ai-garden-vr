# AI Garden VR

**Author:** Joe Nasr  
**Canonical identity:** https://joe-nasr-signals.vercel.app/v2/

AI Garden VR is an experimental browser project for exploring a garden like interactive simulation with creatures, progression, particles, sound, and a small in memory data object named `AISim`.

## Current status

Experimental JavaScript prototype.

The repository contains browser code for:

1. Creature behavior
2. Progression state
3. Particle effects
4. Audio hooks
5. Interaction helpers
6. An `AISim` class that stores supplied tokens and labeled examples in memory

## AI boundary

The current `AISim` implementation does not train a machine learning model, perform inference, update model weights, connect to an AI provider, or implement autonomous learning. Its `feedTokens` and `addExample` methods append data to local arrays for the prototype.

The project name describes the interaction concept. It should not be read as evidence of a working AI training system or a validated VR learning environment.

Repository: https://github.com/Joenasriani/ai-garden-vr
