function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./app', true, /^\.\/(?!.*(?:__tests__)).*\.(tsx?)$/));  // pattern to take each .ts files except of the ones with __tests__ directory https://regex101.com/r/J8NWTj/1
requireAll(require.context('./pages', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));