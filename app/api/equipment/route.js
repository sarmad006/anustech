import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Equipment from '@/models/Equipment';

export async function GET() {
  try {
    console.log('Starting database connection...');
    await dbConnect();
    console.log('Connected to database');

    const collection = await Equipment.db.collection('bamot');
    console.log('Got collection reference');

    const data = await collection.find({}).toArray();
    console.log('Found data:', data);

    if (!data || !Array.isArray(data)) {
      console.log('No data found or invalid data');
      return NextResponse.json([]);
    }

    const transformedData = data.map(item => ({
      _id: item._id.toString(),
      Model: item.Model || '',
      Id: item.Id || 0,
      "Inspection Status": item["Inspection Status"] || '',
      Location: item.Location || ''
    }));

    console.log('Sending transformed data');
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'שגיאה בטעינת הנתונים',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const newEquipment = await Equipment.create(body);
    return NextResponse.json(newEquipment, { status: 201 });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return NextResponse.json(
      { 
        error: 'שגיאה ביצירת ציוד חדש',
        details: error.message 
      },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'נדרש מזהה ציוד' },
        { status: 400 }
      );
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedEquipment) {
      return NextResponse.json(
        { error: 'הציוד לא נמצא' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEquipment);
  } catch (error) {
    console.error('Error updating equipment:', error);
    return NextResponse.json(
      { 
        error: 'שגיאה בעדכון הציוד',
        details: error.message 
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'נדרש מזהה ציוד' },
        { status: 400 }
      );
    }

    const deletedEquipment = await Equipment.findByIdAndDelete(id).lean();

    if (!deletedEquipment) {
      return NextResponse.json(
        { error: 'הציוד לא נמצא' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'הציוד נמחק בהצלחה' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return NextResponse.json(
      { 
        error: 'שגיאה במחיקת הציוד',
        details: error.message 
      },
      { status: 400 }
    );
  }
}