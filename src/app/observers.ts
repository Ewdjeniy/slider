class ObservableSubject {
    
    observers: any[] = [];
    
    addObserver(o: any): void {
        if (typeof o !== 'function') {
            throw new Error('observer must be a function');
        }
        for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
            const observer = this.observers[i];
            if (observer === o) {
                throw new Error('observer already in the list');
            }
        }
        this.observers.push(o);
    }
    
    removeObserver(o: any): void {
        for (let i = 0, ilen = this.observers.length; i < ilen; i += 1) {
            const observer = this.observers[i];
            if (observer === o) {
                this.observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };
    
    notifyObservers(data: any): void {
        const observersSnapshot = this.observers.slice(0);
        for (var i = 0, ilen = observersSnapshot.length; i < ilen; i += 1) {
            observersSnapshot[i](data);
        }
    };
    
}


export default ObservableSubject;