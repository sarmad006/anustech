import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Equipment from '../../../models/Equipment';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return NextResponse.json(
        { error: 'פריט לא נמצא' },
        { status: 404 }
      );
    }
    return NextResponse.json(equipment);
  } catch (error) {
    console.error('Error in equipment GET by ID route:', error);
    return NextResponse.json(
      { error: 'שגיאה בטעינת הפריט' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await request.json();
    const equipment = await Equipment.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    if (!equipment) {
      return NextResponse.json(
        { error: 'פריט לא נמצא' },
        { status: 404 }
      );
    }
    return NextResponse.json(equipment);
  } catch (error) {
    console.error('Error in equipment PUT route:', error);
    return NextResponse.json(
      { error: 'שגיאה בעדכון הפריט' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const equipment = await Equipment.findByIdAndDelete(id);
    if (!equipment) {
      return NextResponse.json(
        { error: 'פריט לא נמצא' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in equipment DELETE route:', error);
    return NextResponse.json(
      { error: 'שגיאה במחיקת הפריט' },
      { status: 500 }
    );
  }
} 