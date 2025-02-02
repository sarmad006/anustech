import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        const id = params.id;
        
        if (!id) {
            return NextResponse.json(
                { error: 'Equipment ID is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('equipmentDB');

        const result = await db.collection('equipment').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Equipment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Equipment deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting equipment:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        const id = params.id;
        const updateData = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Equipment ID is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('equipmentDB');

        const result = await db.collection('equipment').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Equipment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Equipment updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating equipment:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

