import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface ErrorResponse {
message: string
code: string
context?: Record<string, unknown>
}

export function middleware(request: NextRequest) {
try {
    // Custom error context to be added to all error responses
    // Catch any errors and format them appropriately
    return NextResponse.next()
} catch (error) {
    console.error('[Error Middleware]:', error)
    
    const errorResponse: ErrorResponse = {
    message: error instanceof Error ? error.message : 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
    context: {
        url: request.url,
        timestamp: new Date().toISOString()
    }
    }

    // Log error with context
    console.error(JSON.stringify(errorResponse, null, 2))

    // Return formatted error response
    return new NextResponse(JSON.stringify(errorResponse), {
    status: 500,
    headers: {
        'Content-Type': 'application/json'
    }
    })
}
}

export const config = {
matcher: [
    // Add paths that should be handled by middleware
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
]
}

