interface MyData {
    key: string;
    value: any;
}

// Function to store data in localStorage
const setLocalstorageData = (data: MyData): void => {
    try {
        if (typeof window !== 'undefined') {
            const { key, value } = data;
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        }
    } catch (error) {
        console.error("Error storing data in localStorage:", error);
    }
};

// Function to retrieve data from localStorage
const getLocalstorageData = (key: string): any | null => {
    try {
        if (typeof window !== 'undefined') {

            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue);
        }
    } catch (error) {
        console.error("Error retrieving data from localStorage:", error);
        return null;
    }
};

// Function to remove data from localStorage
const removeLocalstorageData = (key: string): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    } catch (error) {
        console.error("Error removing data from localStorage:", error);
    }
};

// Function to clear all data from localStorage
const clearAllLocalstorageData = (): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
};

export { setLocalstorageData, getLocalstorageData, removeLocalstorageData, clearAllLocalstorageData }