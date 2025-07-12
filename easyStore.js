(function(global) {
    const methods = {
        "localstorage": "localStorage",
        "sessionstorage": "sessionStorage"
    };

    const validateMethodsArr = ["localstorage", "sessionstorage"];

    const methodValidator = (meth) => {
        if (!Object.is(typeof meth, "string")) {
            throw new TypeError("Invalid data type. Method must be a string.");
        }
        const convertMethLower = meth.toLowerCase();
        if (!validateMethodsArr.includes(convertMethLower)) {
            throw new Error("Invalid Method Type", {
                cause: 'Method only accepts "localStorage" or "sessionStorage"',
            });
        }
        return convertMethLower;
    }
    
    const set = (key, value, meth, ttl = 0) => {
        if (typeof ttl !== "number") throw new TypeError("Invalid data type. ttl must be a number");
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[`${validatedMethod}`];
        const payload = {
            value,
            expires: ttl > 0 ? Date.now() + ttl : null
        };
        if (typeof key !== "string") throw new TypeError("Invalid data type. Key must be a string.");
        global[inbuiltMethod].setItem(key, JSON.stringify(payload));
        return;
    }

    const get = (key, meth) => {
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[`${validatedMethod}`];
        if (typeof key !== "string") throw new TypeError("Invalid data type. Key must be a string.");
        const raw = global[inbuiltMethod].getItem(key);
        if (!raw) return null;
        try {
            const {value, expires} = JSON.parse(raw);
            if (expires && Date.now() > expires) {
                global[inbuiltMethod].removeItem(key)
                return null;
            }
            return value;
        }catch(err) {
            console.warn(`[easyStore] Failed to parse value for key "${key}". Returning raw value.`);
            return raw;
        }
    }

    const clear = (meth) => {
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[`${validatedMethod}`];
        global[inbuiltMethod].clear();
    }

    const remove = (key, meth) => {
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[`${validatedMethod}`];
        if (typeof key !== "string") throw new TypeError("Invalid data type. Key must be a string.");
        global[inbuiltMethod].removeItem(key);
    }

    const has = (key, meth) => {
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[validatedMethod];
        const raw = global[inbuiltMethod].getItem(key);
        if (!raw) return false;
        try {
            const { expires } = JSON.parse(raw);
            return !(expires && Date.now() > expires);
        } catch {
            return true;
        }
    }

    const ttlLeft = (key, meth) => {
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[validatedMethod];
        const raw = global[inbuiltMethod].getItem(key);
        if (!raw) return 0;
        try {
            const { expires } = JSON.parse(raw);
            return expires ? Math.max(0, expires - Date.now()) : 0;
        } catch {
            return 0;
        }
    }

    const keys = (meth) => {
        const validatedMethod = methodValidator(meth);
        const inbuiltMethod = methods[validatedMethod];
        return Object.keys(global[inbuiltMethod]);
    }

    global.easyStore = {
        set,
        get,
        clear,
        remove,
        has,
        ttlLeft,
        keys
    }

})(typeof window !== "undefined" ? window : this);