(function() {
    class UniversalFetch {
        constructor(runtime) { this.runtime = runtime; }
        getInfo() {
            return {
                id: 'universalFetch',
                name: 'Cloud Fetch',
                color1: '#4C97FF',
                blocks: [{
                    opcode: 'fetchURL',
                    blockType: 'reporter',
                    text: 'fetch from [URL]',
                    arguments: { URL: { type: 'string', defaultValue: 'https://vercel.app' } }
                }]
            };
        }
        async fetchURL(args) {
            try {
                const response = await fetch(args.URL);
                const data = await response.json();
                return JSON.stringify(data);
            } catch (e) { return "Error: " + e.message; }
        }
    }

    const runtime = (window.vm && window.vm.runtime) || (window.Scratch && window.Scratch.vm && window.Scratch.vm.runtime);
    if (runtime) {
        const extensionInstance = new UniversalFetch(runtime);
        runtime._registerInternalExtension(extensionInstance);
    }
})();
