# React Context Auth Demo

A small educational project demonstrating shared authentication state in React with the Context API and TypeScript.

This app lets a user sign in with a name, keeps the session in `localStorage`, and shows how multiple components can read and update shared state with a custom `useAuth` hook.

## Features

- Typed authentication context
- `AuthProvider` for shared state
- Custom `useAuth` hook with a provider check
- Conditional UI for signed-in and signed-out states
- Session restoration from `localStorage`

## Tech stack

- React 19
- TypeScript
- Vite

## Getting started

Install dependencies:
