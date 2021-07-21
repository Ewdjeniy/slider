function importAll(r) {
    return r.keys().map(r);
}

importAll(require.context('./app', true, /^\.\/.*ts$/));
