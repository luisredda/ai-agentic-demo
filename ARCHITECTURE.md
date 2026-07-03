# Architecture

## Overview

This is an intentionally vulnerable demo banking application designed for AI SDLC demonstrations.

## Components

- **Weather Integration** — Provides weather forecast capability via the Open-Meteo public API integration (integrations.js).

## Data Flow

*Not specified — to be defined*

## Dependencies

### External Dependencies

- **Open-Meteo API** (https://open-meteo.com) — Public weather forecast API used for retrieving current weather conditions and forecasts. No API key required. Accessed via the geocoding and forecast endpoints.

## Deployment / Infrastructure

*Not specified — to be defined*

## Decisions and Trade-offs

- **Open-Meteo API** was selected as the weather data provider as it provides a free, public API without requiring API key registration, simplifying integration for demo purposes.
