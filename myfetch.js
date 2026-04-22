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
                    arguments: { 
                        URL: { 
                            type: 'string', 
                            defaultValue: 'https://vercel.app' 
                        } 
                    }
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

    // This function hunts for the Gandi/Cocrea runtime
    const install = () => {
        const runtime = (window.vm && window.vm.runtime) 
                     || (window.Scratch && window.Scratch.vm && window.Scratch.vm.runtime)
                     || (window.gandi && window.gandi.vm && window.gandi.vm.runtime);

        if (runtime) {
            const extensionInstance = new UniversalFetch(runtime);
            runtime._registerInternalExtension(extensionInstance);
            console.log("✅ Cloud Fetch successfully injected!");
            return true;
        }
        return false;
    };

    // Try to install every 500ms until successful
    const timer = setInterval(() => {
        if (install()) clearInterval(timer);
    }, 500);
})();
