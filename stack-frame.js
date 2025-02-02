// Cache for stack frame requests to prevent duplicates
const stackFrameCache = new Map();

export async function fetchStackFrame(params) {
const cacheKey = JSON.stringify(params);

if (stackFrameCache.has(cacheKey)) {
    return stackFrameCache.get(cacheKey);
}

try {
    const response = await fetch(`/__nextjs_original-stack-frame?${new URLSearchParams(params)}`);
    
    if (!response.ok) {
    throw new Error(`Failed to fetch stack frame: ${response.status}`);
    }

    const data = await response.json();
    stackFrameCache.set(cacheKey, data);
    return data;
} catch (error) {
    console.error('Error fetching stack frame:', error);
    throw error;
}
}

